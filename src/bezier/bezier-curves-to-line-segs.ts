import { isReallyPoint } from "./is-really-point.js";
import { splitIntoLineSegments } from "./split-into-line-segments.js";


/**
 * Returns an array of line segments that is an approximation of the given
 * bezier curves up to `PIXEL_ACCURACY` accuracy.
 * 
 * @param bezierLoops 
 * @param resolution each bezier curve is split until its hausdorff distance
 * from the line connecting it's endpoints are less than this value
 */
function bezierCurvesToLineSegs(
        bezierLoops: (number[][])[][]) {

    let lineSegs: number[][][] = [];
    for (let i=0; i<bezierLoops.length; i++) {
        const pss = bezierLoops[i];
        for (let j=0; j<pss.length; j++) {
            const ps = pss[j];
            if (isReallyPoint(ps)) { continue; }

            if (ps.length === 2) {
                lineSegs.push(ps);
                continue;
            }

            const lineSegs_ = splitIntoLineSegments(ps);

            lineSegs.push(...lineSegs_.filter(ps => !isReallyPoint(ps)));
        }
    }

    return lineSegs;
}


export { bezierCurvesToLineSegs }
