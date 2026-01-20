import type { Program } from "../types/program";
import type { Attribute } from "../types/attribute";
import type { UniformBlock } from "./uniform-block";
import type { GlContext } from "../types/gl-context";
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
function initProgram(
            glContext: GlContext,
            name: string,
            vert: string,
            frag: string): Program {

    const { gl, programs } = glContext;

    if (programs[name]) {
        return programs[name];
    }

    const attributes: { [index:string]: Attribute } = {};
    const uniforms: { [index:string]: WebGLUniformLocation | null } = {};
    const uniformBlocks: { [index:string]: UniformBlock } = {};

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, vert, gl.VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl, frag, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);

    programs[name] = { gl, program, attributes, uniforms, uniformBlocks };

    return programs[name];
}


export { initProgram }
