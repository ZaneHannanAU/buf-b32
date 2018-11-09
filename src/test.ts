import { randomBytes, timingSafeEqual, createHash } from 'crypto'
import { encode, decode } from './b32'

function test(buf: Uint8Array | Buffer | string) {
	const s = 'string' === typeof buf
		? buf
		: String.fromCodePoint(...buf)
	console.log('%s %j', s.length.toString().padStart(5), s)
}
const init = process.hrtime()
function rt(diff: number[] = process.hrtime(init)) {
	const tm = (diff[0] + diff[1] / 1_000_000_000)
	console.log('%sms elapsed', tm.toFixed(9).padStart(12))
}
const okey: Uint8Array[] = []
for (let i = 0; i < 35; i++) {
	let j = i + 1
	const buf = new Uint8Array(j)
	while (j--) buf[j] = 0x41 | (j & 1) << 5
	okey.push(buf)
}
const okay = okey.map(buf => encode(buf))
const otey = okay.map(buf => decode(buf))
for (let i = 0; i < okey.length; i++)
	for (const bin of [okey[i], okay[i], otey[i]])
		test(bin)

const buf = Buffer.from('This is a test buffer.')
rt()
test(buf)

const b32 = encode(buf)
rt()
test(b32)

const b32Decoded = decode(b32),
	back = Buffer.from(b32Decoded.buffer as ArrayBuffer, b32Decoded.byteOffset, b32Decoded.byteLength)
rt()
test(back)

console.assert(timingSafeEqual(buf, back), 'buf !== back')

rt()
test(Buffer.from('Starting random bytes (shown as hex)'))
const rndbuf = randomBytes(16)
rt()
test(rndbuf.toString('hex'))

const rndb32 = encode(rndbuf)
rt()
test(rndb32)

const rndb32Decoded = decode(rndb32),
	rndback = Buffer.from(rndb32Decoded.buffer as ArrayBuffer, rndb32Decoded.byteOffset, rndb32Decoded.byteLength)

rt()
test(rndback.toString('hex'))

console.assert(timingSafeEqual(rndbuf, rndback), 'rndbuf !== rndback')

rt()
test(Buffer.from('Testing 20-byte hash sum'))
const hash = createHash('sha1').update('Hello world!').digest()
rt()
test(hash.toString('hex'))

const hashb32 = encode(hash, true)
rt()
test(hashb32)

const hash32d = decode(hashb32),
	hashback = Buffer.from(hash32d.buffer as ArrayBuffer, hash32d.byteOffset, hash32d.byteLength)
rt()
test(hashback.toString('hex'))
