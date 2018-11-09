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
    const b32c = Object.freeze({
        '50': 26,
        '51': 27,
        '52': 28,
        '53': 29,
        '54': 30,
        '55': 31,
        '65': 0,
        '66': 1,
        '67': 2,
        '68': 3,
        '69': 4,
        '70': 5,
        '71': 6,
        '72': 7,
        '73': 8,
        '74': 9,
        '75': 10,
        '76': 11,
        '77': 12,
        '78': 13,
        '79': 14,
        '80': 15,
        '81': 16,
        '82': 17,
        '83': 18,
        '84': 19,
        '85': 20,
        '86': 21,
        '87': 22,
        '88': 23,
        '89': 24,
        '90': 25,
        '97': 0,
        '98': 1,
        '99': 2,
        '100': 3,
        '101': 4,
        '102': 5,
        '103': 6,
        '104': 7,
        '105': 8,
        '106': 9,
        '107': 10,
        '108': 11,
        '109': 12,
        '110': 13,
        '111': 14,
        '112': 15,
        '113': 16,
        '114': 17,
        '115': 18,
        '116': 19,
        '117': 20,
        '118': 21,
        '119': 22,
        '120': 23,
        '121': 24,
        '122': 25
    });
    exports.b32c = b32c;
    const xb = Object.freeze([0, 4, NaN, 3, 2, NaN, 1, NaN]);
    exports.xb = xb;
    const v = new Uint8Array(8);
    const getB32S = (s, n) => s.codePointAt(n) || 0;
    const getB32B = (b, n) => b[n] || 0;
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
            : B32.length, cnt = len & -8, rem = len - cnt, bLen = 5 * (len >>> 3) + xb[B32.length - len], buf = (overwrite && 'string' !== typeof b32
            ? new Uint8Array(b32.buffer, b32.byteOffset, bLen)
            : new Uint8Array(bLen)), getB32 = ('string' === typeof B32 ? getB32S : getB32B).bind(null, B32);
        let i = 0, idx = 0;
        while (i < cnt) {
            v[0] = (b32c[getB32(i++)]);
            v[1] = (b32c[getB32(i++)]);
            v[2] = (b32c[getB32(i++)]);
            v[3] = (b32c[getB32(i++)]);
            v[4] = (b32c[getB32(i++)]);
            v[5] = (b32c[getB32(i++)]);
            v[6] = (b32c[getB32(i++)]);
            v[7] = (b32c[getB32(i++)]);
            buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255;
            buf[idx++] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255;
            buf[idx++] = (v[3] << 4 | v[4] >>> 1) & 255;
            buf[idx++] = (v[4] << 7 | v[5] << 2 | v[6] >>> 3) & 255;
            buf[idx++] = (v[6] << 5 | v[7]) & 255;
        }
        switch (rem) {
            case 2:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i)];
                buf[idx] = (v[0] << 3 | v[1] >>> 2) & 255;
                break;
            case 4:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i++)];
                v[2] = b32c[getB32(i++)];
                v[3] = b32c[getB32(i)];
                buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255;
                buf[idx] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255;
                break;
            case 5:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i++)];
                v[2] = b32c[getB32(i++)];
                v[3] = b32c[getB32(i++)];
                v[4] = b32c[getB32(i)];
                buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255;
                buf[idx++] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255;
                buf[idx] = (v[3] << 4 | v[4] >>> 1) & 255;
                break;
            case 7:
                v[0] = b32c[getB32(i++)];
                v[1] = b32c[getB32(i++)];
                v[2] = b32c[getB32(i++)];
                v[3] = b32c[getB32(i++)];
                v[4] = b32c[getB32(i++)];
                v[5] = b32c[getB32(i++)];
                v[6] = b32c[getB32(i)];
                buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255;
                buf[idx++] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255;
                buf[idx++] = (v[3] << 4 | v[4] >>> 1) & 255;
                buf[idx] = (v[4] << 7 | v[5] << 2 | v[6] >>> 3) & 255;
                break;
        }
        return buf;
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
    const b32_toString = Reflect.apply.bind(null, String.fromCharCode, null);
    const buf_b32 = (bv, useString = false) => {
        const buf = new Uint8Array(bv.buffer, bv.byteOffset, bv.byteLength), len = buf.length, cnt = Math.floor(len / 5) * 5, rem = len - cnt, bLen = 8 * Math.ceil(buf.length / 5), b32 = new Uint8Array(bLen);
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
        if (useString)
            return b32_toString(b32);
        else
            return b32;
    };
    exports.buf_b32 = buf_b32;
    exports.encode = buf_b32;
});
//# sourceMappingURL=b32.js.map