import { Program } from "../types/program";
/**
 *
 * @param program_
 * @param blockName used both as reference within the `Program` and within
 * the GLSL shaders
 */
declare function setUniformBlock(program_: Program): (blockName: string, bindingPoint: number, buffer: AllowSharedBufferSource) => void;
export { setUniformBlock };
