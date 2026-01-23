/**
 *
 * @param gl
 * @param type `gl.VERTEX_SHADER | gl.FRAGMENT_SHADER`
 * @param shaderStr
 */
declare function debugGlsl(gl: WebGL2RenderingContext, type: typeof gl.VERTEX_SHADER | typeof gl.FRAGMENT_SHADER, shaderStr: string): void;
declare function debugShaders(gl: WebGL2RenderingContext): void;
export { debugShaders, debugGlsl };
