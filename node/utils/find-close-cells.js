import { ROW_COUNT } from "../row-count.js";
import { circsCache } from "./calc-circs.js";
import { distanceSegToP } from "./distance-seg-to-p.js";
import { jumpIdx } from "./jump-idx.js";
const { min, SQRT2 } = Math;
function findCloseCells(grid, colCount, cellSize, maxDistance, padCount) {
    const findCloseCellsFor_ = findCloseCellsFor(grid, colCount, cellSize, maxDistance, padCount);
    let _minD = 0; // minimum for previous row, col 0
    let minD = 0;
    for (let i = padCount; i < colCount + padCount; i++) {
        minD = _minD;
        for (let j = padCount; j < ROW_COUNT + padCount; j++) {
            minD = findCloseCellsFor_(i, j, minD);
            if (j === padCount) {
                _minD = minD;
            }
        }
    }
}
function findCloseCellsFor(grid, colCount, cellSize, maxDistance, padCount) {
    return function findCloseCellsFor_(i, j, _minD) {
        // reduce current circle search range since we moved one square
        let k = jumpIdx((_minD - SQRT2 * cellSize) / cellSize);
        let minD = Number.POSITIVE_INFINITY;
        while (k < circsCache.length) {
            const from = circsCache[k].from;
            // `SQRT2` to account for diagonal
            if (cellSize * from > maxDistance + SQRT2 * cellSize) {
                break;
            }
            // uncomment loop below to search all equidistant squares
            // while (circsCache?.[k].from === from) {
            const { u, v } = circsCache[k];
            const u_ = u + i;
            const v_ = v + j;
            if (u_ < 0 || u_ >= colCount + 2 * padCount ||
                v_ < 0 || v_ >= ROW_COUNT + 2 * padCount) {
                k++;
                continue;
            }
            const { lineSegs } = grid[u_][v_];
            for (let l = 0; l < lineSegs.length; l++) {
                // center of square
                const c = [(i - padCount + 0.5) * cellSize, (j - padCount + 0.5) * cellSize];
                const d = distanceSegToP(lineSegs[l], c);
                if (d < minD) {
                    minD = d;
                }
            }
            k++;
            // }
            if (minD !== Number.POSITIVE_INFINITY) {
                break;
            }
        }
        if (minD === Number.POSITIVE_INFINITY) {
            return min(maxDistance + SQRT2 * cellSize, cellSize * circsCache[circsCache.length - 1].from);
        }
        const { closeCells } = grid[i][j];
        let l = jumpIdx((_minD - 2 * SQRT2 * cellSize) / cellSize);
        while (l < circsCache.length) {
            const { from, u, v } = circsCache[l];
            // `SQRT2` to account for diagonal
            if (cellSize * from > min(minD, maxDistance) + SQRT2 * cellSize) {
                break;
            }
            const u_ = u + i;
            const v_ = v + j;
            if (u_ < 0 || u_ >= colCount + 2 * padCount ||
                v_ < 0 || v_ >= ROW_COUNT + 2 * padCount) {
                l++;
                continue;
            }
            const { lineSegs } = grid[u_][v_];
            if (lineSegs.length > 0) {
                closeCells.push((2 * padCount + ROW_COUNT) * u_ + v_);
            }
            l++;
        }
        return minD;
    };
}
export { findCloseCells };
// Quokka tests
// const grid: Cell[][] = [
//     [
//         { u: 0, v: 0, lineSegs: [], closeCells: [], crossingCells: [] },
//         { u: 0, v: 1, lineSegs: [], closeCells: [], crossingCells: [] },
//         { u: 0, v: 2, lineSegs: [], closeCells: [], crossingCells: [] },
//         { u: 0, v: 3, lineSegs: [], closeCells: [], crossingCells: [] }
//     ],
//     [
//         { u: 1, v: 0, lineSegs: [], closeCells: [], crossingCells: [] },
//         {
//             u: 1, v: 1,
//             lineSegs: [[[175, 163], [175, 355]]],
//             closeCells: [], crossingCells: []
//         },
//         {
//             u: 1, v: 2,
//             lineSegs: [[[175, 355], [335, 355]]],
//             closeCells: [], crossingCells: []
//         },
//         { u: 1, v: 3, lineSegs: [], closeCells: [], crossingCells: [] }
//     ],
//     [
//         { u: 2, v: 0, lineSegs: [], closeCells: [], crossingCells: [] },
//         {
//             u: 2, v: 1,
//             lineSegs: [[[335, 163], [175, 163]]],
//             closeCells: [], crossingCells: []
//         },
//         {
//             u: 2, v: 2,
//             lineSegs: [[[335, 355], [335, 163]]],
//             closeCells: [], crossingCells: []
//         },
//         { u: 2, v: 3, lineSegs: [], closeCells: [], crossingCells: [] }
//     ],
//     [
//         { u: 3, v: 0, lineSegs: [], closeCells: [], crossingCells: [] },
//         { u: 3, v: 1, lineSegs: [], closeCells: [], crossingCells: [] },
//         { u: 3, v: 2, lineSegs: [], closeCells: [], crossingCells: [] },
//         { u: 3, v: 3, lineSegs: [], closeCells: [], crossingCells: [] }
//     ]
// ];
// findCloseCells(grid);
// const v = grid.map(cells => cells.map(c => ({ u: c.u, v: c.v, closeCells: c.closeCells })));
// v;//?
//# sourceMappingURL=find-close-cells.js.map