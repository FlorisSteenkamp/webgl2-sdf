import { circsCache } from "./calc-circs.js";

const { trunc, max, E } = Math;


/**
 * @param v 
 */
function binarySearchRange<T>(
        v: number) {

    let min = 0;
    let max = circsCache.length - 1;

    let mid = 0;
    while (min <= max) {
        mid = (min + max) >>> 1;//?
        const midVal = circsCache[mid].from;
        if (midVal === v) {
            // return [min,mid,max];
            return mid;
        } else if (v > midVal) {
            min = mid + 1;
        } else { 
            max = mid - 1; 
        }
    }

    // return [min,mid,max];
    return mid;
}


// const [Q,R] = [10.606601717798213, 35.531676008879735];
// const [A1,B1,F1] = [102.42126, 0.153169, -117.56077];
// const [A2,B2,C2,D2,F2] = [-0.000660087, 0.388148, 841.25744, -0.0529616, -1089.49916];
// const [A3,B3,C3,D3,F3] = [-7567711.63, -0.0251756, 7562560.69, 0.025054, -7475.16953];
// function jumpIdxOld(
//         c: number) {

//     let idx = trunc(
//         c <= 0 ? 0 : c <= 0.7071067811865476 ? 1 : c <= 1.5 ? 5
//         // Three-part regression (faster than binary search in this case)
//         : (c <= Q) 
//         ? A1*(E**(B1*c)) + F1
//         : c <= R
//         ? A2*(E**(B2*c)) + C2*(E**(-D2*c)) + F2
//         : A3*(E**(B3*c)) + C3*(E**(-D3*c)) + F3);

//     c = max(0, c);
//     while (circsCache[idx].from > c) { idx--; }
//     while (circsCache[idx + 1].from < c) { idx++; }

//     return idx;
// }


function jumpIdx(
        c: number) {

    let idx = binarySearchRange(c);

    c = max(0, c);
    while (idx !== 0 && circsCache[idx].from >= c) { idx--; }
    while (idx < circsCache.length - 2 && circsCache[idx + 1].from < c) { idx++; }

    return idx;
}


export { jumpIdx }


// Quokka tests
// // circsCache.slice(0,30).map(c => c.from);//?
// circsCache[12].from;//?
// circsCache[15].from;//?
// // circsCache.length;//?

// // jumpIdxOld(1.5811388300841898);//?
// jumpIdx(0.5);//?
// binarySearchRange(1.5811388300841898);//?


// jumpIdxOld(3.7);//?
// jumpIdx(3.7);//?
// // binarySearchRange(3.7);//?

// jumpIdxOld(0);//?
// jumpIdx(0);//?
// // binarySearchRange(0);//?

// jumpIdxOld(13.7);//?
// jumpIdx(13.7);//?
// // binarySearchRange(13.7);//?

// jumpIdxOld(33.7);//?
// jumpIdx(33.7);//?
// // binarySearchRange(33.7);//?

// // jumpIdxOld(55);//?
// // jumpIdx(55);//?
// binarySearchRange(55);//?




