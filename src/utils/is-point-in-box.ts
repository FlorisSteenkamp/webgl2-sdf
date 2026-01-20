
function isPointInBox(
        p: number[],
        box: number[][]) {

    const [x,y] = p;
    const [[xS,yS],[xE,yE]] = box;

    return (
        x > xS && x < xE &&
        y > yS && y < yE
    );
}


export { isPointInBox }
