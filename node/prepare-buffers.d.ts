declare function prepareBuffers(psss: (number[][])[][], width: number, height: number, colCount: number, cellSize: number, maxDistance: number, padCount: number, viewbox?: [number, number, number, number], stretch?: number): {
    lineSegPtCoords_Arr: Float32Array<ArrayBuffer>;
    segIdxs_PerCell_Range_Arr: Int32Array<ArrayBuffer>;
    closeCellIdxs_PerCell_Arr: Int32Array<ArrayBuffer>;
    closeCellIdxs_PerCell_Range_Arr: Int32Array<ArrayBuffer>;
    crossCellIdxs_PerCell_Arr: Int32Array<ArrayBuffer>;
    crossCellIdxs_perCell_Range_Arr: Int32Array<ArrayBuffer>;
    segIdxs_PerStrip_Range_Arr: Int32Array<ArrayBuffer>;
};
export { prepareBuffers };
