/**
 * Clips a line segment to strip boundaries and returns multiple segments.
 *
 * * modifies strips by adding line segments to each strip
 * * size/count *must* be a power of 2
 *
 * @param strips array of strips - each contains an array line segments
 * @param height the height of a strip
 * @param seg the line segment (array of 2 points)
 */
declare function clipLineSegmentToStrips(strips: number[][][][], height: number, seg: number[][]): void;
export { clipLineSegmentToStrips };
