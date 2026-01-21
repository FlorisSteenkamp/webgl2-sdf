/**
 *
 * @param program_
 * @param blockName used both as reference within the `Program` and within
 * the GLSL shaders
 */
function setUniformBlock(program_) {
    return (blockName, bindingPoint, buffer) => {
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
        }
        else {
            gl.bindBuffer(gl.UNIFORM_BUFFER, uniformBlock.buf);
        }
        const { buf } = uniformBlock;
        gl.bufferData(gl.UNIFORM_BUFFER, buffer, gl.STATIC_DRAW);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, bindingPoint, buf);
    };
}
export { setUniformBlock };
//# sourceMappingURL=set-uniform-block.js.map