namespace UIX.Libraries.Cryptography.RNG{
    const MULTIPLIER = 1664525;
    const INCREMENT = 1013904223;

    export class LinearCongruentialGenerator{
        private seed = new Uint32Array(2);

        public constructor(seed?:number){
            if(seed === undefined){
                seed = new Date().getTime() * 673;
            }
            this.seed[0] = seed;
        }

        public next(){
            this.seed[1] = MULTIPLIER * this.seed[0];
            this.seed[0] = this.seed[1] + INCREMENT;
            return this.seed[0];
        }

        public nextDouble(){
            return this.next()/0x100000000;
        }

    }
}