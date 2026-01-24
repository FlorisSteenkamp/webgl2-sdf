import type { Program } from "./program";
import type { Texture } from "./texture";
/**
 * An object wrapping a `WebGL2RenderingContext` and including additional state
 * which includes the following:
 *
 * * `textures`
 * * `programs`
 *
 * so they don't have to be recreated on each draw call.
 */
interface GlContext {
    readonly gl: WebGL2RenderingContext;
    readonly textures: {
        [index: string]: Texture;
    };
    readonly programs: {
        [index: string]: Program;
    };
    onContextLoss?: (event: Event) => void;
}
export type { GlContext };
