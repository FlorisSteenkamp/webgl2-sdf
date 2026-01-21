function compileShader(gl, src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
}
export { compileShader };
//# sourceMappingURL=compile-shader.js.map