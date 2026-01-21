import type { Attribute } from "./attribute.js";
import type { UniformBlock } from "../webgl-utils/uniform-block.js";


interface Program {
    readonly gl: WebGL2RenderingContext;
    readonly program: WebGLProgram;
    readonly attributes: { [index:string]: Attribute };
    readonly uniforms: { [index:string]: WebGLUniformLocation | null };
    readonly uniformBlocks: { [index:string]: UniformBlock };
    readonly vertexShader: WebGLShader;
    readonly fragmentShader: WebGLShader;
}


export { Program }
