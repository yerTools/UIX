namespace UIX.Libraries.Cryptography.Bitwise.Unsigned{
    const BUFFER = new Uint32Array(2);

    export function leftShift(x:number, y:number){
        BUFFER[0] = x;
        BUFFER[1] = y;
        BUFFER[0] <<= BUFFER[1];
        return BUFFER[0];
    }

    export function rightShift(x:number, y:number){
        BUFFER[0] = x;
        BUFFER[1] = y;
        BUFFER[0] >>>= BUFFER[1];
        return BUFFER[0];
    }

    export function and(x:number, y:number){
        BUFFER[0] = x;
        BUFFER[1] = y;
        BUFFER[0] &= BUFFER[1];
        return BUFFER[0];
    }

    export function or(x:number, y:number){
        BUFFER[0] = x;
        BUFFER[1] = y;
        BUFFER[0] |= BUFFER[1];
        return BUFFER[0];
    }

    export function xor(x:number, y:number){
        BUFFER[0] = x;
        BUFFER[1] = y;
        BUFFER[0] ^= BUFFER[1];
        return BUFFER[0];
    }

    export function not(x:number){
        BUFFER[0] = x;
        BUFFER[0] = ~BUFFER[0];
        return BUFFER[0];
    }
}