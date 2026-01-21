import { Program } from "../types/program.js";


/**
 * 
 * @param program_ 
 * @param blockName used both as reference within the `Program` and within
 * the GLSL shaders
 */
function setUniformBlock(
        program_: Program) {

    return (blockName: string,
            bindingPoint: number,
            buffer: AllowSharedBufferSource) => {

        const { gl, uniformBlocks, program } = program_;

        // const sizeInBytes = buffer.byteLength;

        let uniformBlock = uniformBlocks[blockName];
        if (uniformBlocks[blockName] === undefined) {
            const blockIndex = gl.getUniformBlockIndex(program, blockName);
            gl.uniformBlockBinding(program, blockIndex, bindingPoint);
            const buf = gl.createBuffer();

            gl.bindBuffer(gl.UNIFORM_BUFFER, buf);

            uniformBlock = { blockName, blockIndex, buf };
            uniformBlocks[blockName] = uniformBlock;
        } else {
            gl.bindBuffer(gl.UNIFORM_BUFFER, uniformBlock.buf);
        }

        const { buf } = uniformBlock;
        
        gl.bufferData(gl.UNIFORM_BUFFER, buffer, gl.DYNAMIC_DRAW);
        // gl.bindBuffer(gl.UNIFORM_BUFFER, null);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, bindingPoint, buf);
        // gl.bindBufferRange(gl.UNIFORM_BUFFER, bindingPoint, ubo, 0, sizeInBytes);
    }
}


export { setUniformBlock }
