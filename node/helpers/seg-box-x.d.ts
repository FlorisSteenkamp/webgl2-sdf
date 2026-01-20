/**
 * Returns the ordered (by t-value) intersection points of the given line
 * segment and square.
 *
 * @param seg a line segment given by its endpoints
 * @param square a square given by its two opposing corner points, min-x, min-y
 * first
 */
declare function segBoxX(seg: number[][], square: number[][]): number[][];
export { segBoxX };
