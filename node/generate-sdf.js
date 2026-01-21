// import { getWebGLContext } from './webgl-utils/get-gl-context.js';
import { main_Vertex } from './shaders/main.vertex.js';
import { getMainFragment } from './shaders/main.fragment.js';
import { initProgram } from './webgl-utils/use-program.js';
import { mainProgram } from './main-program.js';
import { ROW_COUNT } from './row-count.js';
import { getPathsFromStr } from './svg/get-paths-from-str.js';
import { MAX_ASPECT_RATIO_BEFORE_STRETCH } from './max-aspect-ratio-before-stretch.js';
// import { debugShaders } from './debug-shaders.js';
const { ceil, min, max } = Math;
/**
 * TODO
 * @param gl
 * @param psss
 * @param width
 * @param height
 * @param viewbox
 * @param maxDistance
 * @param sdfExponent
 * @param inclInside
 * @param inclOutside
 * @param x
 * @param y
 * @param channel
 * @param resolution
 */
function generateIntoFramebuffer(glContext, psss, width, height, viewbox, maxDistance, sdfExponent = 1, inclInside = true, inclOutside = true, x = 0, y = 0, channel = 0, resolution = 0.5) {
    // debugShaders(gl);  // comment for production
    const psss_ = typeof psss === 'string'
        ? getPathsFromStr(psss)
        : psss;
    // const glContext = getWebGLContext(gl);
    const { onContextLoss } = glContext;
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
    const programMain = initProgram(glContext, `main${colCount}-${padCount}`, main_Vertex, getMainFragment(colCount, padCount));
    const { gl } = glContext;
    gl.useProgram(programMain.program);
    mainProgram(glContext, programMain, resolution, psss_, viewbox, maxDistance, sdfExponent, width, height, colCount, cellSize, inclInside, inclOutside, padCount, stretch);
    // Handle context loss occurring during any of the above calls
    if (gl.isContextLost()) {
        onContextLoss();
        throw new Error('Webgl2 context lost.');
    }
}
export { generateIntoFramebuffer };
//# sourceMappingURL=generate-sdf.js.map