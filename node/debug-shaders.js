import { getFragment, GLSL_DEFAULT } from "./shaders/fragment.js";
import { vertex } from "./shaders/vertex.js";
/**
 *
 * @param gl
 * @param type `gl.VERTEX_SHADER | gl.FRAGMENT_SHADER`
 * @param shaderStr
 */
function debugGlsl(gl, type, shaderStr) {
    const s = gl.createShader(type);
    gl.shaderSource(s, shaderStr);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(s));
    }
}
function debugShaders(gl) {
    try {
        debugGlsl(gl, gl.VERTEX_SHADER, vertex);
        debugGlsl(gl, gl.FRAGMENT_SHADER, getFragment(32, 2, GLSL_DEFAULT, 0));
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export { debugShaders, debugGlsl };
//# sourceMappingURL=debug-shaders.js.map