
type GLusage = 
    | typeof WebGL2RenderingContext.STATIC_DRAW
    | typeof WebGL2RenderingContext.DYNAMIC_DRAW
    | typeof WebGL2RenderingContext.STREAM_DRAW
    | typeof WebGL2RenderingContext.STATIC_READ
    | typeof WebGL2RenderingContext.DYNAMIC_READ
    | typeof WebGL2RenderingContext.STREAM_READ
    | typeof WebGL2RenderingContext.STATIC_COPY
    | typeof WebGL2RenderingContext.DYNAMIC_COPY
    | typeof WebGL2RenderingContext.STREAM_COPY;


export type { GLusage }
