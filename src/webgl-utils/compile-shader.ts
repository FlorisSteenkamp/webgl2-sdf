
function compileShader(
        gl: WebGL2RenderingContext,
        src: string,
        type: typeof gl.VERTEX_SHADER | typeof gl.FRAGMENT_SHADER) {

    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    return shader;
}


export { compileShader }
