import type { Strip } from "../types/strip.js";
/**
 * Clips a line segment to strip boundaries and returns multiple segments.
 *
 * * modifies strips by adding line segments to each strip
 * * size/count *must* be a power of 2
 *
 * @param count the number of strips
 * @param height the height of a strip
 * @param seg the line segment (array of 2 points)
 */
declare function clipLineSegmentToStrips(strips: Strip[], height: number, seg: number[][]): void;
export { clipLineSegmentToStrips };
