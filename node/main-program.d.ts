import { Program } from './types/program.js';
import { GlContext } from './types/gl-context.js';
declare function mainProgram(glContext: GlContext, programMain: Program, psss: number[][][][], viewbox: [number, number, number, number], maxDistance: number, sdfExponent: number | undefined, x: number, y: number, width: number, height: number, colCount: number, cellSize: number, inclInside: boolean, inclOutside: boolean, padCount: number, stretch: number): void;
export { mainProgram };
