import type { Strip } from "../types/strip";
import { segStripX } from "./seg-strip-x";


const { floor, ceil } = Math;


/**
 * Clips a line segment to strip boundaries and returns multiple segments.
 * 
 * * modifies strips by adding line segments to each strip
 * * size/count *must* be a power of 2
 * 
 * @param count the number of strips
 * @param height the height of a strip
 * @param seg the line segment (array of 2 points)
 */
function clipLineSegmentToStrips(
        strips: Strip[],
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
            strips[v]?.lineSegs.push([[x,y],p1]);
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
                strips[v]?.lineSegs.push(seg_);
                break;
            }
        }

        // previous v
        const v = fY(y/cellSize) - (btt ? 0 : 1);

        strips[v]?.lineSegs.push([[x,y], [xX,xY]]);

        // update current position
        x = xX;
        y = xY;
    }
}


export { clipLineSegmentToStrips }


// Quokka tests - https://www.desmos.com/calculator/uyqsdkviih
// import { createEmptyStrips } from "./create-empty-strips";

// {
//     const strips = createEmptyStrips(8);
//     const seg = [[0, 100], [0, 400]];

//     toDesmosStr(seg);
//     clipLineSegmentToStrips(strips, 512, seg);
//     testAllEmptyExcept(strips,[1,2,3,4,5,6]);
// }


// {
//     const strips = createEmptyStrips(8);
//     const seg = [[83, 166], [-90, 440]];

//     toDesmosStr(seg);
//     clipLineSegmentToStrips(strips, 512, seg);
//     testAllEmptyExcept(strips,[4,5,6]);
// }

// {
//     const strips = createEmptyStrips(8);
//     const seg = [[-570, 236], [-392, 546]];

//     toDesmosStr(seg);
//     clipLineSegmentToStrips(strips, 512, seg);
//     testAllEmptyExcept(strips,[3,4,5,6,7]);
// }

// {
//     const strips = createEmptyStrips(8);
//     const seg = [[-462, 632], [-152, 611]];

//     toDesmosStr(seg);
//     clipLineSegmentToStrips(strips, 512, seg);
//     testAllEmptyExcept(strips,[]);
// }


// function toDesmosStr(seg: number[][]) {
//     const [[x0,y0],[x1,y1]] = seg;
//     return `\\left(\\left(1-t\\right)\\cdot${x0.toFixed(2)}+t\\cdot\\left(${x1.toFixed(2)}\\right),\\left(1-t\\right)\\cdot${y0.toFixed(2)}+t\\cdot${y1.toFixed(2)}\\right)`;
// }
// function testAllEmptyExcept(
//         strips: Strip[],
//         exceptions: number[]) {

//     for (let i=0; i<strips.length; i++) {
//         const strip = strips[i];
//         const idx = exceptions.findIndex(v => v === i);
//         const exception = exceptions[idx];
//         const len = strip.lineSegs.length;
//         if (exception === undefined) {
//             if (len !== 0) {
//                 throw new Error(`Strip ${i} must be empty`);
//             }
//         } else {
//             if (len !== 1) {
//                 throw new Error(`Strip ${i} must contain 1 segments, found ${len}`);
//             }
//         }
//     }
// }
