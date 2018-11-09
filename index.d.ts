declare const b32c: ReadonlyArray<number>;
declare const xb: ReadonlyArray<number>;
interface call_b32_buf {
    (b32: ArrayBufferView): Uint8Array;
    (b32: string): Uint8Array;
    (b32: string, overwrite: false): Uint8Array;
}
declare const b32_buf: call_b32_buf;
declare const b256: ReadonlyArray<number>;
interface call_buf_b32 {
    (bv: ArrayBufferView): Uint8Array;
    (bv: ArrayBufferView, useString: false): Uint8Array;
    (bv: ArrayBufferView, useString: true): string;
}
declare const buf_b32: call_buf_b32;
export { b32_buf, buf_b32, b32_buf as decode, buf_b32 as encode, b32c, b256, xb, };
//# sourceMappingURL=b32.d.ts.map