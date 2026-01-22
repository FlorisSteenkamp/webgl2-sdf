import { GlContext } from './types/gl-context.js';
/**
 * Generates an sdf (signed distance field) from the given bezier curves,
 * viewbox, etc. and renders the result
 *
 * @param glContext a `GlConext` previously created by `getWebGlContext(gl: WebGL2RenderingContext)`
 * @param bezierCurves_or_svgStr either of
 * * an array of linear (lines), quadratic or cubic bezier curves (or a mix
 * thereof) given by given by their ordered control points,
 * e.g. `[ [[0,0],[1,1],[2,1],[2,0]], [[2,0],[7,2],[1,5],[8,6]], ... ]` **OR**
 * * an SVG string, e.g. "M26.53 478.83 C028.89 481.61 031.33 484.32 ..."
 * @param width the width of the drawing rectangle
 * @param height the height of the drawing rectangle
 * @param viewbox the viewbox
 * @param maxDistance maximum sdf distance
 * @param sdfExponent TODO
 * @param inclInside if `true` the sdf will be calculate for the inside of the shape
 * @param inclOutside if `true` the sdf will be calculate for the outside of the shape
 * @param x the position where to draw, x-coordinate
 * @param y the position where to draw, y-coordinate
 * @param channel TODO
 */
declare function generateSdf(glContext: GlContext, bezierCurves_or_svgStr: (number[][])[][] | string, width: number, height: number, viewbox: [number, number, number, number], maxDistance: number, sdfExponent?: number, inclInside?: boolean, inclOutside?: boolean, x?: number, y?: number, channel?: number): void;
export { generateSdf };
