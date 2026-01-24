import { ROW_COUNT } from "../row-count.js";
const cache = {};
const GLSL_PATTERN1 = `
    float exponent = uCustom.x;
    res = pow(1.0 - res, exponent);
    float alpha = res <= 0.0 ? 0.0 : 0.5;
    float red = inside ? 0.2 : 0.8;
    float green = abs(sin(25.0 * res));
    float blue = 0.5;
`;
const GLSL_DEFAULT = `
    float exponent = uCustom.x;
    res = (pow(1.0 - res, exponent) * 0.5) * (inside ? -1.0 : 1.0);
    float red = res;
    float green = res;
    float blue = res;
    float alpha = res;
`;
function getFragment(colCount, padCount, calcFragColorStr, hash) {
    // `colCount` and `padCount` can take at most 8 bits and `has` 32 bits and
    // we have at least 53 bits to play with so we're fine
    const key = (2 ** 32) * (256 * colCount + padCount) + hash;
    const fragment = cache[key];
    if (fragment !== undefined) {
        return fragment;
    }
    const main_Fragment = 
    /*glsl*/ `#version 300 es

precision highp float;

uniform float uMaxDistance;
uniform highp sampler2D uSegs;
uniform highp isampler2D uCloseCellIdxs;
uniform highp isampler2D uCrossCellIdxs;
// bit 0 -> calc distance inside
// bit 1 -> calc distance outside
// bit 2 -> calc whether fragment is inside or outside (else outside is assumed with winds == 0.0)
uniform int uTestInOut;
uniform vec4 uCustom;

uniform SegIdxRangePerCellBlock {
    ivec4 uSegIdxRangePerCell[${(ROW_COUNT + 2 * padCount) * (colCount + 2 * padCount) / 2}];
};
uniform SegIdxRangePerStripBlock {
    ivec4 uSegIdxRangePerStrip[${ROW_COUNT / 2}];
};

in vec2 vXY;
flat in int instanceId;
flat in ivec2 closeCellIdxRange;
flat in ivec2 crossCellIdxRange;
out vec4 FragColor;

// testing!!
// float rand(vec2 co) {
//     return mod(uCustom.w * fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453), 1.0);
// }

float absDistToSegment(vec2 point, vec2 lineA, vec2 lineB) {
    vec2 lineDir = lineB - lineA;
    float lenSq = dot(lineDir, lineDir);
    float t = clamp(dot(point - lineA, lineDir) / lenSq, 0.0, 1.0);
    vec2 linePt = lineA + t*lineDir;

    return distance(point, linePt);
}


void main() {
    ///////////////////////////////////////////////////////////////////////////
    // Calculate \`winds\`:
    //
    // Project a ray to the left to check if it crosses the segment in order
    // to find the fragment's winding number to determine whether fragment
    // is inside or outside the shape.
    ///////////////////////////////////////////////////////////////////////////

    float winds = 0.0;
    if ((uTestInOut & 4) == 0) {
        int crossIdxS = crossCellIdxRange.x;
        int crossLen = crossCellIdxRange.y;
        // Iterate over all relevant cell indexes
        for (int i = crossIdxS; i < crossIdxS + crossLen; i++) {
            int crossIdx = texelFetch(uCrossCellIdxs, ivec2(i%256, i/256), 0).x;

            ivec2 uSegIdxRange = crossIdx % 2 == 0
                ? uSegIdxRangePerCell[crossIdx / 2].xy
                : uSegIdxRangePerCell[crossIdx / 2].zw;

            int segIdx = uSegIdxRange.x;
            int segLen = uSegIdxRange.y;

            for (int j = segIdx; j < segIdx + segLen; j++) {
                // Fetch segment from texture
                vec4 seg = texelFetch(uSegs, ivec2(j%256, j/256), 0);

                // line segment's min-y is excluded
                bool crossing =
                    (seg.y > vXY.y != seg.w > vXY.y) &&
                    (vXY.x > (seg.z - seg.x)*(vXY.y - seg.y) / (seg.w - seg.y) + seg.x);

                bool crossingUp = seg.y < seg.w;

                winds += crossing ? (crossingUp ? -1.0 : 1.0) : 0.0;
            }
        }

        {
            int cellIdx = (instanceId % ${ROW_COUNT});

            bool isEven = cellIdx % 2 == 0;

            ivec4 uSegIdxRange = uSegIdxRangePerStrip[cellIdx / 2];
            int segIdx = isEven ? uSegIdxRange.x : uSegIdxRange.z;
            int segLen = isEven ? uSegIdxRange.y : uSegIdxRange.w;
            

            for (int j = segIdx; j < segIdx + segLen; j++) {
                // Fetch segment from texture
                vec4 seg = texelFetch(uSegs, ivec2(j%256, j/256), 0);

                // line segment's min-y is excluded
                bool crossing =
                    (seg.y > vXY.y != seg.w > vXY.y) &&
                    (vXY.x > (seg.z - seg.x)*(vXY.y - seg.y) / (seg.w - seg.y) + seg.x);

                bool crossingUp = seg.y < seg.w;

                winds += crossing ? (crossingUp ? -1.0 : 1.0) : 0.0;
            }
        }
    }
    bool inside = winds != 0.0;
    ///////////////////////////////////////////////////////////////////////////
    // Calculate \`res\`: the distance to the nearest curve
    ///////////////////////////////////////////////////////////////////////////
    float res = 1.0;  // sdf result

    if ((inside && ((uTestInOut & 1) != 0)) || (!inside && ((uTestInOut & 2) != 0))) {
        int cellIdxS = closeCellIdxRange.x;
        int cellLen = closeCellIdxRange.y;
        // Iterate over all relevant cell indexes
        for (int i = cellIdxS; i < cellIdxS + cellLen; i++) {
            int cellIdx = texelFetch(uCloseCellIdxs, ivec2(i%256, i/256), 0).x;

            ivec2 uSegIdxRange = cellIdx % 2 == 0
                ? uSegIdxRangePerCell[cellIdx / 2].xy
                : uSegIdxRangePerCell[cellIdx / 2].zw;

            int segIdx = uSegIdxRange.x;
            int segLen = uSegIdxRange.y;

            for (int j = segIdx; j < segIdx + segLen; j++) {
                // Fetch segment from texture
                vec4 seg = texelFetch(uSegs, ivec2(j%256, j/256), 0);

                // Find normalized unsigned distance to the segment; only the nearest will be kept
                float d = absDistToSegment(vXY, seg.xy, seg.zw);
                float val = clamp(d / uMaxDistance, 0.0, 1.0);

                res = min(res, val);
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////

    // DEBUG!
    // float alpha = ((instanceId + instanceId/${ROW_COUNT}) % 2 == 0 ? 0.3 : 0.5);

    
    ${GLSL_PATTERN1}

    FragColor = vec4(red, green, blue, alpha);
}
`;
    cache[key] = main_Fragment;
    return main_Fragment;
}
// ${calcFragColorStr}
export { getFragment, GLSL_PATTERN1, GLSL_DEFAULT };
//# sourceMappingURL=fragment.js.map