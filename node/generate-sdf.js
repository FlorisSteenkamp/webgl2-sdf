// import { getWebGLContext } from './webgl-utils/get-gl-context.js';
import { vertex } from './shaders/vertex.js';
import { getFragment, GLSL_DEFAULT } from './shaders/fragment.js';
import { initProgram } from './webgl-utils/use-program.js';
import { mainProgram } from './main-program.js';
import { ROW_COUNT } from './row-count.js';
import { getPathsFromStr } from './svg/get-paths-from-str.js';
import { MAX_ASPECT_RATIO_BEFORE_STRETCH } from './max-aspect-ratio-before-stretch.js';
const { ceil, min, max } = Math;
const defaultSdfOptions = {
    x: 0, y: 0,
    testInteriorExterior: true,
    calcSdfForInside: true, calcSdfForOutside: true,
    customData: [1, 0, 0, 0]
};
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
 * @param viewbox the viewbox given as `[x1,x2,y1,y2]` (**not as** `[x,y,widht,height]`)
 * @param width the width of the drawing rectangle
 * @param height the height of the drawing rectangle
 * @param maxDistance maximum sdf distance
 * @param options additional options (see below)
 *
 * **The following are properties of the `options` parameters**
 * @param x defaults to `0`; the position where to draw on the canvas, x-coordinate
 * @param y defaults to `0`; the position where to draw on the canvas, y-coordinate
 * @param testInteriorExterior defaults to `true`;
 * if `false` winds will always be `0.0` and only an un-signed sdf can be calculated since all
 * fragments are considered outside
 * @param calcSdfForInside defaults to `true`;
 * if `false` the sdf will not be calculate for the inside of the shape, in the shader, `res` will always be `1.0`
 * @param calcSdfForOutside defaults to `true`;
 * if `false` the sdf will not be calculate for the outside of the shape, in the shader, `res` will always be `1.0`
 * @param customData optional custom data (must be an array of 4 numbers) to send to
 * the fragment shader as a uniform, e.g. exponent, scale, a timer, or whatever
 * @param glslRgbaCalcStr  a glsl string (#version 300 es) inserted at the end of
 * the fragment shader to modify the output frag color in any way (you can also discard the fragment);
 * see below for available variables that can be used;
 *
 * defaults to (designed to match webgl-sdf-generator)
 * ```glsl
 * float exponent = uCustom.x;
 * res = (pow(1.0 - res, exponent) * 0.5) * (inside ? -1.0 : 1.0);
 * float red = res;
 * float green = res;
 * float blue = res;
 * float alpha = res;
 *
 * ```
 * You must define and assign \`red\`, \`green\`, \`blue\` and \`alpha\`.
 *
 * Usable variables:
 * ```glsl
 * // the result of the distance calculation for this fragment, a value from 0.0 to 1.0
 * // with 1.0 occuring when the fragment is >= maxDistance away and 0.0 when the
 * // fragment is exactly on a curve
 * float res
 *
 * // the number of anti-clockwise winds around the fragment, a value != 0
 * // means the fragment is inside the shape
 * float winds
 *
 * // 4 custom values set via an options parameter of `generateSdf`; defaults to `[1,0,0,0]`;
 * // the first value is used as the exponent within the default `glslRgbaCalcStr`
 * vec4 uCustom;
 *
 * // the max distance value supplied via `generateSdf`
 * float uMaxDistance
 *
 * // bit 0 -> calc sdf when fragment is inside; defaults to 1,
 * // bit 1 -> calc sdf when fragment is outside; defaults to 1
 * // bit 1 -> calc `winds` (required for signing the distance); defaults to 1
 * // note: when the distance calculation is not done (via options from `generateSdf`),
 * `res` will be set to 1.0 (max distance away)
 * int uTestInOut
 *
 * // the original x,y coordinates of the fragment in the original space provided
 * // via the `viewbox` in `generateSdf`, e.g. the very bottom-left fragment
 * // will have vXY == (viebox[0], viebox[1]) and the very top right will have
 * // coordinates vXY == (viebox[2], viebox[3])
 * vec2 vXY
 *
 * // whether the point is inside or outside the shape, often used to sign `res`
 * // it is identical to `winds != 0`
 * bool inside
 *
 * // pretty much useless unless you want to create a checkerboard pattern for no good reason
 * int instanceId
 */
function generateSdf(glContext, bezierCurves_or_svgStr, viewbox, width, height, maxDistance, options = defaultSdfOptions) {
    const psss = typeof bezierCurves_or_svgStr === 'string'
        ? getPathsFromStr(bezierCurves_or_svgStr)
        : bezierCurves_or_svgStr;
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
    const { glslRgbaCalcStr } = options;
    const hash = calcStrHash(glslRgbaCalcStr || '');
    const programMain = initProgram(glContext, `main${colCount}-${padCount}-${hash}`, vertex, getFragment(colCount, padCount, glslRgbaCalcStr || GLSL_DEFAULT, hash));
    const { gl } = glContext;
    gl.useProgram(programMain.program);
    mainProgram(glContext, programMain, psss, viewbox, maxDistance, width, height, options, colCount, cellSize, padCount, stretch);
}
/**
 * Calculates and returns a hash of the given string
 */
function calcStrHash(str) {
    if (!str)
        return 0;
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash >>> 0; // Convert to unsigned 32-bit integer
}
export { generateSdf };
//# sourceMappingURL=generate-sdf.js.map