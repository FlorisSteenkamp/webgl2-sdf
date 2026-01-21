import type { Cell } from "../types/cell.js";
import { ROW_COUNT } from "../row-count.js";
import { circsCache } from "./calc-circs.js";
import { jumpIdx } from "./jump-idx.js";


const { min, max, SQRT2 } = Math;


function findCloseCells(
        grid: Cell[][],
        colCount: number,
        cellSize: number,
        maxDistance: number,
        padCount: number) {

    const findCloseCellsFor_ = findCloseCellsFor(grid, colCount, cellSize, maxDistance, padCount)
    
    let _minD = 0;  // minimum for previous row, col 0
    let minD = 0;
    for (let i=padCount; i<colCount + padCount; i++) {
        minD = _minD;
        for (let j=padCount; j<ROW_COUNT + padCount; j++) {
            minD = findCloseCellsFor_(i, j, minD);
            if (j === padCount) { _minD = minD; }
        }
    }
}


function findCloseCellsFor(
        grid: Cell[][],
        colCount: number,
        cellSize: number,
        maxDistance: number,
        padCount: number) {

    return function findCloseCellsFor_(
            i: number,
            j: number,
            _minD: number): number {

        // reduce current circle search range since we moved one square
        let k = jumpIdx((_minD - SQRT2*cellSize) / cellSize);
        let minD = Number.POSITIVE_INFINITY;
        while (true) {
            if (k >= circsCache.length) {
                minD = cellSize*(circsCache[circsCache.length - 1].from - SQRT2);
                break;
            }

            const { u, v, from } = circsCache[k];

            // `SQRT2` to account for diagonal
            if (cellSize*from > maxDistance + SQRT2*cellSize) {
                minD = cellSize*(from - 2*SQRT2);
                break;
            }

            const u_ = u + i;
            const v_ = v + j;
            if (u_ < 0 || u_ >= colCount + 2*padCount ||
                v_ < 0 || v_ >= ROW_COUNT + 2*padCount) {

                k++; continue;
            }

            const { lineSegs } = grid[u_][v_];

            if (lineSegs.length > 0) {
                minD = cellSize*(from - SQRT2);
                break;
            }

            k++;
        }


        const { closeCells } = grid[i][j];

        let l = max(0, k - 1);
        while (l < circsCache.length) {
            const { from, u, v } = circsCache[l];

            // `SQRT2` to account for diagonal (times 2 since we minused it off earlier)
            if (cellSize*from > min(minD, maxDistance) + 2*SQRT2*cellSize) {
                break;
            }

            const u_ = u + i;
            const v_ = v + j;
            if (u_ < 0 || u_ >= colCount + 2*padCount ||
                v_ < 0 || v_ >= ROW_COUNT + 2*padCount) {

                l++; continue;
            }

            const { lineSegs } = grid[u_][v_];
            if (lineSegs.length > 0) {
                closeCells.push((2*padCount + ROW_COUNT)*u_ + v_);
            }

            l++;
        }

        return minD;
    }
}


export { findCloseCells }
