import { segStripX } from "./seg-strip-x.js";


const { floor, ceil } = Math;


/**
 * Clips a line segment to strip boundaries and returns multiple segments.
 * 
 * * modifies strips by adding line segments to each strip
 * * size/count *must* be a power of 2
 * 
 * @param strips array of strips - each contains an array line segments
 * @param height the height of a strip
 * @param seg the line segment (array of 2 points)
 */
function clipLineSegmentToStrips(
        strips: number[][][][],
        height: number,
        seg: number[][]): void {
    
    const count = strips.length;
    /** `cellSize` *must* be a power of two */
    const cellSize = height/count;

    const [p0,p1] = seg;
    const ps = segStripX(seg, [0,0,height]);
    const [x0,y0] = p0;
    const [x1,y1] = p1;

    const dX = x1 - x0;
    const dY = y1 - y0;

    const p0IsInStrip = x0 < 0 && y0 > 0 && y0 < height;
    const p1IsInStrip = x1 < 0 && y1 > 0 && y1 < height;

    // if line is completely outside strip
    if ((ps.length < 2 && !p0IsInStrip && !p1IsInStrip) && 
        ((x0 !== 0 || dX !== 0) || 
         ((y0 <= 0 && y1 <= 0) || (y0 >= height && y1 >= height)))) {

        return;
    }

    // Determine which strips the line passes through

    if (dY === 0) {  // no crossings possible
        return;
    }
    
    // Use Bresenham-like approach to find all strips the line crosses
    const stepY = y1 > y0 ? cellSize : -cellSize;

    /** first point of each line segment to connect */

    /** current x position */
    let x = x0;
    /** current y position */
    let y = y0;

    let i = 0;
    // left-to-right
    const ltr = x1 > x0;
    // bottom-to-top
    const btt = y1 > y0;

    // // line segment min-y excluded
    // const crossing =
    //     (seg.y > y != seg.w > y) &&
    //     (x > (seg.z - seg.x)*(y - seg.y) / (seg.w - seg.y) + seg.x);

    const fY = btt ? floor : ceil;
    while (true) {
        // Find next strip boundary
        let nextGridX = ((ltr && x < 0) || (!ltr && x > 0)) ? 0 : Number.NEGATIVE_INFINITY;

        let nextGridY = cellSize*fY((y + stepY)/cellSize);

        // Calculate parameter t for intersection with horizontal strip lines
        // eq. (1)
        const tX = (nextGridX - x0)/dX;
        // eq. (2)
        const tY = (nextGridY - y0)/dY;

        const useTx = tX < tY && dX !== 0;

        /** intersection X */
        const xX = useTx ? 0 : x0 + tY*dX;
        /** intersection Y */
        const xY = useTx ? y0 + tX*dY : nextGridY;

        // if we're past the line endpoint
        if ((tX > 1 || dX === 0) && tY > 1) {
            const v = floor(p1[1]/cellSize);
            strips[v]?.push([[x,y],p1]);
            break;
        }

        if (((xX >= 0 && (x0 !== 0 || dX !== 0)) || xY <= 0 || xY >= height)) {
            // next strip intersection is on edge of strips
            const entering = !p0IsInStrip && i === 0;

            if (entering) {
                // update current x,y position
                [x,y] = ps[0];
                i++;
                continue;
            } else {
                const v = fY(y/cellSize) - (btt ? 0 : 1);  // previous v
                const seg_ = [[x,y],ps[i]];
                strips[v]?.push(seg_);
                break;
            }
        }

        // previous v
        const v = fY(y/cellSize) - (btt ? 0 : 1);

        strips[v]?.push([[x,y], [xX,xY]]);

        // update current position
        x = xX;
        y = xY;
    }
}


export { clipLineSegmentToStrips }
var a = [[1,1], [1,1]]