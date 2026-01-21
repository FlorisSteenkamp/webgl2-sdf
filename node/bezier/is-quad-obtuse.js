import { fromToVec } from '../vector/from-to-vec';
import { dot } from "../vector/dot";
/**
 * Returns `true` if the given quadratic bezier is obtuse, `false` otherwise (i.e.
 * `false` if acute).
 *
 * Obtuse here is defined as follows: let the quad form a triangle through its
 * control points P0, P1, P2 where P0 and P2 are the endpoints. If both interior
 * angles ∠P0 and ∠P2 are <= 90 degrees then the quad is considered acute,
 * otherwise it is considered obtuse.
 */
function isQuadObtuse(ps) {
    const v0 = fromToVec(ps[0], ps[1]);
    const v1 = fromToVec(ps[1], ps[2]);
    const v2 = fromToVec(ps[2], ps[0]);
    return (dot(v2, v0) > 0 ||
        dot(v1, v2) > 0);
}
export { isQuadObtuse };
//# sourceMappingURL=is-quad-obtuse.js.map