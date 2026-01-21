const cache = new WeakMap();
/**
 * Returns a `GlContext` by reference via a cache of `WebGL2RenderingContext`s.
 * * if `gl` doesn't exist in the cache yet a new context is created.
 *
 * @param gl the `WebGL2RenderingContext` context to wrap
 * @param callback
 */
function getWebGLContext(gl) {
    {
        const glContext = cache.get(gl);
        if (glContext) {
            return glContext;
        }
    }
    const programs = {};
    const textures = {};
    const framebufferStack = [];
    gl.canvas.addEventListener('webglcontextlost', e => {
        handleContextLoss();
        e.preventDefault();
    }, false);
    const glContext = {
        gl,
        onContextLoss: handleContextLoss,
        textures,
        programs,
        framebufferStack
    };
    cache.set(gl, glContext);
    return glContext;
    ////////////////////////
    function handleContextLoss() {
        deleteAllProps(programs);
        deleteAllProps(textures);
        framebufferStack.length = 0;
    }
}
function deleteAllProps(o) {
    Object.keys(o).forEach(key => { delete o[key]; });
}
export { getWebGLContext };
//# sourceMappingURL=get-gl-context.js.map