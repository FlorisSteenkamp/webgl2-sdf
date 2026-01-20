Bug reports, pull requests and ⭐⭐⭐⭐⭐s are welcome and appreciated!

## Overview

A library to generate the signed distance transform (sdf) of an array of bezier
curves, typically some some closed shape(s).

* being *dozens of times faster* than ()[webgl-sdf-generator] real-time (60 fps)
is easily achievable even for complex shapes

* drop-in replacement for ()[webgl-sdf-generator] with some additional options

* written in TypeScript

The bezier curves can be given in raw form or as an svg string (except arcs are
not supported)

```typescript
// some cubic bezier curve given by an array of its control points
const cubic1 = [[6.4, 4.8], [15, 5], [1, 4], [10, 4]];
const p2 = evaluate(cubic2,xs[0][1]);  //=> [7.6179261410151105, 4.822433357454532]
```

## Features

* **Fast** Special care has been taken to ensure each function performs well not 
only in theory but also in practice.

## Installation

```cli
npm install flo-bezier3
```

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
It can be used in `Node.js` or in a browser.

Additionally, self-contained `ECMAScript Module` (ESM) files `index.js` and
`index.min.js` in the `./browser` folder are provided.

## Usage

Below are usage examples for some common environments. 

Please see the [docs](https://florissteenkamp.github.io/FloBezier) for a complete
list of available functions.

### Node.js
```js
import { fitQuadsToCubic } from 'flo-bezier3';

// some cubic bezier curve given by an array of its control points
const cubic = [[1, 1], [5.125, 8], [15.375, 0.875], [13.6875, 7.71875]];
const quads = fitQuadsToCubic(cubic, 0.1); //=> [[[1, 1], [2.617431640625, 3.5152587890625], ...

if (quads.length === 4) {
    console.log('success! 😁');  // we should get to here!
} else {
    console.log('failure! 😥');  // ...and not here
}
```

### Browsers - directly, without a bundler, using the pre-bundled minified .js file

Please note that no tree shaking will take place in this case.

```html
<!doctype html>

<html lang="en">
<head>
    <script type="module">
        import { fitQuadsToCubic } from "./node_modules/flo-bezier3/browser/index.min.js";

        // some cubic bezier curve given by an array of its control points
        const cubic = [[1, 1], [5.125, 8], [15.375, 0.875], [13.6875, 7.71875]];
        const quads = fitQuadsToCubic(cubic, 0.1); //=> [[[1, 1], [2.617431640625, 3.5152587890625], ...

        if (quads.length === 4) {
            console.log('success! 😁');  // we should get to here!
        } else {
            console.log('failure! 😥');  // ...and not here
        }
    </script>
</head>

<body>Check the console.</body>

</html>
```

### Bundlers (Webpack, Rollup, ...)

Webpack will be taken as an example here.

Since your webpack config file might still use `CommonJS` you must rename 
`webpack.config.js` to `webpack.config.cjs`.

If you are using TypeScript:

Since this is an [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
library you must use [resolve-typescript-plugin](https://www.npmjs.com/package/resolve-typescript-plugin) 
(at least until webpack catches up with ESM?) in your `webpack.config.cjs` file.

```cli
npm install --save-dev resolve-typescript-plugin
```

and follow the instructions given at [resolve-typescript-plugin](https://www.npmjs.com/package/resolve-typescript-plugin).

Additionally, follow this [guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm).


## License

The MIT License (MIT)

Copyright © 2026 Floris Steenkamp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
