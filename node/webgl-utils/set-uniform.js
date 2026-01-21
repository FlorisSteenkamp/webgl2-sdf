function setUniform(program) {
    return (type, name, ...values) => {
        const { gl, uniforms } = program;
        const uniformLoc = uniforms[name] ||
            (uniforms[name] = gl.getUniformLocation(program.program, name));
        // @ts-ignore
        gl[`uniform${type}`](uniformLoc, ...values);
    };
}
export { setUniform };
//# sourceMappingURL=set-uniform.js.map