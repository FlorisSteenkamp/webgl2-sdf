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

    gl.canvas.addEventListener('webglcontextlost', e => {
        onContextLoss();
        e.preventDefault();
    }, false);

    const glContext: GlContext = {
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


function deleteAllProps(o: { [key:string] : unknown }) {
    Object.keys(o).forEach(key => { delete o[key]; });
}


export { getWebGlContext }
