WORK IN PROGRESS!!

## Overview

A library to generate the signed distance transform (sdf) of an array of bezier
curves, typically some some closed shape(s).

* *dozens of times faster* than ()[webgl-sdf-generator] for real-time (60 fps)
applications

* drop-in replacement for ()[webgl-sdf-generator] with some additional options

The bezier curves can be given in raw form or as an svg string (except arcs are
not supported)

```typescript

```

Bug reports, pull requests and ⭐⭐⭐⭐⭐s are welcome and appreciated!

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

```

### Browsers - directly, without a bundler, using the pre-bundled minified .js file


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

Follow this [guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm).


## License

The MIT License (MIT)

Copyright © 2026 Floris Steenkamp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
