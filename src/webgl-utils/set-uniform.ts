import { Program } from "../types/program";
import { UniformType } from "./uniform-type";


function setUniform(
        program: Program) {

    return (type: UniformType,
            name: string,
            ...values: any[]): void => {

        const { gl, uniforms } = program;

        const uniformLoc =
            uniforms[name] ||
            (uniforms[name] = gl.getUniformLocation(program.program, name));

        // @ts-ignore
        gl[`uniform${type}`](uniformLoc, ...values);
    }
}


export { setUniform }
