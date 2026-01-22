/**
 * Returns the result of splitting the given bezier curve into straight line
 * segments up to `maxDeviation`
 *
 *
 * @param ps
 * @param maxDeviation maximum deviation from straight line
 */
declare function splitIntoLineSegments(ps: number[][]): number[][][];
export { splitIntoLineSegments };
