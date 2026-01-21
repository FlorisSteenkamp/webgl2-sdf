import { fromTo2 } from './from-to-2.js';
import { fromTo3 } from './from-to-3.js';
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters.
 *
 * @param ps an order 2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 */
function fromTo(ps, tS, tE) {
    if (ps.length === 4) {
        return fromTo3(ps, tS, tE);
    }
    if (ps.length === 3) {
        return fromTo2(ps, tS, tE);
    }
    throw new Error('The given bezier curve must be of order 2 or 3.');
}
export { fromTo };
//# sourceMappingURL=from-to.js.map