
/**
 * @enum b32c {number}
 * maps code points to numbers
 */
const b32c: ReadonlyArray<number> = Object.freeze([
	-1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, 26, 27, 28, 29, 30, 31,
	-1, -1, -1, -1, -1, -1, -1, -1,
	-1,  0,  1,  2,  3,  4,  5,  6,
	7,   8,  9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, -1, -1, -1, -1, -1,
	-1,  0,  1,  2,  3,  4,  5,  6,
	7,   8,  9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, -1, -1, -1, -1, -1
])

// buffered for      0  1    2  3  4    5  6    7
const xb:ReadonlyArray<number> = Object.freeze([0, 4, NaN, 3, 2, NaN, 1, NaN])

const v = new Uint8Array(8)
const _v = new Uint32Array(v.buffer, v.byteOffset, 2)

interface call_b32_buf {
	(b32: ArrayBufferView, overwrite?: boolean): Uint8Array;
	(b32: string, overwrite?: false): Uint8Array;
}
const getB32S = (s: string, n: number) => s.codePointAt(n) || 0
const getB32B = (b: Uint8Array, n: number) => b[n] || 0
const {floor, ceil} = Math
const b32_buf: call_b32_buf = (
	b32: ArrayBufferView | string,
	overwrite = false
): Uint8Array => {
	if (overwrite && 'object' !== typeof b32 && !ArrayBuffer.isView(b32))
		throw new TypeError(`b32_buf option 'overwrite' cannot be used when b32 is not an ArrayBufferView`)

	const B32: Uint8Array | string = (
			'string' === typeof b32
			? b32
			: new Uint8Array(b32.buffer, b32.byteOffset, b32.byteLength)
		),
		len = (
			ArrayBuffer.isView(B32)
			? B32.lastIndexOf(0x3D, B32.length - 1) > -1
			: B32.lastIndexOf('=', B32.length - 1) > -1
		) ? ArrayBuffer.isView(B32)
			? B32.indexOf(0x3D, 0)
			: B32.indexOf('=', 0)
		: B32.length,
		cnt = (len & -8) >>> 0,
		rem = len - cnt,
		bLen = 5 * (len >>> 3) + xb[B32.length - len],
		buf = (
			overwrite && 'string' !== typeof b32
			? new Uint8Array(b32.buffer, b32.byteOffset, bLen)
			: new Uint8Array(bLen)
		),
		getB32: ((n: number) => number) = ('string' === typeof B32 ? getB32S : getB32B).bind(null, B32)

	let i = 0, idx = 0

	// 8 chars = 5 bytes
	while (i < cnt) {
		v[0] = b32c[getB32(i++)]
		v[1] = b32c[getB32(i++)]
		v[2] = b32c[getB32(i++)]
		v[3] = b32c[getB32(i++)]
		v[4] = b32c[getB32(i++)]
		v[5] = b32c[getB32(i++)]
		v[6] = b32c[getB32(i++)]
		v[7] = b32c[getB32(i++)]

		buf[idx++] = v[0] << 3 | v[1] >>> 2
		buf[idx++] = v[1] << 6 | v[2] << 1 | v[3] >>> 4
		buf[idx++] = v[3] << 4 | v[4] >>> 1
		buf[idx++] = v[4] << 7 | v[5] << 2 | v[6] >>> 3
		buf[idx++] = v[6] << 5 | v[7]
	}

	switch (rem) {
		case 2:
			v[0] = b32c[getB32(i++)]
			v[1] = b32c[getB32(i)]

			buf[idx] = v[0] << 3 | v[1] >>> 2

			break
		case 4:
			v[0] = b32c[getB32(i++)]
			v[1] = b32c[getB32(i++)]
			v[2] = b32c[getB32(i++)]
			v[3] = b32c[getB32(i)]

			buf[idx++] = v[0] << 3 | v[1] >>> 2
			buf[idx] = v[1] << 6 | v[2] << 1 | v[3] >>> 4

			break
		case 5:
			v[0] = b32c[getB32(i++)]
			v[1] = b32c[getB32(i++)]
			v[2] = b32c[getB32(i++)]
			v[3] = b32c[getB32(i++)]
			v[4] = b32c[getB32(i)]

			buf[idx++] = v[0] << 3 | v[1] >>> 2
			buf[idx++] = v[1] << 6 | v[2] << 1 | v[3] >>> 4
			buf[idx] = v[3] << 4 | v[4] >>> 1

			break
		case 7:
			v[0] = b32c[getB32(i++)]
			v[1] = b32c[getB32(i++)]
			v[2] = b32c[getB32(i++)]
			v[3] = b32c[getB32(i++)]
			v[4] = b32c[getB32(i++)]
			v[5] = b32c[getB32(i++)]
			v[6] = b32c[getB32(i)]

			buf[idx++] = v[0] << 3 | v[1] >>> 2
			buf[idx++] = v[1] << 6 | v[2] << 1 | v[3] >>> 4
			buf[idx++] = v[3] << 4 | v[4] >>> 1
			buf[idx] = v[4] << 7 | v[5] << 2 | v[6] >>> 3

			break
	}
	try {
		return buf
	} finally {
		_v[0] = 0
		_v[1] = 0
	}
}

// A..Z; 2..7
const b256: ReadonlyArray<number> = Object.freeze([
	65, 66, 67, 68, 69, 70, 71, 72,
	73, 74, 75, 76, 77, 78, 79, 80,
	81, 82, 83, 84, 85, 86, 87, 88,
	89, 90, 50, 51, 52, 53, 54, 55
])
interface _toString {
	(ns: number[]): string;
	(ns: Uint8Array): string;
}
const _toString: _toString = Reflect.apply.bind(null, String.fromCharCode, null)

interface call_buf_b32 {
	(bv: ArrayBufferView): Uint8Array;
	(bv: ArrayBufferView, useString: false): Uint8Array;
	(bv: ArrayBufferView, useString: true): string;
}
const buf_b32: call_buf_b32 = (bv: ArrayBufferView, useString = false): any => {
	const buf = new Uint8Array(bv.buffer, bv.byteOffset, bv.byteLength),
		len = buf.byteLength,
		cnt = floor(len / 5) * 5,
		rem = len - cnt,
		bLen = 8 * ceil(len / 5),
		b32 = useString ? Array(bLen) : new Uint8Array(bLen)
	// use an array if we don't want to collect more garbage

	let i = 0, idx = 0
	// 5 bytes are 8 characters
	while (i < cnt) {
		v[0] = buf[i++]
		v[1] = buf[i++]
		v[2] = buf[i++]
		v[3] = buf[i++]
		v[4] = buf[i++]

		b32[idx++] = b256[v[0] >>> 3]
		b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
		b32[idx++] = b256[(v[1] >>> 1) & 31]
		b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31]
		b32[idx++] = b256[(v[2] << 1 | v[3] >>> 7) & 31]
		b32[idx++] = b256[(v[3] >>> 2) & 31]
		b32[idx++] = b256[(v[3] << 3 | v[4] >>> 5) & 31]
		b32[idx++] = b256[v[4] & 31]
	}

	switch (rem) {
		case 1:
			v[0] = buf[i]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2) & 31]
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx] = 0x3D

			break
		case 2:
			v[0] = buf[i++]
			v[1] = buf[i]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
			b32[idx++] = b256[(v[1] >>> 1) & 31]
			b32[idx++] = b256[(v[1] << 4) & 31]
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx] = 0x3D

			break
		case 3:

			v[0] = buf[i++]
			v[1] = buf[i++]
			v[2] = buf[i]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
			b32[idx++] = b256[(v[1] >>> 1) & 31]
			b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31]
			b32[idx++] = b256[(v[2] << 1) & 31]
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx] = 0x3D

			break
		case 4:
			v[0] = buf[i++]
			v[1] = buf[i++]
			v[2] = buf[i++]
			v[3] = buf[i]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
			b32[idx++] = b256[(v[1] >>> 1) & 31]
			b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31]
			b32[idx++] = b256[(v[2] << 1 | v[3] >>> 7) & 31]
			b32[idx++] = b256[(v[3] >>> 2) & 31]
			b32[idx++] = b256[(v[3] << 3) & 31]
			b32[idx] = 0x3D

			break
	}
	_v[0] = 0
	_v[1] = 0
	return b32 instanceof Uint8Array
		? b32
		: _toString(b32)
}
export {
	b32_buf,
	buf_b32,
	b32_buf as decode,
	buf_b32 as encode,
	b32c,
	b256,
	xb,
}

