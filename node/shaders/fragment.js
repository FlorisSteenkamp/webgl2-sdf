import { ROW_COUNT } from "../row-count.js";
const cache = {};
function getFragment(colCount, padCount) {
    const fragment = cache[1024 * colCount + padCount];
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
uniform int uIncl;  // bit 0 -> incl inside, bit 1 -> incl outside

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


float absDistToSegment(vec2 point, vec2 lineA, vec2 lineB) {
    vec2 lineDir = lineB - lineA;
    float lenSq = dot(lineDir, lineDir);
    float t = clamp(dot(point - lineA, lineDir) / lenSq, 0.0, 1.0);
    vec2 linePt = lineA + t*lineDir;

    return distance(point, linePt);
}


void main() {
    ///////////////////////////////////////////////////////////////////////////
    // Project a ray to the left to check if it crosses the segment in order
    // to find the fragment's winding number to determine whether fragment
    // is inside or outside the shape.

    int crossIdxS = crossCellIdxRange.x;
    int crossLen = crossCellIdxRange.y;
    float winds = 0.0;
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

            winds += crossing ? (crossingUp ? 1.0 : -1.0) : 0.0;
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

            winds += crossing ? (crossingUp ? 1.0 : -1.0) : 0.0;
        }
    }


    bool inside = winds != 0.0;
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    float res = 1.0;  // sdf result

    if ((inside && (uIncl % 2 != 0)) || (!inside && (uIncl > 1))) {
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

                // Find unsigned distance to the segment; only the nearest will be kept
                float d = absDistToSegment(vXY, seg.xy, seg.zw);
                // Apply exponential transform
                float val = clamp(d / uMaxDistance, 0.0, 1.0);

                res = min(res, val);
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////

    // DEBUG!
    // float alpha = ((instanceId + instanceId/${ROW_COUNT}) % 2 == 0 ? 0.3 : 0.5);


    float exponent = 2;
    res = pow(1.0 - val, exponent) * 0.5;

    float alpha = res == 1.0 ? 0.0 : 0.5;
    float red = inside ? 0.2 : 0.8;
    float green = abs(sin(25.0 * res));
    float blue = 0.5;

    FragColor = vec4(red, green, blue, alpha);
}
`;
    cache[1024 * colCount + padCount] = main_Fragment;
    return main_Fragment;
}
export { getFragment };
//# sourceMappingURL=fragment.js.map