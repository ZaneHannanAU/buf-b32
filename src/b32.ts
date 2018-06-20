
/**
 * @enum b32c {number}
 * maps code points to numbers
 */
const b32c:{[key: number]: number} = {
	// 2..7
	'50': 26,
	'51': 27,
	'52': 28,
	'53': 29,
	'54': 30,
	'55': 31,

	// A..Z
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
	
	// a..z
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
	'122': 25,
	'123': 26
}

// buffered for      0  1    2  3  4    5  6    7
const xb:number[] = [0, 4, NaN, 3, 2, NaN, 1, NaN]

function b32_buf(
	b32: ArrayBufferView | string,
	overwrite:boolean = false
):Uint8Array {
	if (overwrite && 'object' !== typeof b32 && !ArrayBuffer.isView(b32))
		throw new TypeError(`b32_buf option 'overwrite' cannot be used when b32 is not an ArrayBufferView`)

	const v = new Uint8Array(8),
		B32:Uint8Array|string = (
			'string' === typeof b32
			? b32
			: new Uint8Array(b32.buffer, b32.byteOffset, b32.byteLength)
		),
		len:number = (
			ArrayBuffer.isView(B32)
			? B32.lastIndexOf(0x3D, B32.length - 1) > -1
			: B32.lastIndexOf('=', B32.length - 1) > -1
		) ? ArrayBuffer.isView(B32)
			? B32.indexOf(0x3D, 0)
			: B32.indexOf('=', 0)
		: B32.length,
		cnt:number = len & -8,
		rem:number = len - cnt,
		bLen:number = 5 * (len >>> 3) + xb[B32.length - len],
		buf:Uint8Array = (
			overwrite && 'string' !== typeof b32
			? new Uint8Array(b32.buffer, b32.byteOffset, b32.byteLength)
			: new Uint8Array(bLen)
		),
		getB32 = 'string' !== typeof B32
			? (n:number):number => B32[n]
			: (n:number):number => Number(B32.codePointAt(n))

	let i = 0, idx = 0, n = 0

	// 8 chars = 5 bytes
	while (i < cnt) {
		v[n++] = <number>(b32c[getB32(i++)])
		v[n++] = <number>(b32c[getB32(i++)])
		v[n++] = <number>(b32c[getB32(i++)])
		v[n++] = <number>(b32c[getB32(i++)])
		v[n++] = <number>(b32c[getB32(i++)])
		v[n++] = <number>(b32c[getB32(i++)])
		v[n++] = <number>(b32c[getB32(i++)])
		v[n++] = <number>(b32c[getB32(i++)])

		buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255
		buf[idx++] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255
		buf[idx++] = (v[3] << 4 | v[4] >>> 1) & 255
		buf[idx++] = (v[4] << 7 | v[5] << 2 | v[6] >>> 3) & 255
		buf[idx++] = (v[6] << 5 | v[7]) & 255

		n = 0
	}
	switch (rem) {
		case 2:
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]

			buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255

			break
		case 4:
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]

			buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255
			buf[idx++] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255

			break
		case 5:
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
                          
			buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255
			buf[idx++] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255
			buf[idx++] = (v[3] << 4 | v[4] >>> 1) & 255

			break
		case 7:
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]
			v[n++] = b32c[getB32(i++)]

			buf[idx++] = (v[0] << 3 | v[1] >>> 2) & 255
			buf[idx++] = (v[1] << 6 | v[2] << 1 | v[3] >>> 4) & 255
			buf[idx++] = (v[3] << 4 | v[4] >>> 1) & 255
			buf[idx++] = (v[4] << 7 | v[5] << 2 | v[6] >>> 3) & 255

			break
	}
	return buf
}

// A..Z; 2..7
const b256:Uint8Array = new Uint8Array([65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,50,51,52,53,54,55])

function buf_b32(
	bv: ArrayBufferView,
	useString:boolean = false
):Uint8Array | string {
	const v:Uint8Array = new Uint8Array(5),
		buf:Uint8Array = new Uint8Array(bv.buffer, bv.byteOffset, bv.byteLength),
		len:number = buf.length,
		cnt:number = Math.floor(len / 5) * 5,
		rem:number = len - cnt,
		bLen:number = 8 * Math.ceil(buf.length / 5),
		b32:Uint8Array = new Uint8Array(bLen)

	let i = 0, idx = 0, n = 0
	// 5 bytes are 8 characters
	while (i < cnt) {
		v[n++] = buf[i++]
		v[n++] = buf[i++]
		v[n++] = buf[i++]
		v[n++] = buf[i++]
		v[n++] = buf[i++]

		b32[idx++] = b256[v[0] >>> 3]
		b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
		b32[idx++] = b256[(v[1] >>> 1) & 31]
		b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31]
		b32[idx++] = b256[(v[2] << 1 | v[3] >>> 7) & 31]
		b32[idx++] = b256[(v[3] >>> 2) & 31]
		b32[idx++] = b256[(v[3] << 3 | v[4] >>> 5) & 31]
		b32[idx++] = b256[v[4] & 31]

		n = 0
	}

	switch (rem) {
		case 1:
			v[n++] = buf[i++]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2) & 31]
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D

			break
		case 2:
			v[n++] = buf[i++]
			v[n++] = buf[i++]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
			b32[idx++] = b256[(v[1] >>> 1) & 31]
			b32[idx++] = b256[(v[1] << 4) & 31]
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D

			break
		case 3:

			v[n++] = buf[i++]
			v[n++] = buf[i++]
			v[n++] = buf[i++]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
			b32[idx++] = b256[(v[1] >>> 1) & 31]
			b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31]
			b32[idx++] = b256[(v[2] << 1) & 31]
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D
			b32[idx++] = 0x3D

			break
		case 4:
			v[n++] = buf[i++]
			v[n++] = buf[i++]
			v[n++] = buf[i++]
			v[n++] = buf[i++]

			b32[idx++] = b256[v[0] >>> 3]
			b32[idx++] = b256[(v[0] << 2 | v[1] >>> 6) & 31]
			b32[idx++] = b256[(v[1] >>> 1) & 31]
			b32[idx++] = b256[(v[1] << 4 | v[2] >>> 4) & 31]
			b32[idx++] = b256[(v[2] << 1 | v[3] >>> 7) & 31]
			b32[idx++] = b256[(v[3] >>> 2) & 31]
			b32[idx++] = b256[(v[3] << 3) & 31]
			b32[idx++] = 0x3D

			break
	}
	if (useString) return String.fromCodePoint(...b32)
	else return b32
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

