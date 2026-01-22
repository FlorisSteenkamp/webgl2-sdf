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
    gl.canvas.addEventListener('webglcontextlost', e => {
        onContextLoss();
        e.preventDefault();
    }, false);
    const glContext = {
        gl,
        onContextLoss,
        textures,
        programs
    };
    cache.set(gl, glContext);
    return glContext;
    ////////////////////////
    function onContextLoss() {
        deleteAllProps(programs);
        deleteAllProps(textures);
    }
}
function deleteAllProps(o) {
    Object.keys(o).forEach(key => { delete o[key]; });
}
export { getWebGlContext };
//# sourceMappingURL=get-web-gl-context.js.map