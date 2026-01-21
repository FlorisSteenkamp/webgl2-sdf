import { GlContext } from './types/gl-context.js';
/**
 * TODO
 * @param gl
 * @param psss
 * @param width
 * @param height
 * @param viewbox
 * @param maxDistance
 * @param sdfExponent
 * @param inclInside
 * @param inclOutside
 * @param x
 * @param y
 * @param channel
 * @param resolution
 */
declare function generateIntoFramebuffer(glContext: GlContext, psss: (number[][])[][] | string, width: number, height: number, viewbox: [number, number, number, number], maxDistance: number, sdfExponent?: number, inclInside?: boolean, inclOutside?: boolean, x?: number, y?: number, channel?: number, resolution?: 0.5 | 1): void;
export { generateIntoFramebuffer };
