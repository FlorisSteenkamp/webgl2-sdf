import { evalDeCasteljau } from './eval-de-casteljau';
import { splitByDeviationFromStraighLine_Cubic_Crude } from './split-by-deviation-from-straight-line-cubic';
// import { splitByDeviationFromStraighLine_Cubic_Precise } from './split-by-deviation-from-straight-line-cubic';
import { splitByDeviationFromStraighLine_Quad } from './split-by-deviation-from-straight-line-quad';


/**
 * Returns the result of splitting the given bezier curve into straight line
 * segments up to `maxDeviation`
 * 
 * 
 * @param ps 
 * @param maxDeviation maximum deviation from straight line
 */
function splitIntoLineSegments(
        ps: number[][],
        maxDeviation: number) {
    
    const ts = ps.length === 3
        ? splitByDeviationFromStraighLine_Quad(ps, maxDeviation)
        // : splitByDeviationFromStraighLine_Cubic_Precise(ps, maxDeviation)
        : splitByDeviationFromStraighLine_Cubic_Crude(ps, maxDeviation)

    const segs: number[][][] = [];
    for (let i=0; i<ts.length - 1; i++) {
        const p0 = evalDeCasteljau(ps, ts[i]);
        const p1 = evalDeCasteljau(ps, ts[i+1]);
        segs.push([p0,p1]);
    }

    return segs;
}


export { splitIntoLineSegments }


// Quokka tests
// splitByDeviationFromStraighLine([[0,0],[0,4],[-3,4],[20,0]], 0.25);//?