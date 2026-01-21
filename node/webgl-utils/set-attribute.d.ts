import { Program } from "../types/program.js";
import { GLattrType } from "../types/gl-type.js";
import { GLusage } from "../types/gl-usage.js";
/**
 *
 * @param name name used in glsl shaders
 * @param size the number of components per vertex attribute. Must be 1, 2, 3, or 4.
 * @param usage one of `gl.STATIC_DRAW`, `gl.DYNAMIC_DRAW`, `gl.STREAM_DRAW`, etc.
 * @param data
 * @param instancingDivisor defaults to 0; 0, 1, ...
 * @param stride defaults to 0;
 * @param offset defaults to 0;
 */
declare function setAttribute(program: Program): (name: string, size: number, type: GLattrType, usage: GLusage, data: AllowSharedBufferSource | null, instancingDivisor?: number, stride?: number, offset?: number) => void;
export { setAttribute };
