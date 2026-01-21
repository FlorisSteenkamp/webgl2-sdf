import type { Cell } from "../types/cell.js";
import { ROW_COUNT } from "../row-count.js";


function findCrossingCells(
        grid: Cell[][],
        colCount: number,
        padCount: number) {

    for (let i=padCount; i<colCount + padCount; i++) {
        for (let j=padCount; j<ROW_COUNT + padCount; j++) {
            const cc = grid[i][j].crossingCells;

            for (let k=padCount; k<=i; k++) {
                if (grid[k][j].lineSegs.length === 0) { continue; }
                cc.push((ROW_COUNT + 2*padCount)*k + j);
            }
        }
    }
}


export { findCrossingCells }
