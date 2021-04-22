namespace UIX.Libraries.Random{
    export class XorShift128{
        private static hash(a:number, b:number){
            let result = 991;

            for(let i = 0; i < 8; i++){
                a = (a * 353 + 3229) | 0;
                b = (b * 277 + 3559) | 0;
            
                result = (result * 59 + a) | 0;
                result = (result * 67 + b) | 0;
            }

            return result;
        }

        private state = new Uint32Array(5);

        constructor(seed?:number|Uint32Array|XorShift128|Date){
            this.reseed(seed);
        }

        public reseed(seed?:number|Uint32Array|XorShift128|Date){
            if(seed){
                if(typeof seed === "number"){
                    seed = Math.round(seed);

                    this.state[0] = seed;
                    this.state[1] = (seed - this.state[0]) / 0xffffffff;
                    this.state[2] = XorShift128.hash(this.state[0], this.state[1]);
                    this.state[3] = XorShift128.hash(this.state[1], this.state[0]);
                    
                    this.next();
                }else if(seed instanceof XorShift128){
                    for(let i = 0; i < 4; i++){
                        this.state[i] = seed.state[i];
                    }
                }else if(seed instanceof Date){
                    this.reseed(seed.getTime());
                    return;
                }else{
                    for(let i = 0; i < seed.length && i < 4; i++){
                        this.state[i] = seed[i];
                    }
                }
            }

            let seedValid = false;
            for(let i = 0; i < 4; i++){
                if(this.state[i]){
                    seedValid = true;
                    break;
                }
            }

            if(!seedValid){
                this.reseed(new Date().getTime());
            }
        }

        public clone(){
            return new XorShift128(this);
        }

        public next(){
            this.state[4] = this.state[3];

            this.state[3] = this.state[2];
            this.state[2] = this.state[1];
            this.state[1] = this.state[0];
            
            this.state[4] ^= this.state[4] << 11;
            this.state[4] ^= this.state[4] >>> 8;

            this.state[0] = this.state[4] ^ this.state[0] ^ (this.state[0] >>> 19);
            return this.state[0];
        }

        public nextUntil(max:number){
            return this.next() % (max <= 0 ? 1 : max);
        }

        public nextDouble(){
            return this.next() / 0x100000000;
        }

        public nextBetween(min:number, max:number){
            if(min > max){
                const _ = min;
                min = max;
                max = _;
            }
            return min + this.next() % (max === min ? 1 : max - min);
        }

        public seed(){
            const result = new Uint32Array(4);

            for(let i = 0; i < 4; i++){
                result[i] = this.state[i];
            }

            return result;
        }
    }
}