import { useTexture } from './webgl-utils/use-texture.js';
import { setAttribute } from './webgl-utils/set-attribute.js';
import { setUniform } from './webgl-utils/set-uniform.js';
import { setUniformBlock } from './webgl-utils/set-uniform-block.js';
import { prepareBuffers } from './prepare-buffers.js';
import { TEX_WIDTH } from './tex-width.js';
import { ROW_COUNT } from './row-count.js';
const SEG_TEX_INDEX = 0;
const CELL_TEX_INDEX = 1;
const CROSS_TEX_INDEX = 2;
function mainProgram(glContext, programMain, psss, viewbox, maxDistance, inclInside, inclOutside, customData, x, y, width, height, colCount, cellSize, padCount, stretch) {
    const { gl } = glContext;
    const vertices = [];
    const x0 = 0;
    const y0 = 0;
    const x1 = 1 / ROW_COUNT;
    const y1 = 1 / ROW_COUNT;
    vertices.push(x0, y0, x1, y0, x0, y1); // First triangle: (x0,y0), (x1,y0), (x0,y1)
    vertices.push(x1, y0, x1, y1, x0, y1); // Second triangle: (x1,y0), (x1,y1), (x0,y1)
    const uvArr = new Float32Array(vertices);
    const setUniform_ = setUniform(programMain);
    const setAttribute_ = setAttribute(programMain);
    const { lineSegPtCoords_Arr, segIdxs_PerCell_Range_Arr, closeCellIdxs_PerCell_Arr, closeCellIdxs_PerCell_Range_Arr, crossCellIdxs_PerCell_Arr, crossCellIdxs_perCell_Range_Arr, segIdxs_PerStrip_Range_Arr } = prepareBuffers(psss, width, height, colCount, cellSize, maxDistance, padCount, viewbox, stretch);
    // Init/update attributes
    setAttribute_('aUV', 2, // size, i.e 2d - draw 2 values each time
    gl.FLOAT, gl.STATIC_DRAW, uvArr);
    setAttribute_('aCrossIdxRangePerCell', 2, // count
    gl.INT, gl.STATIC_DRAW, crossCellIdxs_perCell_Range_Arr, 1 // instance division (once per instance)
    );
    setAttribute_('aCloseCellIdxRangePerCell', 2, // count
    gl.INT, gl.STATIC_DRAW, closeCellIdxs_PerCell_Range_Arr, 1 // instance division (once per instance)
    );
    // Init/update uniforms
    setUniform_('2f', 'uWidthHeight', width, height);
    setUniform_('1f', 'uMaxDistance', maxDistance);
    setUniform_('1i', 'uIncl', (inclInside ? 1 : 0) + (inclOutside ? 2 : 0));
    setUniform_('4f', 'uCustom', ...customData);
    setUniformBlock(programMain)('SegIdxRangePerCellBlock', 0, segIdxs_PerCell_Range_Arr);
    setUniformBlock(programMain)('SegIdxRangePerStripBlock', 1, segIdxs_PerStrip_Range_Arr);
    ///////////////////////////////////////
    // Create buffer for line segment data
    useTexture(glContext, SEG_TEX_INDEX, 'segs');
    gl.texImage2D(gl.TEXTURE_2D, 0, // level - irrelevant
    gl.RGBA32F, // internalFormat - we're using 4 floats for the 2 line segment endpoints
    TEX_WIDTH, // fixed width
    lineSegPtCoords_Arr.length / 4 / TEX_WIDTH, // height === number of point coordinates
    // lineSegPtCoords_Arr.length/4,
    // 1,
    0, // border - whatever
    gl.RGBA, // format
    gl.FLOAT, // it holds floats
    lineSegPtCoords_Arr // texture data
    );
    const segTexLoc = gl.getUniformLocation(programMain.program, "uSegs");
    gl.uniform1i(segTexLoc, SEG_TEX_INDEX);
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Create buffer for close cell indexes per cell
    useTexture(glContext, CELL_TEX_INDEX, 'closeCellIdxsPerCell');
    gl.texImage2D(gl.TEXTURE_2D, 0, // level - irrelevant
    gl.R32I, // internalFormat - we're using 1 signed 32-bit int for indexes
    TEX_WIDTH, // fixed width
    closeCellIdxs_PerCell_Arr.length / TEX_WIDTH, // height === number of indexes
    0, // border - whatever
    gl.RED_INTEGER, // format
    gl.INT, // it holds ints
    closeCellIdxs_PerCell_Arr // texture data
    );
    const cellTexLoc = gl.getUniformLocation(programMain.program, "uCloseCellIdxs");
    gl.uniform1i(cellTexLoc, CELL_TEX_INDEX);
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Create buffer for crossing cell indexes per cell
    useTexture(glContext, CROSS_TEX_INDEX, 'crossCellIdxsPerCell');
    gl.texImage2D(gl.TEXTURE_2D, 0, // level - irrelevant
    gl.R32I, // internalFormat - we're using 1 signed 32-bit int for indexes
    TEX_WIDTH, // fixed width
    crossCellIdxs_PerCell_Arr.length / TEX_WIDTH, // height === number of indexes
    0, // border - whatever
    gl.RED_INTEGER, // format
    gl.INT, // it holds ints
    crossCellIdxs_PerCell_Arr // texture data
    );
    const crossTexLoc = gl.getUniformLocation(programMain.program, "uCrossCellIdxs");
    gl.uniform1i(crossTexLoc, CROSS_TEX_INDEX);
    ///////////////////////////////////////////////
    if (stretch > 1) {
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(x, y, width, height / stretch);
    }
    gl.viewport(x, y, width, height);
    // draw a square colCount * ROW_COUNT times - 6 vertics
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, colCount * ROW_COUNT);
    if (stretch > 1) {
        gl.disable(gl.SCISSOR_TEST);
    }
}
export { mainProgram };
//# sourceMappingURL=main-program.js.map