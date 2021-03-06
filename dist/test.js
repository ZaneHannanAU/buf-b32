(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define('test', ["require", "exports", "crypto", "./b32"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const crypto_1 = require("crypto");
    const b32_1 = require("./b32");
    function test(buf) {
        const s = 'string' === typeof buf
            ? buf
            : String.fromCodePoint(...buf);
        console.log('%s %j', s.length.toString().padStart(5), s);
    }
    const init = process.hrtime();
    function rt(diff = process.hrtime(init)) {
        const tm = (diff[0] + diff[1] / 1000000000);
        console.log('%sms elapsed', tm.toFixed(9).padStart(12));
    }
    const okey = [];
    for (let i = 0; i < 35; i++) {
        let j = i + 1;
        const buf = new Uint8Array(j);
        while (j--)
            buf[j] = 0x41 | (j & 1) << 5;
        okey.push(buf);
    }
    const okay = okey.map(buf => b32_1.encode(buf));
    const otey = okay.map(buf => b32_1.decode(buf));
    for (let i = 0; i < okey.length; i++)
        for (const bin of [okey[i], okay[i], otey[i]])
            test(bin);
    const buf = Buffer.from('This is a test buffer.');
    rt();
    test(buf);
    const b32 = b32_1.encode(buf);
    rt();
    test(b32);
    const b32Decoded = b32_1.decode(b32), back = Buffer.from(b32Decoded.buffer, b32Decoded.byteOffset, b32Decoded.byteLength);
    rt();
    test(back);
    console.assert(crypto_1.timingSafeEqual(buf, back), 'buf !== back');
    rt();
    test(Buffer.from('Starting random bytes (shown as hex)'));
    const rndbuf = crypto_1.randomBytes(16);
    rt();
    test(rndbuf.toString('hex'));
    const rndb32 = b32_1.encode(rndbuf);
    rt();
    test(rndb32);
    const rndb32Decoded = b32_1.decode(rndb32), rndback = Buffer.from(rndb32Decoded.buffer, rndb32Decoded.byteOffset, rndb32Decoded.byteLength);
    rt();
    test(rndback.toString('hex'));
    console.assert(crypto_1.timingSafeEqual(rndbuf, rndback), 'rndbuf !== rndback');
    rt();
    test(Buffer.from('Testing 20-byte hash sum'));
    const hash = crypto_1.createHash('sha1').update('Hello world!').digest();
    rt();
    test(hash.toString('hex'));
    const hashb32 = b32_1.encode(hash, true);
    rt();
    test(hashb32);
    const hash32d = b32_1.decode(hashb32), hashback = Buffer.from(hash32d.buffer, hash32d.byteOffset, hash32d.byteLength);
    rt();
    test(hashback.toString('hex'));
});
//# sourceMappingURL=test.js.map