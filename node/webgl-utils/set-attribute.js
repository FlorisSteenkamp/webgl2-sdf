const { 
// Integer types
BYTE, // 5120
UNSIGNED_BYTE, // 5121
SHORT, // 5122
UNSIGNED_SHORT, // 5123
INT, // 5124
UNSIGNED_INT, // 5125
// Float types
FLOAT, // 5126
HALF_FLOAT, // 5131
INT_2_10_10_10_REV, // 36255
UNSIGNED_INT_2_10_10_10_REV // 33640
 } = WebGL2RenderingContext;
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
function setAttribute(program) {
    return (name, size, type, usage, data, instancingDivisor = 0, stride = 0, offset = 0) => {
        const { gl, attributes } = program;
        const attr = attributes[name] = attributes[name] ?? {
            buf: gl.createBuffer(),
            loc: gl.getAttribLocation(program.program, name),
            data: null
        };
        const { loc, buf } = attr;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        if (type === FLOAT || type === HALF_FLOAT) {
            gl.vertexAttribPointer(loc, size, type, false, stride, offset);
        }
        else {
            gl.vertexAttribIPointer(loc, size, type, stride, offset);
        }
        gl.enableVertexAttribArray(loc);
        if (instancingDivisor !== 0) {
            gl.vertexAttribDivisor(loc, instancingDivisor);
        }
        if (data !== attr.data) {
            gl.bufferData(gl.ARRAY_BUFFER, data, usage);
            attr.data = data;
        }
    };
}
export { setAttribute };
//# sourceMappingURL=set-attribute.js.map