import { compileShader } from "./compile-shader";
/**
 * Initiates a WebGL2 program by:
 *
 * * keeping track of `attributes` and `uniforms` locally (within the returned `Program`)
 * * GL: `createProgram`
 * * GL: `compileShader` and `attachShader` (for both Vertex and Fragment shaders)
 * * GL: `linkProgram`
 *
 * @param glContext a context encapsulating our WebGl2 context
 * @param name a name for us to refer to this program
 * @param vert the vertex shader for this program
 * @param frag the fragment shader for this program
 */
function initProgram(glContext, name, vert, frag) {
    const { gl, programs } = glContext;
    if (programs[name]) {
        return programs[name];
    }
    const attributes = {};
    const uniforms = {};
    const uniformBlocks = {};
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, vert, gl.VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl, frag, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    programs[name] = { gl, program, attributes, uniforms, uniformBlocks };
    return programs[name];
}
export { initProgram };
//# sourceMappingURL=use-program.js.map