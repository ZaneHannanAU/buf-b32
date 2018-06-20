
const {b32c, b256} = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567').reduce((o,c,i)=>{
	o.b32c[c.toLowerCase()] = i; // lowercase
	o.b32c[c.toUpperCase()] = i; // uppercase
	o.b32c[c.codePointAt(0)] = i;// numercase
	o.b256[i] = c.codePointAt(0);// binarcase
	return o;
}, {b32c: {}, b256: Buffer.allocUnsafe(32)})
// console.log(b32c, c32b)

// equals:  0, 1,   2, 3, 4,   5, 6,   7
const xb = [0, 4, NaN, 3, 2, NaN, 1, NaN]

const b32_buf = B32 => {
	let v1, v2, v3, v4, v5, v6, v7, v8,
		len = B32.indexOf('=') !== -1
			? B32.indexOf('=')
			: B32.length,
		cnt = len & -8, // cut last 3 bytes
		rem = len - cnt,
		i = 0,
		idx = 0,
		bLen = 5 * (len >>> 3) + xb[B32.length - len],
		// 5 * floor(len / 8) + xb[count('=')]; basically
		buf = Buffer.allocUnsafe(bLen)
	;;

	// 8 chars are 5 bytes
	while (i < cnt) {
		v1 = b32c[B32[i++]];
		v2 = b32c[B32[i++]];
		v3 = b32c[B32[i++]];
		v4 = b32c[B32[i++]];
		v5 = b32c[B32[i++]];
		v6 = b32c[B32[i++]];
		v7 = b32c[B32[i++]];
		v8 = b32c[B32[i++]];

		buf[idx++] = (v1 << 3 | v2 >>> 2) & 255;
		buf[idx++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
		buf[idx++] = (v4 << 4 | v5 >>> 1) & 255;
		buf[idx++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
		buf[idx++] = (v7 << 5 | v8) & 255;
	};
	switch (rem) {
		case 2:
			v1 = b32c[B32[i++]];
			v2 = b32c[B32[i++]];

			buf[idx++] = (v1 << 3 | v2 >>> 2) & 255;
			break;
		case 4:
			v1 = b32c[B32[i++]];
			v2 = b32c[B32[i++]];
			v3 = b32c[B32[i++]];
			v4 = b32c[B32[i++]];

			buf[idx++] = (v1 << 3 | v2 >>> 2) & 255;
			buf[idx++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
			break;
		case 5:
			v1 = b32c[B32[i++]];
			v2 = b32c[B32[i++]];
			v3 = b32c[B32[i++]];
			v4 = b32c[B32[i++]];
			v5 = b32c[B32[i++]];

			buf[idx++] = (v1 << 3 | v2 >>> 2) & 255;
			buf[idx++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
			buf[idx++] = (v4 << 4 | v5 >>> 1) & 255;
			break;
		case 7:
			v1 = b32c[B32[i++]];
			v2 = b32c[B32[i++]];
			v3 = b32c[B32[i++]];
			v4 = b32c[B32[i++]];
			v5 = b32c[B32[i++]];
			v6 = b32c[B32[i++]];
			v7 = b32c[B32[i++]];

			buf[idx++] = (v1 << 3 | v2 >>> 2) & 255;
			buf[idx++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
			buf[idx++] = (v4 << 4 | v5 >>> 1) & 255;
			buf[idx++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
			break;
	};
	return buf;
};
const buf_b32 = buf => {
	let v1, v2, v3, v4, v5,
		b32 = Buffer.allocUnsafe(8 * Math.ceil(buf.length / 5)),
		// simpler than encoding haha
		i = 0,
		idx = 0,
		len = buf.length,
		cnt = Math.floor(len / 5) * 5,
		rem = len - cnt
	;;

	// 5 bytes are 8 chars
	while (i < cnt) {
		v1 = buf[i++];
		v2 = buf[i++];
		v3 = buf[i++];
		v4 = buf[i++];
		v5 = buf[i++];

		b32.writeInt32BE(
			b256[v1 >>> 3] << 24
			| b256[(v1 << 2 | v2 >>> 6) & 31] << 16
			| b256[(v2 >>> 1) & 31] << 8
			| b256[(v2 << 4 | v3 >>> 4) & 31],
			4 * idx++
		);
		b32.writeInt32BE(
			b256[(v3 << 1 | v4 >>> 7) & 31] << 24
			| b256[(v4 >>> 2) & 31] << 16
			| b256[(v4 << 3 | v5 >>> 5) & 31] << 8
			| b256[v5 & 31],
			4 * idx++
		);
	};

	switch (rem) {
		case 1:
			v1 = buf[i++];

			b32.writeInt32BE(b256[v1 >>> 3] << 24 | b256[(v1 << 2) & 31] << 16 | 0x3d3d, 4 * idx++);
			b32.writeInt32BE(0x3d3d3d3d, 4 * idx++);
			break;
		case 2:
			v1 = buf[i++];
			v2 = buf[i++];

			b32.writeInt32BE(
				b256[v1 >>> 3] << 24
				| b256[(v1 << 2 | v2 >>> 6) & 31] << 16
				| b256[(v2 >>> 1) & 31] << 8
				| b256[(v2 << 4) & 31],
				4 * idx++
			);
			b32.writeInt32BE(0x3d3d3d3d, 4 * idx++);
			break;
		case 3:
			v1 = buf[i++];
			v2 = buf[i++];
			v3 = buf[i++];


			b32.writeInt32BE(
				b256[v1 >>> 3] << 24
				| b256[(v1 << 2 | v2 >>> 6) & 31] << 16
				| b256[(v2 >>> 1) & 31] << 8
				| b256[(v2 << 4 | v3 >>> 4) & 31],
				4 * idx++
			);
			b32.writeInt32BE(
				b256[(v3 << 1) & 31] << 24 | 0x3d3d3d,
				4 * idx++
			);
			break;
		case 4:
			v1 = buf[i++];
			v2 = buf[i++];
			v3 = buf[i++];
			v4 = buf[i++];

			b32.writeInt32BE(
				b256[v1 >>> 3] << 24
				| b256[(v1 << 2 | v2 >>> 6) & 31] << 16
				| b256[(v2 >>> 1) & 31] << 8
				| b256[(v2 << 4 | v3 >>> 4) & 31],
				4 * idx++
			);
			b32.writeInt32BE(
				b256[(v3 << 1 | v4 >>> 7) & 31] << 24
				| b256[(v4 >>> 2) & 31] << 16
				| b256[(v4 << 3) & 31] << 8
				| 0x3d,
				4 * idx++
			);
			break;
	};
	return b32;
};

module.exports = {
	b32_buf,
	buf_b32,
	encode: buf_b32,
	decode: b32_buf,
	constants: {
		get b32c() {return {...b32c};},
		get c32b() {return {...c32b};},
		get xb() {return {...xb};},
	}
};

