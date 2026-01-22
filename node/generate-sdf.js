// import { getWebGLContext } from './webgl-utils/get-gl-context.js';
import { vertex } from './shaders/vertex.js';
import { getFragment } from './shaders/fragment.js';
import { initProgram } from './webgl-utils/use-program.js';
import { mainProgram } from './main-program.js';
import { ROW_COUNT } from './row-count.js';
import { getPathsFromStr } from './svg/get-paths-from-str.js';
import { MAX_ASPECT_RATIO_BEFORE_STRETCH } from './max-aspect-ratio-before-stretch.js';
// import { debugShaders } from './debug-shaders.js';
const { ceil, min, max } = Math;
/**
 * Generates an sdf (signed distance field) from the given bezier curves,
 * viewbox, etc. and renders the result
 *
 * @param glContext a `GlConext` previously created by `getWebGlContext(gl: WebGL2RenderingContext)`
 * @param bezierCurves_or_svgStr either of
 * * an array of linear (lines), quadratic or cubic bezier curves (or a mix
 * thereof) given by given by their ordered control points,
 * e.g. `[ [[0,0],[1,1],[2,1],[2,0]], [[2,0],[7,2],[1,5],[8,6]], ... ]` **OR**
 * * an SVG string, e.g. "M26.53 478.83 C028.89 481.61 031.33 484.32 ..."
 * @param width the width of the drawing rectangle
 * @param height the height of the drawing rectangle
 * @param viewbox the viewbox
 * @param maxDistance maximum sdf distance
 * @param sdfExponent TODO
 * @param inclInside if `true` the sdf will be calculate for the inside of the shape
 * @param inclOutside if `true` the sdf will be calculate for the outside of the shape
 * @param x the position where to draw, x-coordinate
 * @param y the position where to draw, y-coordinate
 * @param channel TODO
 */
function generateSdf(glContext, bezierCurves_or_svgStr, width, height, viewbox, maxDistance, sdfExponent = 1, inclInside = true, inclOutside = true, x = 0, y = 0, channel = 0) {
    const psss = typeof bezierCurves_or_svgStr === 'string'
        ? getPathsFromStr(bezierCurves_or_svgStr)
        : bezierCurves_or_svgStr;
    // const glContext = getWebGLContext(gl);
    let stretch = 1;
    const aspectRatio = width / height;
    if (aspectRatio > MAX_ASPECT_RATIO_BEFORE_STRETCH) {
        const r = width / MAX_ASPECT_RATIO_BEFORE_STRETCH;
        stretch = r / height;
        height = r;
    }
    const cellSize = height / ROW_COUNT;
    const maxDim = max(width, height);
    const colCount = ceil(width / cellSize);
    const padCount = 2 * ceil(min(maxDistance, maxDim) / cellSize / 2);
    const programMain = initProgram(glContext, `main${colCount}-${padCount}`, vertex, getFragment(colCount, padCount));
    const { gl } = glContext;
    // debugShaders(gl);  // comment for production
    gl.useProgram(programMain.program);
    mainProgram(glContext, programMain, psss, viewbox, maxDistance, sdfExponent, x, y, width, height, colCount, cellSize, inclInside, inclOutside, padCount, stretch);
    // testing!!
    if (Math.random() > 0.995) {
        const loseContextExt = gl.getExtension('WEBGL_lose_context');
        if (loseContextExt) {
            loseContextExt.loseContext();
        }
    }
}
export { generateSdf };
//# sourceMappingURL=generate-sdf.js.map