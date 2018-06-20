# buf-b32

Converts a buffer holding binary to base32 (`buf_b32` or `encode`); and converts a buffer or base32 string into a buffer (`b32_buf` or `decode`).

Uses loads of bitwise notation. Have fun?

# 2.0.0 update

only returns `Uint8Array`s now.

converting a `Uint8Array` to a `Buffer`: `Buffer.from(u.buffer, u.byteOffset, u.byteLength)`.

All internal values use Uint8Array now.

## Docs

### encode(buffer[, useString])

* buffer: `ArrayBufferView` (`Buffer`, `Uint8Array`, `Uint32Array`, `DataView` etc)
* useString: `boolean`
* Returns: `string` | `Uint8Array`

When `useString` is `true`, returns `string`; else returns `Uint8Array`.

### decode(buffer[, overwrite])

* buffer: `ArrayBufferView` (`Buffer`, `Uint8Array`, `Uint32Array`, `DataView` etc)
* overwrite: `boolean`
* Returns: `Uint8Array`

```javascript
import { b32_buf, buf_b32, encode, decode } from 'buf-b32'

console.assert(b32_buf === decode, 'decode maps to b32_buf')
console.assert(buf_b32 === encode, 'encode maps to buf_b32')

console.assert(
	encode(new Uint32Array(32)) instanceof Uint8Array,
	'encode returns Uint8Array ArrayBufferViews.'
)
console.assert(
	'string' === typeof encode(new Uint32Array(32), true),
	'encode returns string when useString is enabled.'
)
console.assert(
	decode(new Uint32Array(32)) instanceof Uint8Array,
	'decode returns Uint8Array ArrayBufferView.'
)
let buf = Int32Array.of(0x41414141, 0x41414141)
console.assert(
	decode(buf, true).buffer === buf.buffer,
	'enabling overwrite writes over the same point in memory rather than allocating new blocks.'
)
```
