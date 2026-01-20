
// TODO

// Quokka tests - https://www.desmos.com/calculator/uyqsdkviih
// import { createEmptyGrid } from "./create-empty-grid";
// import { sum } from "../../../../../utils/math/sum";
// function toDesmosStr(seg: number[][]) {
//     const [[x0,y0],[x1,y1]] = seg;
//     return `\\left(\\left(1-t\\right)\\cdot${x0.toFixed(2)}+t\\cdot\\left(${x1.toFixed(2)}\\right),\\left(1-t\\right)\\cdot${y0.toFixed(2)}+t\\cdot${y1.toFixed(2)}\\right)`;
// }
// function testAllEmptyExcept(
//         grid: Cell[][],
//         exceptions: [number,number][],
//         padCount: number) {

//     for (let i=0; i<grid.length; i++) {
//         const cells = grid[i];
//         for (let j=0; j<grid.length; j++) {
//             const cell = cells[j];
//             const idx = exceptions.findIndex((e => e[0] === i && e[1] === j));
//             const exception = exceptions[idx];
//             const len = cell.lineSegs.length;
//             if (exception === undefined) {
//                 if (len !== 0) {
//                     throw new Error(`Grid cell [${i}, ${j}] must be empty`);
//                 }
//             } else {
//                 if (len !== 1) {
//                     throw new Error(`Grid cell [${i}, ${j}] must contain a segment, found ${len}`);
//                 }
//             }
//         }
//     }
// }


// {
//     const padCount = 1;
//     const grid = createEmptyGrid(padCount);
//     const seg = [[-10, 20], [-10, 70]];

//     // toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 1024, seg, 1);
//     // sum(grid[21].map(v => v.lineSegs.length));//?
//     grid[1][1].lineSegs;//?
//     testAllEmptyExcept(grid,[[0,1],[0,2],[0,3]],padCount);
// }

// {
//     const padCount = 1;
//     const grid = createEmptyGrid(padCount);
//     const seg = [[20, 20], [20, 70]];

//     // toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 1024, seg, 1);
//     // sum(grid[21].map(v => v.lineSegs.length));//?
//     grid[1][1].lineSegs;//?
//     testAllEmptyExcept(grid,[[1,1],[1,2],[1,3]],padCount);
    
//     // testAllEmptyExcept(grid,[[0,0]]);
// }


// {
//     const padCount = 1;
//     const grid = createEmptyGrid(padCount);
//     const seg = [[-200, 10], [10, 10]];

//     toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 1024, seg, 1);
//     // sum(grid[21].map(v => v.lineSegs.length));//?
//     testAllEmptyExcept(grid,[[-1,0]],padCount);
//     // testAllEmptyExcept(grid,[[0,0]]);
// }


// {
//     const grid = createEmptyGrid(0);
//     const seg = [[689, 413], [689, 29]];

//     toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 1024, seg, 0);
//     // sum(grid[21].map(v => v.lineSegs.length));//?
//     testAllEmptyExcept(grid,[[21,0],[21,1],[21,2],[21,3],[21,4],[21,5],[21,6],[21,7],[21,8],[21,9],[21,10],[21,11],[21,12]]);
// }


// {
//     const grid = createEmptyGrid(0);
//     const seg = [[20, 45], [20, 29]];

//     toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 128, seg, 0);
//     testAllEmptyExcept(grid,[[2,3]]);
// }


// {
//     const grid = createEmptyGrid(0);
//     const seg = [[492, 281], [642, 317]];

//     toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 512, seg);
//     testAllEmptyExcept(grid,[[7,4]]);
// }


// {
//     const grid = createEmptyGrid(0);
//     const seg = [[148, 213], [165, 224]];

//     toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 512, seg);
//     testAllEmptyExcept(grid,[[2,3]]);
// }

// {
//     const grid = createEmptyGrid(0);
//     const seg = [[167, 223], [167, 415]];

//     toDesmosStr(seg);
//     clipLineSegmentToGrid(grid, 512, seg);
//     grid;
//     testAllEmptyExcept(grid,[[1,1],[1,2],[1,3]]);
// }

// {
//     const grid = createEmptyGrid(0);
//     const segs = [
//         [[-101, -52], [-3.9375, -43.59375]],                 // 0
//         [[-3.9375, -43.59375], [82.75, -32.375]],            // 1
//         [[82.75, -32.375],[122.203125, -25.7109375]],        // 2
//         [[122.203125, -25.7109375], [159.0625, -18.34375]],  // 3
//         [[159.0625, -18.34375], [193.328125, -10.2734375]],  // 4
//         [[193.328125, -10.2734375], [225, -1.5]],            // 5
//         [[225, -1.5], [254.078125, 7.9765625]],              // 6 - starts entering grid
//         [[254.078125, 7.9765625], [280.5625, 18.15625]],     // 7
//         [[280.5625, 18.15625], [304.453125, 29.0390625]],    // 8
//         [[304.453125, 29.0390625], [325.75, 40.625]],        // 9
//         [[325.75, 40.625], [344.453125, 52.9140625]],        // 10
//     ];
//     {
//         toDesmosStr(segs[0]);//?
//         clipLineSegmentToGrid(grid, 512, segs[0]);
//         testAllEmptyExcept(grid,[]);
//     }

//     toDesmosStr(segs[6]);//?
//     clipLineSegmentToGrid(grid, 512, segs[6]);
//     testAllEmptyExcept(grid,[[3,0]]);
//     grid;//?
// }

// {
//     const segs = [
//         [[225, -1.5], [254, 8]],  // 0
//         [[225, -1.5], [269, 8]],  // 1
//         [[-100,100],[-10,400]],   // 2
//         [[423,609],[616,450]],    // 3
//         [[423,609],[116,450]],    // 4
//         [[116,450],[423,609]],    // 5 - 4 reversed
//         [[480,-30],[535,35]],     // 6
//         [[535,35],[480,-30]],     // 7 - 6 reversed
//         [[384,256],[512,128]],    // 8
//     ];
//     const exceptions = [
//         [[3,0]],           // 0: start outside, ends inside, covers 1 cell
//         [[3,0], [4,0]],  // 1: start outside, ends inside, covers 2 cells
//         [],                  // 2
//         [],                  // 3
//         [[3,7],[2,7],[1,7]],  // 4
//         [[3,7],[2,7],[1,7]],  // 5
//         [[7,0]],  // 6
//         [[7,0]],  // 7
//         [[6,3],[7,2]],  // 8

//     ] as [number,number,number][][];
//     {
//         toDesmosStr(segs[8]);//?

//         // for (let i=0; i<segs.length; i++) {
//         for (let i=0; i<=8; i++) {
//             const seg = segs[i];
//             const exception = exceptions[i];
//             const grid = createEmptyGrid(0);
//             clipLineSegmentToGrid(grid, 512, seg);
//             grid[7];//?
//             testAllEmptyExcept(grid,exception);
//         }
//     }
// }





// {
//     // const r = clipLineSegmentToGrid(8, 512, [[-1000,-10000],[130,10]]);//?
//     const r = clipLineSegmentToGrid(8, 512, [[0,0],[130,50]]);//?
//     const dess: string[] = [];
//     for (let i=0; i<r.length; i++) {
//         const l = r[i];
//         const [[x0,y0],[x1,y1]] = l;
//         // const [[x0,y0],[x1,y1]] = [[1,2],[3,4]];
//         const des =`\\left(\\left(1-t\\right)\\cdot${x0.toFixed(2)}+t\\cdot\\left(${x1.toFixed(2)}\\right),\\left(1-t\\right)\\cdot${y0.toFixed(2)}+t\\cdot${y1.toFixed(2)}\\right)`;
//         dess.push(des);
//     }
//     dess[0];//?
//     dess[1];//?
// }
