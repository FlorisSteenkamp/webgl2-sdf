import { bezierCurvesToLineSegs } from './bezier/bezier-curves-to-line-segs.js';
import { findCloseCells } from './utils/find-close-cells.js';
import { clipLineSegmentToGrid } from './utils/clip-line-segment-to-grid.js';
import { createEmptyGrid } from './utils/create-empty-grid.js';
import { findCrossingCells } from './utils/find-crossing-cells.js';
import { TEX_WIDTH } from './tex-width.js';
import { ROW_COUNT } from './row-count.js';
import { clipLineSegmentToStrips } from './utils/clip-line-segment-to-strips.js';
import { mapToViewbox } from './utils/map-to-viewbox.js';
// import { sum } from './utils/sum.js';  // testing
function prepareBuffers(psss, width, height, colCount, cellSize, maxDistance, padCount, resolution = 0.5, viewbox = [0, 0, width, height], stretch = 1) {
    ////////////////////////////////////////////////////////////////////////////
    const psss_ = mapToViewbox(viewbox, width, height / stretch, psss);
    const lineSegs = bezierCurvesToLineSegs(psss_, resolution);
    const grid = createEmptyGrid(colCount, padCount);
    const strips = new Array(ROW_COUNT).fill(undefined).map(v => []);
    for (let i = 0; i < lineSegs.length; i++) {
        const seg = lineSegs[i];
        // Split the line segment into multiple segments that fit within grid cells
        clipLineSegmentToGrid(grid, width, height, cellSize, seg, padCount); // add segments to grid
        clipLineSegmentToStrips(strips, height, seg); // add segments to strips
    }
    findCloseCells(grid, colCount, cellSize, maxDistance, padCount); // add close cells
    findCrossingCells(grid, colCount, padCount); // add crossing cells
    ////////////////////////////////////////////////////////////////////////////
    const allSegs = [];
    const segIdxs_PerCell_Range = [];
    // close cells
    const closeCellIdxs_PerCell = [];
    const closeCellIdxs_PerCell_Range = [];
    // crossing cells
    const crossCellIdxs_PerCell = [];
    const crossCellIdxs_PerCell_Range = [];
    // const closeCellIdxsPerCell_: number[][] = [];  // testing
    let S1 = 0;
    let S2 = 0;
    let S3 = 0;
    for (let i = 0; i < colCount + 2 * padCount; i++) {
        for (let j = 0; j < ROW_COUNT + 2 * padCount; j++) {
            const cell = grid[i][j];
            ///////////
            if (i >= padCount && i < colCount + padCount &&
                j >= padCount && j < ROW_COUNT + padCount) {
                const { closeCells, crossingCells } = cell;
                const L1 = crossingCells.length;
                crossCellIdxs_PerCell.push(...crossingCells);
                crossCellIdxs_PerCell_Range.push([S1, L1]);
                S1 += L1;
                const L2 = closeCells.length;
                closeCellIdxs_PerCell.push(...closeCells);
                closeCellIdxs_PerCell_Range.push([S2, L2]);
                S2 += L2;
                // closeCellIdxsPerCell_.push(closeCells);  // testing
            }
            //////////
            const { lineSegs } = cell;
            const L3 = lineSegs.length;
            segIdxs_PerCell_Range.push([S3, L3]);
            S3 += L3;
            allSegs.push(...lineSegs);
        }
    }
    // It is a requirement to fill in multiples of `TEX_WIDTH`
    while (closeCellIdxs_PerCell.length % TEX_WIDTH !== 0) {
        closeCellIdxs_PerCell.push(0);
    }
    while (crossCellIdxs_PerCell.length % TEX_WIDTH !== 0) {
        crossCellIdxs_PerCell.push(0);
    }
    // Add line segs from strips
    const segIdxs_PerStrip_Range = [];
    for (let i = 0; i < ROW_COUNT; i++) {
        const lineSegs = strips[i];
        //////////
        const L = lineSegs.length;
        segIdxs_PerStrip_Range.push([S3, L]);
        S3 += L;
        allSegs.push(...lineSegs);
    }
    // all line segments, with their ranges per cell and per strip
    const lineSegPtCoords_Arr = new Float32Array(allSegs.flat(2));
    const segIdxs_PerCell_Range_Arr = new Int32Array(segIdxs_PerCell_Range.flat());
    // close cell idxs and range
    const closeCellIdxs_PerCell_Range_Arr = new Int32Array(closeCellIdxs_PerCell_Range.flat());
    const closeCellIdxs_PerCell_Arr = new Int32Array(closeCellIdxs_PerCell);
    // cross cell idxs and range
    const crossCellIdxs_PerCell_Arr = new Int32Array(crossCellIdxs_PerCell);
    const crossCellIdxs_perCell_Range_Arr = new Int32Array(crossCellIdxs_PerCell_Range.flat());
    // segment index ranges per strip
    const segIdxs_PerStrip_Range_Arr = new Int32Array(segIdxs_PerStrip_Range.flat());
    // testing
    // const r = sum(closeCellIdxsPerCell_.map((c: number[]) => {
    //     let tot = 0;
    //     for (let i=0; i<c.length; i++) {
    //         const idx = c[i];
    //         const u = Math.trunc(idx / (ROW_COUNT + 2*padCount));
    //         const v = idx % (ROW_COUNT + 2*padCount);
    //         tot += grid[u][v].lineSegs.length;
    //     }
    //     return tot;
    // }));
    // console.log(r, r/colCount/ROW_COUNT);
    return {
        lineSegPtCoords_Arr,
        segIdxs_PerCell_Range_Arr,
        closeCellIdxs_PerCell_Arr, closeCellIdxs_PerCell_Range_Arr,
        crossCellIdxs_PerCell_Arr, crossCellIdxs_perCell_Range_Arr,
        segIdxs_PerStrip_Range_Arr
    };
}
export { prepareBuffers };
//# sourceMappingURL=prepare-buffers.js.map