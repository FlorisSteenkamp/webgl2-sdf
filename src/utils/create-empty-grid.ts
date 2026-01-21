import { ROW_COUNT } from "../row-count.js";
import { Cell } from "../types/cell.js";


/**
 * 
 * @param colCount
 * @param padCount
 */
function createEmptyGrid(
        colCount: number,
        padCount: number) {

    const grid: Cell[][] = [];
    // for (let u=0; u<ROW_COUNT + 2*padCount; u++) {
    for (let u=0; u<colCount + 2*padCount; u++) {
        const cells: Cell[] = [];
        for (let v=0; v<ROW_COUNT + 2*padCount; v++) {
            cells.push({
                lineSegs: [],
                closeCells: [],
                crossingCells: []
            });
        }
        grid.push(cells);
    }

    return grid;
}


export { createEmptyGrid }
