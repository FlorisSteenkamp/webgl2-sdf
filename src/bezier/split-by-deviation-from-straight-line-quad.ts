import { getDistanceToLineFunction } from '../utils/get-distance-to-line-function.js';
import { evalDeCasteljau } from './eval-de-casteljau';
import { fromTo } from './from-to/from-to';
import { isQuadObtuse } from './is-quad-obtuse';

const { abs } = Math;


/**
 * Split the given quadratic bezier curve into pieces (given as an array of 
 * parameter `t` values) such that each piece is guaranteed to deviate less
 * than `maxD` from a straigh line.
 * 
 * @param ps an order 2 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param maxD
 */
 function splitByDeviationFromStraighLine_Quad(
        ps: number[][], 
        maxD: number): number[] {

    const tsS = [0];
    const tsE = [1];
    while (true) {
        const tS = tsS[tsS.length - 1];
        const tE = tsE[tsE.length - 1];
        const ps_ = fromTo(ps, tS, tE);

        if ((!isQuadObtuse(ps_) && getMaxD(ps_) <= maxD)) {
            tsS.push(tsE.pop()!);
            if (tE === 1) {
                return tsS;
            }
            continue;
        }

        const t = (tS + tE)/2;

        tsE.push(t);
    }
}


function getMaxD(ps: number[][]) {
    if (ps[0][0] === ps[1][0] && ps[0][1] === ps[1][1]) {
        return 0;
    }
    const p = evalDeCasteljau(ps, 0.5);  // peak is reached at t = 0.5
    const dF = getDistanceToLineFunction(ps[0], ps[2]);

    const d = abs(dF(p));

    return d;
}


export { splitByDeviationFromStraighLine_Quad }


// Quokka tests
// splitByDeviationFromStraighLine_Quad([[0,0],[0,4],[-3,4],[20,0]], 0.25);//?
// splitByDeviationFromStraighLine_Quad([
//     [128, 423],
//     [128, 423],
//     [128, 423]
// ]);//?
