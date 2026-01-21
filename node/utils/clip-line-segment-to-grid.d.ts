import type { Cell } from "../types/cell.js";
/**
 * Clips a line segment to grid boundaries and returns multiple segments.
 *
 * * modifies grid by adding line segments to cells
 * * size/count *must* be a power of 2
 *
 * @param count the number of grid cells per dimension
 * @param width
 * @param height
 * @param seg the line segment (array of 2 points)
 */
declare function clipLineSegmentToGrid(grid: Cell[][], width: number, height: number, cellSize: number, seg: number[][], padCount: number): void;
export { clipLineSegmentToGrid };
