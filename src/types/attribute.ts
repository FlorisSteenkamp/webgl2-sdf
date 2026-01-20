
interface Attribute {
    readonly buf: WebGLBuffer;
    readonly loc: number;
    data: AllowSharedBufferSource | null;
}


export type { Attribute }
