/**
 * A single cell in the grid
 */
interface Cell {
    /** line segments contained within the cell */
    readonly lineSegs: number[][][];
    /**
     * other cells (represented by their u and v indexes as ROW_COUNT*u + v)
     * containing line segments and being close to this one in
     * some (specific) sense
     */
    readonly closeCells: number[];
    /**
     * represented by their u and v indexes as ROW_COUNT*u + v
     */
    readonly crossingCells: number[];
}
export type { Cell };
