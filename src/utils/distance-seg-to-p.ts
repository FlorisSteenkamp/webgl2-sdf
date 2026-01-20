
const { min, max, sqrt } = Math;


/**
 * Returns the minimum distance from the given line segment to the origin.
 */
function distanceSegToP(
        seg: number[][],
        p: number[]) {

    const seg0 = seg[0];
    const seg1 = seg[1];
    const _x1 = seg0[0];
    const _y1 = seg0[1];
    const _x2 = seg1[0];
    const _y2 = seg1[1];

    const x = p[0];
    const y = p[1];

    const x1 = _x1 - x;
    const y1 = _y1 - y;
    const x2 = _x2 - x;
    const y2 = _y2 - y;
    
    // Vector from point 1 to point 2
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    const lengthSq = dx*dx + dy*dy;
    
    // Calculate projection parameter t
    // t represents where the closest point lies on the line segment
    // t = 0 means closest point is at seg[0], t = 1 means closest point is at seg[1]
    const t = max(0, min(1, -(x1*dx + y1*dy) / lengthSq));
    
    // Find the closest point on the segment
    const closestX = x1 + t*dx;
    const closestY = y1 + t*dy;
    
    // Return distance from origin to closest point
    return sqrt(closestX*closestX + closestY*closestY);
}


export { distanceSegToP }

// Quokka tests
// distanceSegToOrigin([[0,1],[-1,-2]]);//?
