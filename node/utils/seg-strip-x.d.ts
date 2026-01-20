/**
 * Returns the ordered (by t-value) intersection points of the given line
 * segment and half-open strip.
 *
 * @param seg a line segment given by its endpoints
 * @param strip a half-open strip given by max-x, min-y, max-y
 */
declare function segStripX(seg: number[][], strip: number[]): number[][];
export { segStripX };
