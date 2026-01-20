
/**
 * Returns the ordered (by t-value) intersection points of the given line
 * segment and square.
 * 
 * @param seg a line segment given by its endpoints
 * @param square a square given by its two opposing corner points, min-x, min-y
 * first
 */
function segBoxX(
        seg: number[][],
        square: number[][]) {

    const [p0, p1] = seg;
    const [x0, y0] = p0;
    const [x1, y1] = p1;
    
    const [[minX, minY], [maxX, maxY]] = square;

    // Check if line segment intersects any of the four square edges
    const dx = x1 - x0;
    const dy = y1 - y0;
    
    // Parametric line equation: P(t) = P1 + t*(P2-P1), where 0 <= t <= 1
    
    const ts: number[] = [];
    const ps: number[][] = [];

    if (dx !== 0) {
        // Check intersection with left edge (x = minX)
        const tL = (minX - x0)/dx;
        if (tL >= 0 && tL <= 1) {
            const y = y0 + tL*dy;
            if (y >= minY && y <= maxY) {
                ts.push(tL);
                ps.push([minX, y]);
            }
        }
        
        // Check intersection with right edge (x = maxX)
        const tR = (maxX - x0)/dx;
        if (tR >= 0 && tR <= 1) {
            const y = y0 + tR*dy;
            if (y >= minY && y <= maxY) {
                ts.push(tR);
                ps.push([maxX, y]);
            }
        }
    }
    
    if (dy !== 0) {
        // Check intersection with bottom edge (y = minY)
        const tT = (minY - y0)/dy;
        if (tT >= 0 && tT <= 1) {
            const x = x0 + tT*dx;
            if (x >= minX && x <= maxX) {
                ts.push(tT);
                ps.push([x, minY]);
            }
        }

        // Check intersection with top edge (y = maxY)
        const tB = (maxY - y0)/dy;
        if (tB >= 0 && tB <= 1) {
            const x = x0 + tB*dx;
            if (x >= minX && x <= maxX) {
                ts.push(tB);
                ps.push([x, maxY]);
            }
        }
    }
    
    // TODO might be more than 2!!
    if (ts.length === 2) {
        return ts[0] < ts[1]
            ? ps
            : [ps[1],ps[0]];
    }

    return ps;
}


export { segBoxX }
