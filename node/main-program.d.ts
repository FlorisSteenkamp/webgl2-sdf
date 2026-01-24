import { Program } from './types/program.js';
import { GlContext } from './types/gl-context.js';
import { SdfOptions } from './generate-sdf.js';
declare function mainProgram(glContext: GlContext, programMain: Program, psss: number[][][][], viewbox: [number, number, number, number], maxDistance: number, width: number, height: number, options: SdfOptions, colCount: number, cellSize: number, padCount: number, stretch: number): void;
export { mainProgram };
