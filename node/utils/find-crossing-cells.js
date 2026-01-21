import { ROW_COUNT } from "../row-count.js";
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
//# sourceMappingURL=find-crossing-cells.js.map