import type { Texture } from "../types/texture.js";
import type { Program } from "../types/program.js";
import type { GlContext } from "../types/gl-context.js";


const cache = new WeakMap<WebGL2RenderingContext, GlContext>();


/**
 * Returns a `GlContext` by reference via a cache of `WebGL2RenderingContext`s.
 * * if `gl` doesn't exist in the cache yet a new context is created.
 *
 * @param gl the `WebGL2RenderingContext` context to wrap
 * @param callback
 */
function getWebGlContext(
        gl: WebGL2RenderingContext): GlContext {

    {
        const glContext = cache.get(gl);
        if (glContext) { return glContext; }
    }

    const programs: { [index:string]: Program } = {};
    const textures: { [index:string]: Texture } = {};

    const glContext: GlContext = { gl, textures, programs };

    gl.canvas.addEventListener('webglcontextlost', event => {
        // event.preventDefault();  // Prevent the default action (which is to not restore automatically)

        deleteAllProps(programs);
        deleteAllProps(textures);
        cache.delete(gl);

        glContext.onContextLoss?.(event);
    }, false);

    cache.set(gl, glContext);

    return glContext;
}


function deleteAllProps(o: { [key:string] : unknown }) {
    Object.keys(o).forEach(key => { delete o[key]; });
}


export { getWebGlContext }
