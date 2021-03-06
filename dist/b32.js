(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define('b32', ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const b32c = Object.freeze([
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, 26, 27, 28, 29, 30, 31,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, -1, -1, -1, -1, -1
    ]);
    exports.b32c = b32c;
    const xb = Object.freeze([0, 4, NaN, 3, 2, NaN, 1, NaN]);
    exports.xb = xb;
    const v = new Uint8Array(8);
    const _v = new Uint32Array(v.buffer, v.byteOffset, 2);
    const getB32S = (s, n) => s.codePointAt(n) || 0;
    const getB32B = (b, n) => b[n] || 0;
    const { floor, ceil } = Math;
    const b32_buf = (b32, overwrite = false) => {
        if (overwrite && 'object' !== typeof b32 && !ArrayBuffer.isView(b32))
            throw new TypeError(`b32_buf option 'overwrite' cannot be used when b32 is not an ArrayBufferView`);
        const B32 = ('string' === typeof b32
            ? b32
            : new Uint8Array(b32.buffer, b32.byteOffset, b32.byteLength)), len = (ArrayBuffer.isView(B32)
            ? B32.lastIndexOf(0x3D, B32.length - 1) > -1
            : B32.lastIndexOf('=', B32.length - 1) > -1) ? ArrayBuffer.isView(B32)
            ? B32.indexOf(0x3D, 0)
            : B32.indexOf('=', 0)
            : B32.length, cnt = (len & -8) >>> 0, rem = len - cnt, bLen = 5 * (len >>> 3) + xb[B32.length - len], buf = (overwrite && 'string' !== typeof b32
            ? new Uint8Array(b32.buffer, b32.byteOffset, bLen)
            : new Uint8Array(bLen)), getB32 = ('string' === typeof B32 ? getB32S : getB32B).bind(null, B32);
        let i = 0, idx = 0;
        while (i < cnt) {
            v[0] = b32c[getB32(i++)];
            v[1] = b32c[getB32(i++)];
            v[2] = b32c[getB32(i++)];
            v[3] = b32c[getB32(i++)];
            v[4] = b32c[getB32(i++)];
            v[5] = b32c[getB32(i++)];
            v[6] = b32c[getB32(i++)];
            v[7] = b32c[getB32(i++)];
            buf[idx++] = v[0] << 3 | v[1] >>> 2;
            buf[idx++] = v[1] << 6 | v[2] << 1 | v[3] >>> 4;
            buf[idx++] = v[3] << 4 | v[4] >>> 1;
            buf[idx++] = v[4] << 7 | v[5] << 2 | v[6] >>> 3;
            buf[idx++] = v[6] << 5 | v[7];
        }
        switch (rem) {
            case 2:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i)];
                buf[idx] = v[0] << 3 | v[1] >>> 2;
                break;
            case 4:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i++)];
                v[2] = b32c[getB32(i++)];
                v[3] = b32c[getB32(i)];
                buf[idx++] = v[0] << 3 | v[1] >>> 2;
                buf[idx] = v[1] << 6 | v[2] << 1 | v[3] >>> 4;
                break;
            case 5:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i++)];
                v[2] = b32c[getB32(i++)];
                v[3] = b32c[getB32(i++)];
                v[4] = b32c[getB32(i)];
                buf[idx++] = v[0] << 3 | v[1] >>> 2;
                buf[idx++] = v[1] << 6 | v[2] << 1 | v[3] >>> 4;
                buf[idx] = v[3] << 4 | v[4] >>> 1;
                break;
            case 7:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i++)];
                v[2] = b32c[getB32(i++)];
                v[3] = b32c[getB32(i++)];
                v[4] = b32c[getB32(i++)];
                v[5] = b32c[getB32(i++)];
                v[6] = b32c[getB32(i)];
                buf[idx++] = v[0] << 3 | v[1] >>> 2;
                buf[idx++] = v[1] << 6 | v[2] << 1 | v[3] >>> 4;
                buf[idx++] = v[3] << 4 | v[4] >>> 1;
                buf[idx] = v[4] << 7 | v[5] << 2 | v[6] >>> 3;
                break;
        }
        try {
            return buf;
        }
        finally {
            _v[0] = 0;
            _v[1] = 0;
        }
    };
    exports.b32_buf = b32_buf;
    exports.decode = b32_buf;
    const b256 = Object.freeze([
        65, 66, 67, 68, 69, 70, 71, 72,
        73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88,
        89, 90, 50, 51, 52, 53, 54, 55
    ]);
    exports.b256 = b256;
    const _toString = Reflect.apply.bind(null, String.fromCharCode, null);
    const buf_b32 = (bv, useString = false) => {
        const buf = new Uint8Array(bv.buffer, bv.byteOffset, bv.byteLength), len = buf.byteLength, cnt = floor(len / 5) * 5, rem = len - cnt, bLen = 8 * ceil(len / 5), b32 = useString ? Array(bLen) : new Uint8Array(bLen);
        let i = 0, idx = 0;
        while (i < cnt) {
            v[0] = buf[i++];
            v[1] = buf[i++];
            v[2] = buf[i++];
            v[3] = buf[i++];
            v[4] = buf[i++];
            b32[idx++] = b256[v[0] >>> 3];
            b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31];
            b32[idx++] = b256[(v[1] >>> 1) & 31];
            b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31];
            b32[idx++] = b256[(v[2] << 1 | v[3] >>> 7) & 31];
            b32[idx++] = b256[(v[3] >>> 2) & 31];
            b32[idx++] = b256[(v[3] << 3 | v[4] >>> 5) & 31];
            b32[idx++] = b256[v[4] & 31];
        }
        switch (rem) {
            case 1:
                v[0] = buf[i];
                b32[idx++] = b256[v[0] >>> 3];
                b32[idx++] = b256[(v[0] << 2) & 31];
                b32[idx++] = 0x3D;
                b32[idx++] = 0x3D;
                b32[idx++] = 0x3D;
                b32[idx++] = 0x3D;
                b32[idx++] = 0x3D;
                b32[idx] = 0x3D;
                break;
            case 2:
                v[0] = buf[i++];
                v[1] = buf[i];
                b32[idx++] = b256[v[0] >>> 3];
                b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31];
                b32[idx++] = b256[(v[1] >>> 1) & 31];
                b32[idx++] = b256[(v[1] << 4) & 31];
                b32[idx++] = 0x3D;
                b32[idx++] = 0x3D;
                b32[idx++] = 0x3D;
                b32[idx] = 0x3D;
                break;
            case 3:
                v[0] = buf[i++];
                v[1] = buf[i++];
                v[2] = buf[i];
                b32[idx++] = b256[v[0] >>> 3];
                b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31];
                b32[idx++] = b256[(v[1] >>> 1) & 31];
                b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31];
                b32[idx++] = b256[(v[2] << 1) & 31];
                b32[idx++] = 0x3D;
                b32[idx++] = 0x3D;
                b32[idx] = 0x3D;
                break;
            case 4:
                v[0] = buf[i++];
                v[1] = buf[i++];
                v[2] = buf[i++];
                v[3] = buf[i];
                b32[idx++] = b256[v[0] >>> 3];
                b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31];
                b32[idx++] = b256[(v[1] >>> 1) & 31];
                b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31];
                b32[idx++] = b256[(v[2] << 1 | v[3] >>> 7) & 31];
                b32[idx++] = b256[(v[3] >>> 2) & 31];
                b32[idx++] = b256[(v[3] << 3) & 31];
                b32[idx] = 0x3D;
                break;
        }
        _v[0] = 0;
        _v[1] = 0;
        return b32 instanceof Uint8Array
            ? b32
            : _toString(b32);
    };
    exports.buf_b32 = buf_b32;
    exports.encode = buf_b32;
});
//# sourceMappingURL=b32.js.map