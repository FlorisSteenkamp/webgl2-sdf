declare function generateIntoFramebuffer(gl: WebGL2RenderingContext, psss: (number[][])[][] | string, width: number, height: number, viewbox: [number, number, number, number], maxDistance: number, sdfExponent?: number, inclInside?: boolean, inclOutside?: boolean, x?: number, y?: number, channel?: number, resolution?: 0.5 | 1): void;
export { generateIntoFramebuffer };
