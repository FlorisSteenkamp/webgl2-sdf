import type { GlContext } from "../types/gl-context.js";
/**
 * Returns a `GlContext` by reference via a cache of `WebGL2RenderingContext`s.
 * * if `gl` doesn't exist in the cache yet a new context is created.
 *
 * @param gl the `WebGL2RenderingContext` context to wrap
 * @param callback
 */
declare function getWebGlContext(gl: WebGL2RenderingContext): GlContext;
export { getWebGlContext };
