const crypto = require('crypto');
const {buf_b32, b32_buf} = require('./b32');

const test = b => console.log(
	'%s %j',
	b.length.toString().padStart(5),
	b.toString()
);

const it = process.hrtime();
const rt = ([s, ns] = process.hrtime(it)) => console.log(
	'%ss elapsed',
	(s+ns/1e9).toFixed(9).padStart(12)
);





const okey = Array.from(
	{ length: 35 },
	(_,i) => Buffer.allocUnsafe(i+1).fill('aA')
);

const okay = okey.map(b => buf_b32(b))
const otey = okay.map(b => b32_buf(b))
for (let i = 0; i < okey.length; i++)
	for (const bin of [okey[i],okay[i],otey[i]])
		test(bin)


const buf = Buffer.from('This is a test buffer.')
rt()
test(buf)

const b32 = buf_b32(buf)
rt()
test(b32)

const back = b32_buf(b32)
rt()
test(back)
console.assert(buf.equals(back))


rt()
const hexstr = Buffer.from('Starting random bytes (show as hex)')
test(buf_b32(hexstr))
test(hexstr)
const rndbuf = crypto.randomBytes(16)
rt()
test(rndbuf.toString('hex'))

const rndb32 = buf_b32(rndbuf)
rt()
test(rndb32)

const rndback = b32_buf(rndb32)
rt()
test(rndback.toString('hex'))

console.assert(rndbuf.equals(rndback))

