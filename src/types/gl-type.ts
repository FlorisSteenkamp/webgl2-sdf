
type GLattrType = 
    | typeof WebGL2RenderingContext.BYTE
    | typeof WebGL2RenderingContext.SHORT
    | typeof WebGL2RenderingContext.UNSIGNED_BYTE
    | typeof WebGL2RenderingContext.UNSIGNED_SHORT
    | typeof WebGL2RenderingContext.FLOAT
    // WebGL2 only
    | typeof WebGL2RenderingContext.HALF_FLOAT
    | typeof WebGL2RenderingContext.INT
    | typeof WebGL2RenderingContext.UNSIGNED_INT
    | typeof WebGL2RenderingContext.INT_2_10_10_10_REV
    | typeof WebGL2RenderingContext.UNSIGNED_INT_2_10_10_10_REV;


export type { GLattrType }
