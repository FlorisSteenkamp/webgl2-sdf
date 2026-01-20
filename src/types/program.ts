import type { Attribute } from "./attribute";
import type { UniformBlock } from "../webgl-utils/uniform-block";


interface Program {
    readonly gl: WebGL2RenderingContext;
    readonly program: WebGLProgram;
    readonly attributes: { [index:string]: Attribute };
    readonly uniforms: { [index:string]: WebGLUniformLocation | null };
    readonly uniformBlocks: { [index:string]: UniformBlock };
}


export { Program }
