"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const b32_1 = require("./b32");
function padStart(s, n = 0, c = ' ') {
    while (s.length < n)
        s = c + s;
    return s;
}
function test(buf) {
    const s = 'string' === typeof buf
        ? buf
        : String.fromCodePoint(...buf);
    console.log('%s %j', padStart(s.length.toString(), 5), s.toString());
}
const init = process.hrtime();
function rt(diff = process.hrtime(init)) {
    const tm = (diff[0] + diff[1] / 1000000000);
    console.log('%sms elapsed', padStart(tm.toFixed(9), 12));
}
const okey = [];
for (let i = 0; i < 35; i++) {
    const buf = new Uint8Array(i + 1);
    for (let j = 0; j < buf.length; j++)
        buf[j] = j & 1 ? 0x41 : 0x61;
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
//# sourceMappingURL=test.js.map