import type { Texture } from "../types/texture";
import type { Program } from "../types/program";
import type { GlContext } from "../types/gl-context";


const cache = new WeakMap<WebGL2RenderingContext, GlContext>();


/**
 * Returns a `GlContext` by reference via a cache of `WebGL2RenderingContext`s.
 * * if `gl` doesn't exist in the cache yet a new context is created.
 *
 * @param gl the `WebGL2RenderingContext` context to wrap
 * @param callback
 */
function getWebGLContext<T>(
        gl: WebGL2RenderingContext): GlContext {

    {
        const glContext = cache.get(gl);
        if (glContext) { return glContext; }
    }

    const programs: { [index:string]: Program } = {};
    const textures: { [index:string]: Texture } = {};
    const framebufferStack: WebGLFramebuffer[] = [];

    gl.canvas.addEventListener('webglcontextlost', e => {
        handleContextLoss();
        e.preventDefault();
    }, false);

    const glContext: GlContext = {
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


function deleteAllProps(o: { [key:string] : unknown }) {
    Object.keys(o).forEach(key => { delete o[key]; });
}


export { getWebGLContext }
