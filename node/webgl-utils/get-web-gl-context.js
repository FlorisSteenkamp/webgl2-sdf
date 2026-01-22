const cache = new WeakMap();
/**
 * Returns a `GlContext` by reference via a cache of `WebGL2RenderingContext`s.
 * * if `gl` doesn't exist in the cache yet a new context is created.
 *
 * @param gl the `WebGL2RenderingContext` context to wrap
 * @param callback
 */
function getWebGlContext(gl) {
    {
        const glContext = cache.get(gl);
        if (glContext) {
            return glContext;
        }
    }
    const programs = {};
    const textures = {};
    const glContext = { gl, textures, programs };
    gl.canvas.addEventListener('webglcontextlost', event => {
        deleteAllProps(programs);
        deleteAllProps(textures);
        cache.delete(gl);
        glContext.onContextLoss?.(event);
    }, false);
    cache.set(gl, glContext);
    return glContext;
}
function deleteAllProps(o) {
    Object.keys(o).forEach(key => { delete o[key]; });
}
export { getWebGlContext };
//# sourceMappingURL=get-web-gl-context.js.map