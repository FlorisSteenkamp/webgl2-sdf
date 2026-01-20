/**
 * Returns an array of line segments that is an approximation of the given
 * bezier curves up to `PIXEL_ACCURACY` accuracy.
 *
 * @param bezierLoops
 * @param resolution each bezier curve is split until its hausdorff distance
 * from the line connecting it's endpoints are less than this value
 */
declare function bezierCurvesToLineSegs(bezierLoops: (number[][])[][], resolution: 0.5 | 1): number[][][];
export { bezierCurvesToLineSegs };
