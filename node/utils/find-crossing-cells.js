import { ROW_COUNT } from "../row-count.js";
// TODO - simplify?
// TODO - could be made much faster by also checking intersections here
// and passing the result to the next cell
function findCrossingCells(grid, colCount, padCount) {
    for (let i = padCount; i < colCount + padCount; i++) {
        for (let j = padCount; j < ROW_COUNT + padCount; j++) {
            const cc = grid[i][j].crossingCells;
            for (let k = padCount; k <= i; k++) {
                if (grid[k][j].lineSegs.length === 0) {
                    continue;
                }
                cc.push((ROW_COUNT + 2 * padCount) * k + j);
            }
        }
    }
}
export { findCrossingCells };
// Quokka tests
// import { createEmptyGrid } from "./create-empty-grid";
// // const g = createEmptyGrid(0);
// const g = createEmptyGrid(0);
// // g[0][0].lineSegs.push([[]]);
// g[2][0].lineSegs.push([[]]);
// g[2][2].lineSegs.push([[]]);
// findCrossingCells(g);
// let r = 2;
// // g.map(r => r.map(c => c.crossingCells))[r].map(v => v);//?
// g.map(r => r.map(c => c.crossingCells))[r].map(v => v.map(r => r[1]));//?
// g;//?
//# sourceMappingURL=find-crossing-cells.js.map