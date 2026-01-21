import type { Program } from "./program";
import type { Texture } from "./texture";


/**
 * An object wrapping a `WebGL2RenderingContext` and including additional state
 * which includes the following:
 * 
 * * `textures`
 * * `programs`
 * * `framebufferStack`
 * 
 * so they don't have to be recreated on each draw call.
 * 
 * * an optional `width` and `height` that can be used for any purpose and that are not
 * set or read by any function within the library
 * 
 */
interface GlContext {
    readonly gl: WebGL2RenderingContext;
    readonly textures: { [index:string]: Texture };
    readonly programs: { [index:string]: Program };
    readonly onContextLoss: () => void;
}


export type { GlContext }
