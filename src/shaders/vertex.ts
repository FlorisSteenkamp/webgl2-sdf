import { ROW_COUNT } from "../row-count.js";

const vertex = /*glsl*/`#version 300 es

precision highp float;

uniform vec2 uWidthHeight;
uniform vec2 uOffset;
in vec2 aUV;
in ivec2 aCloseCellIdxRangePerCell;
in ivec2 aCrossIdxRangePerCell;
out vec2 vXY;
flat out int instanceId;
flat out ivec2 closeCellIdxRange;
flat out ivec2 crossCellIdxRange;


void main() {
    instanceId = gl_InstanceID;
    closeCellIdxRange = aCloseCellIdxRangePerCell;
    crossCellIdxRange = aCrossIdxRangePerCell;

    // drawn column-by-column
    float i = float(instanceId / ${ROW_COUNT});  // column index
    float j = float(instanceId % ${ROW_COUNT});  // row index

    vec2 trans = vec2(
        i / float(${ROW_COUNT}),
        j / float(${ROW_COUNT})
    );

    vec2 uv = aUV + trans;

    float width = uWidthHeight.x;
    float height = uWidthHeight.y;

    vXY = vec2(
        height * uv.x,
        height * uv.y
    );

    float aspectRatio = width / height;

    float x = (uOffset.x / 2.0*width) - 1.0;
    float y = (uOffset.y / 2.0*height) - 1.0;

    gl_Position = vec4(
        vec2(
            (2.0*(uv.x / aspectRatio) - 1.0),
            (2.0*uv.y - 1.0)
        ) + vec2(x,y),
        0.0, 1.0
    );
}
`;


export { vertex }
