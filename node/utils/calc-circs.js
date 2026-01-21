import { MAX_ASPECT_RATIO_BEFORE_STRETCH } from '../max-aspect-ratio-before-stretch.js';
import { ROW_COUNT } from '../row-count.js';
import { len } from '../vector/len.js';
/**
 * Represents the max distance (in cell side length units) from one corner of
 * the viewbox to the opposing corner.
 */
// const diagLen = ceil(sqrt((MAX_ASPECT_RATIO_BEFORE_STRETCH*ROW_COUNT)**2 + ROW_COUNT**2));
const circsCache = calcCircs();
function calcCircs() {
    const ranges = [{ from: 0, u: 0, v: 0 }];
    // for (let i=0; i<ROW_COUNT; i++) {
    for (let i = 0; i < MAX_ASPECT_RATIO_BEFORE_STRETCH * ROW_COUNT; i++) {
        ranges.push({ from: i + 0.5, u: i + 1, v: 0 });
        ranges.push({ from: i + 0.5, u: -i - 1, v: 0 });
        ranges.push({ from: i + 0.5, u: 0, v: i + 1 });
        ranges.push({ from: i + 0.5, u: 0, v: -i - 1 });
        for (let j = 0; j < ROW_COUNT; j++) {
            const p = [0.5 + i, 0.5 + j];
            const d = len(p);
            const u = i + 1;
            const v = j + 1;
            ranges.push({ from: d, u, v });
            if (u !== 0) {
                ranges.push({ from: d, u: -u, v });
            }
            if (v !== 0) {
                ranges.push({ from: d, u, v: -v });
            }
            if (u !== 0 && v !== 0) {
                ranges.push({ from: d, u: -u, v: -v });
            }
        }
        ranges.sort((a, b) => (a.from - b.from));
    }
    return ranges;
}
export { circsCache };
// Quokka tests
// const { E, trunc, max, sqrt, ceil } = Math;
// calcCircs().length;//?
// const cs = calcCircs().map(c => c.from);
// const longest = (() => {
//     let l = 0;
//     let maxL = 0;
//     let _v = 0;
//     for (let i=0; i<cs.length; i++) {
//         const v = cs[i];
//         if (_v === cs[i]) {
//             l++;
//         } else {
//             l = 0;
//         }
//         _v = v;
//         if (l > maxL) {
//             maxL = l;
//         }
//     }
//     return maxL;
// })();//?
// const froms = [
//     { from: 0, to: 50, skip: 1 },
//     { from: 50, to: 3050, skip: 50 },
//     { from: 400, to: 4000, skip: 100 },
//     // { from: 10, to: 100, skip: 10 }
// ];
// for (let j=0; j<froms.length; j++) {
//     const { from, to, skip } = froms[j];
//     let strs: string[] = [];
//     for (let i=from; i<to; i += skip) {
//         const v = cs[i];
//         strs.push(`${v.toString()}	${i}`);
//     }
//     const csStr = strs.join('\n');
//     console.log(csStr);
// }
// jumpIdx(3.7);//?
// for (let i=30; i<44; i += 0.25) {
//     jumpIdx(i);//?
//     [(cs[jumpIdx(i)]), i];//?
// }
// let tot = 0;
// const vs: number[] = [];
// for (let i=400; i<=3800; i++) {
// 	const c = cs[i];
// 	const ap = A*(E**(B*c)) + C*(E**(-D*c)) + F;
// 	const S = B*A*(E**(B*c)) + -D*C*(E**(-D*c));
// 	// i;//?
// 	// ap;//?
// 	const err = abs(i - ap);
// 	tot += err;
// 	vs.push(err);
// }
// vs.sort((a,b) => b - a);//?
// vs[3400];//?
// tot/(3800 - 400);//?
//# sourceMappingURL=calc-circs.js.map