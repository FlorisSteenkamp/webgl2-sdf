import { Program } from "../types/program.js";
import { UniformType } from "./uniform-type.js";
declare function setUniform(program: Program): (type: UniformType, name: string, ...values: any[]) => void;
export { setUniform };
