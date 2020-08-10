/// <reference path="../Bitwise/Unsigned.ts" />
/// <reference path="../Text/StringToUTF8.ts" />

namespace UIX.Libraries.Cryptography.Hash{
    const K = [
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
        0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
        0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
        0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
        0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
        0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
        0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
        0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
        0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
        0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
        0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
        0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
        0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
        0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
        0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
        0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ];

    const S = [
        7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
        5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
        4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
        6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21
    ];

    const B = Bitwise.Unsigned;

    export class MD5{
        private readonly _messageLength = new Uint32Array(2);
        private readonly _block = new Uint8Array(64);
        private readonly _buffer = new Uint32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);

        private _blockLength = 0;
        private _hash?:string;

        public appendText(text:string){
            this.appendBytes(Text.stringToUTF8(text));
        }

        public appendArrayBuffer(arrayBuffer:ArrayBuffer){
            this.appendBytes(new Uint8Array(arrayBuffer));
        }

        public appendBytes(bytes:ArrayLike<number>|Uint8Array){
            for(let i = 0; i < bytes.length; i++){
                this.appendByte(bytes[i]);
            }
        }

        public appendByte(byte:number){
            this._messageLength[0] += 8;
            if(!this._messageLength[0]){
                ++this._messageLength[1];
            }
            this.appendWithoutCounting(byte);
        }

        public computeHash(){
            if(!this._hash){
                let padding = (this._blockLength > 56 ? 120 : 56) - this._blockLength;
                for(let i = 0; i < padding; i++){
                    this.appendWithoutCounting(i === 0 ? 0x80 : 0);
                }
                let messageLength = new Uint8Array(this._messageLength.buffer);
                for(let x = 0; x !== 8; x++){
                    this.appendWithoutCounting(messageLength[x]);
                }

                let hash = new Uint8Array(this._buffer.buffer);
                this._hash = "";
                for(let i = 0; i < hash.length; i++){
                    this._hash += hash[i] < 0x10 ? "0" + hash[i].toString(16) : hash[i].toString(16);
                }
            }
            return this._hash;
        }

        private appendWithoutCounting(byte:number){
            this._block[this._blockLength++] = byte;
            if(this._blockLength === this._block.length){
                let words = new Uint32Array(this._block.buffer);
                let buffer = new Uint32Array([this._buffer[0], this._buffer[1], this._buffer[2], this._buffer[3], 0, 0, 0]);

                for(let i = 0; i < 64; i++){
                    if(i < 16){
                        buffer[4] = B.or(B.and(buffer[1], buffer[2]), B.and(B.not(buffer[1]), buffer[3]));
                        buffer[5] = i;
                    }else if(i < 32){
                        buffer[4] = B.or(B.and(buffer[3], buffer[1]), B.and(B.not(buffer[3]), buffer[2]));
                        buffer[5] = (5 * i + 1) % 16;
                    }else if(i < 48){
                        buffer[4] = B.xor(buffer[1], B.xor(buffer[2], buffer[3]));
                        buffer[5] = (3 * i + 5) % 16;
                    }else{
                        buffer[4] = B.xor(buffer[2], B.or(buffer[1], B.not(buffer[3])));
                        buffer[5] = (7 * i) % 16;
                    }

                    buffer[4] += buffer[0] + K[i] + words[buffer[5]];
                    buffer[6] = buffer[3];
                    buffer[3] = buffer[2];
                    buffer[2] = buffer[1];
                    buffer[1] += B.or(B.leftShift(buffer[4], S[i]), B.rightShift(buffer[4], 32 - S[i]));
                    buffer[0] = buffer[6];
                }
                this._buffer[0] += buffer[0];
                this._buffer[1] += buffer[1];
                this._buffer[2] += buffer[2];
                this._buffer[3] += buffer[3];
                this._blockLength = 0;
            }
        }
    }
}