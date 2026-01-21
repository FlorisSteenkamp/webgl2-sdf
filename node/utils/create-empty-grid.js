import { ROW_COUNT } from "../row-count.js";
/**
 *
 * @param colCount
 * @param padCount
 */
function createEmptyGrid(colCount, padCount) {
    const grid = [];
    // for (let u=0; u<ROW_COUNT + 2*padCount; u++) {
    for (let u = 0; u < colCount + 2 * padCount; u++) {
        const cells = [];
        for (let v = 0; v < ROW_COUNT + 2 * padCount; v++) {
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
export { createEmptyGrid };
//# sourceMappingURL=create-empty-grid.js.map