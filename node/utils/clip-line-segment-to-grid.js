import { segBoxX } from "./seg-box-x.js";
const { floor, ceil } = Math;
/**
 * Clips a line segment to grid boundaries and returns multiple segments.
 *
 * * modifies grid by adding line segments to cells
 * * size/count *must* be a power of 2
 *
 * @param count the number of grid cells per dimension
 * @param width
 * @param height
 * @param seg the line segment (array of 2 points)
 */
function clipLineSegmentToGrid(grid, width, height, colCount, cellSize, seg, padCount) {
    /** `cellSize` *must* be a power of two */
    // const cellSize = width/ROW_COUNT;
    const padding = cellSize * padCount;
    const [[x0, y0], [x1, y1]] = seg;
    const paddedWidth = width + padding;
    const paddedHeight = height + padding;
    // TODO - investigate lines on edge and corners - ps could be length 4!!
    const ps = segBoxX(seg, [[-padding, -padding], [paddedWidth, paddedHeight]]);
    const p0IsInBox = x0 > -padding && x0 < paddedWidth && y0 > -padding && y0 < paddedHeight;
    const p1IsInBox = x1 > -padding && x1 < paddedWidth && y1 > -padding && y1 < paddedHeight;
    // if line is completely outside box
    if (ps.length < 2 && !p0IsInBox && !p1IsInBox) {
        return;
    }
    // Determine which grid cells the line passes through
    const dX = x1 - x0;
    const dY = y1 - y0;
    // Use Bresenham-like approach to find all grid cells the line crosses
    const stepX = x1 > x0 ? cellSize : -cellSize;
    const stepY = y1 > y0 ? cellSize : -cellSize;
    /** first point of each line segment to connect */
    /** current x position */
    let x = x0;
    /** current y position */
    let y = y0;
    // current intersection index
    let xIdx = 0;
    // left-to-right
    const ltr = stepX > 0;
    // bottom-to-top
    const btt = stepY > 0;
    // // line segment min-y excluded
    // const crossing =
    //     (seg.y > y != seg.w > y) &&
    //     (x > (seg.z - seg.x)*(y - seg.y) / (seg.w - seg.y) + seg.x);
    const fX = ltr ? floor : ceil;
    const fY = btt ? floor : ceil;
    while (true) {
        // Find next grid boundary
        let nextGridX = cellSize * fX((x + stepX) / cellSize);
        let nextGridY = cellSize * fY((y + stepY) / cellSize);
        // Calculate parameter t for intersection with vertical and horizontal grid lines
        // eq. (1)
        const tX = (nextGridX - x0) / dX;
        // eq. (2)
        const tY = (nextGridY - y0) / dY;
        const useTx = (tX < tY && dX !== 0) || dY === 0;
        /** intersection X */
        const xX = useTx ? nextGridX : x0 + tY * dX;
        /** intersection Y */
        const xY = useTx ? y0 + tX * dY : nextGridY;
        // if we're past the line endpoint
        if ((tX > 1 || dX === 0) && (tY > 1 || dY === 0)) {
            const u = floor(x1 / cellSize) + padCount;
            const v = floor(y1 / cellSize) + padCount;
            grid[u]?.[v]?.lineSegs.push([[x, y], [x1, y1]]);
            break;
        }
        // if next grid intersection is on edge of grid
        if ((xX <= -padding || xY <= -padding) || (xX >= paddedWidth || xY >= paddedHeight)) {
            const entering = !p0IsInBox && xIdx === 0;
            if (entering) {
                [x, y] = ps[0]; // update current x,y position
                xIdx++;
                continue;
            }
            else {
                const u = fX(x / cellSize) - (ltr ? 0 : 1) + padCount; // current u
                const v = fY(y / cellSize) - (btt ? 0 : 1) + padCount; // current v
                const seg_ = [[x, y], ps[xIdx]];
                grid[u]?.[v]?.lineSegs.push(seg_);
                break;
            }
        }
        const u = fX(x / cellSize) - (ltr ? 0 : 1) + padCount; // current u
        const v = fY(y / cellSize) - (btt ? 0 : 1) + padCount; // current v
        grid[u]?.[v]?.lineSegs.push([[x, y], [xX, xY]]);
        // update current position
        x = xX;
        y = xY;
    }
}
export { clipLineSegmentToGrid };
//# sourceMappingURL=clip-line-segment-to-grid.js.map