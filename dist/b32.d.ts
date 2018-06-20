declare const b32c: {
    [key: number]: number;
};
declare const xb: number[];
declare function b32_buf(b32: ArrayBufferView | string, overwrite?: boolean): Uint8Array;
declare const b256: Uint8Array;
declare function buf_b32(bv: ArrayBufferView, useString?: boolean): Uint8Array;
declare function buf_b32(bv: ArrayBufferView, useString?: true): string;
export { b32_buf, buf_b32, b32_buf as decode, buf_b32 as encode, b32c, b256, xb, };
//# sourceMappingURL=b32.d.ts.map
