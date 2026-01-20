import { Program } from './types/program.js';
import { GlContext } from './types/gl-context.js';
declare function mainProgram(glContext: GlContext, programMain: Program, resolution: 0.5 | 1, psss: number[][][][], viewbox: [number, number, number, number], maxDistance: number, sdfExponent: number | undefined, width: number, height: number, colCount: number, cellSize: number, inclInside: boolean, inclOutside: boolean, padCount: number, stretch: number): void;
export { mainProgram };
