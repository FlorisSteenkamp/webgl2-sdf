import type { GlContext } from "../types/gl-context.js";
/**
 *
 * @param glContext
 * @param textureIndex the texture index to use on the GPU
 * @param name a custom name to give to the texture for caching
 */
declare function useTexture(glContext: GlContext, textureIndex: number, name: string): import("../types/texture.js").Texture;
export { useTexture };
