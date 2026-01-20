import type { Program } from "../types/program";
import type { GlContext } from "../types/gl-context";
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
declare function initProgram(glContext: GlContext, name: string, vert: string, frag: string): Program;
export { initProgram };
