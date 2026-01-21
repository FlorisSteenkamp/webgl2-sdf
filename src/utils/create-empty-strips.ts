import { ROW_COUNT } from "../row-count.js";
import { Strip } from "../types/strip.js";


/**
 * 
 * @param count the number of strips
 */
// TODO - remove
function createEmptyStrips() {
    const strips: Strip[] = [];
    for (let v=0; v<ROW_COUNT; v++) {
        // TODO - simplify
        strips.push({ lineSegs: [] });
    }

    return strips;
}


export { createEmptyStrips }
