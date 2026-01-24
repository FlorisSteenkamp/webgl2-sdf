WORK IN PROGRESS!!
Bug reports, pull requests and ⭐⭐⭐⭐⭐s are welcome and appreciated!

## Overview

An ultra-fast library to generate the signed distance field (sdf) of an array
of bezier curves (lines, quadratics, cubics), typically some closed shape(s).

* *dozens of times faster* than [webgl-sdf-generator](https://github.com/lojjic/webgl-sdf-generator) for real-time (60+ fps)
applications even on slow on-board GPUs

The bezier curves can be given in raw form or as an SVG path string (except, arcs are
not supported yet).

Supported path commands: `L, Q, C, H, V, S, T, Z  l, q, c, h, v, s, t, z`

## Installation

```cli
npm install webgl2-sdf
```

## How so fast?
Two basic concepts are used:
* *dynamically* split the bezier curves into line segments up to a specified
accuracy - reduces the number of line segments to check
* divide and pre-filter the number of curve segments within the cells of
a 32x32 grid; then each shader only uses the relevant line segments for sdf
calculation


## Usage
```typescript
import { getWebGlContext, generateSdf, GLSL_PATTERN1 } from "webgl2-sdf";


function drawSdf() {
    const gl: WebGL2RenderingContext = canvas.getContext(
        'webgl2',
        {
            depth: false, stencil: false, antialias: false,
            premultipliedAlpha: false, preserveDrawingBuffer: true
        }
    );

    const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();

    // The first call to `getWebGlContext` caches some context, e.g. compiled shader
    // programs, etc., subsequent calls simply uses the existing cache.
    const glContext = getWebGlContext(gl!);

    // Optional...
    glContext.onContextLoss = onContextLoss;

    const someShape = 
    `
        M 0 0
        L 100 0
        L 100 100
        C 50 100 0 50 0 0
        z
    `;

    try {
        generateSdf(
            glContext!,
            someShape,
            [-50, -50, 150, 150],  // viewBox
            canvasWidth,   // width (of drawing area)
            canvasHeight,  // height (of drawing area)
            50,  // max sdf distance

            // The below options are optional (see function signature for details)
            {
                x: 0, y: 0,  // canvas x, y coordinates; [0,0] is bottom left!
                testInteriorExterior: true,
                calcSdfForInside: true,
                calcSdfForOutside: true,
                customData: [
                    2.0,    // exponent when using default `glslRgbaCalcStr`
                    0, 0, 0
                ],
                colorMask: [true, true, true, true],
                // glslRgbaCalcStr: GLSL_PATTERN1
            }
        );
    } catch (e) {
        console.log(e);
    }
}


function onContextLoss(event: Event) {
    // ... do somethin when context is lost, most likely by re-establishing a new context
    console.log(event);
}

// At the end, **only after you know you'll never call `generateIntoFramebuffer`
// again on the same `WebGL2RenderingContext`**
// freeGlContext(glContext);  // dispose of textures, buffers, shaders, programs, etc.

```

## Recommendations
When calling `generateIntoFramebuffer`:

* ensure the drawing `width` and `height` has the same aspect ratio as the viewbox
else the image will be squashed / stretched
* the `viewbox` is given as `[x1,y1,x2,y2]` and *not* as `[x,y,width,height]` as in SVG
* note the `premultipliedAlpha` option when calling `getContext` and set it to your needs
* if you want to combine a standard `CanvasRenderingContext2D` with a `WebGL2RenderingContext`
it is best practice to have 2 canvases in your html that is stacked on top of each other

## ESM only

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
It can be used in `Node.js` or in a browser.


## License

The MIT License (MIT)

Copyright © 2026 Floris Steenkamp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
