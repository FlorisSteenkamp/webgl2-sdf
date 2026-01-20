import { Program } from "../types/program";
import { UniformType } from "./uniform-type";
declare function setUniform(program: Program): (type: UniformType, name: string, ...values: any[]) => void;
export { setUniform };
