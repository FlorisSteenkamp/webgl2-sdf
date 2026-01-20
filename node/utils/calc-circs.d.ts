/**
 * Represents the max distance (in cell side length units) from one corner of
 * the viewbox to the opposing corner.
 */
declare const circsCache: Range[];
interface Range {
    readonly from: number;
    readonly u: number;
    readonly v: number;
}
export { circsCache };
