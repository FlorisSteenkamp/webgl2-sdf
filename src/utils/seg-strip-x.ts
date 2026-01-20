
/**
 * Returns the ordered (by t-value) intersection points of the given line
 * segment and half-open strip.
 * 
 * @param seg a line segment given by its endpoints
 * @param strip a half-open strip given by max-x, min-y, max-y
 */
function segStripX(
        seg: number[][],
        strip: number[]) {

    const [p0, p1] = seg;
    const [x0, y0] = p0;
    const [x1, y1] = p1;
    
    const [maxX, minY, maxY] = strip;

    // Check if line segment intersects any of the four square edges
    const dx = x1 - x0;
    const dy = y1 - y0;
    
    // Parametric line equation: P(t) = P1 + t*(P2-P1), where 0 <= t <= 1
    
    const ts: number[] = [];
    const ps: number[][] = [];

    if (dx !== 0) {
        // Check intersection with right edge (x = maxX)
        const tL = (maxX - x0)/dx;
        if (tL >= 0 && tL <= 1) {
            const y = y0 + tL*dy;
            if (y >= minY && y <= maxY) {
                ts.push(tL);
                ps.push([maxX, y]);
            }
        }
    }
    
    if (dy !== 0) {
        // Check intersection with bottom edge (y = minY)
        const tT = (minY - y0)/dy;
        if (tT >= 0 && tT <= 1) {
            const x = x0 + tT*dx;
            if (x <= maxX) {
                ts.push(tT);
                ps.push([x, minY]);
            }
        }

        // Check intersection with top edge (y = maxY)
        const tB = (maxY - y0)/dy;
        if (tB >= 0 && tB <= 1) {
            const x = x0 + tB*dx;
            if (x <= maxX) {
                ts.push(tB);
                ps.push([x, maxY]);
            }
        }
    }
    
    if (ts.length === 2) {
        return ts[0] < ts[1]
            ? ps
            : [ps[1],ps[0]];
    }

    return ps;
}


export { segStripX }
