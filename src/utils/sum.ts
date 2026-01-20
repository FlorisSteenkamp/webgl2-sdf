
function sum(vs: number[]): number {
    let total = 0;

    for (let i=0; i<vs.length; i++) {
        total += vs[i];
    }

    return total;
}


export { sum }
