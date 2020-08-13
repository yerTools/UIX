namespace UIX.Libraries.Cryptography.Text{
    export function stringToUTF8(text:string){
        let result:number[] = new Array(text.length);
        let resultIndex = 0;
        
        for(let i = 0; i < text.length; i++){
            let value = text.charCodeAt(i);

            if(value < 0x80){
                result[resultIndex++] = value;
            }else if(value < 0x0800){
                result[resultIndex++] = (value >>> 6)        | 0b11000000;
                result[resultIndex++] = (value & 0b00111111) | 0x80;
            }else if((value & 0xFC00) === 0xD800 && i + 1 < text.length && (text.charCodeAt(i + 1) & 0xFC00) === 0xDC00){
                value = 0x010000 + ((value & 0x03FF) << 10) + (text.charCodeAt(++i) & 0x03FF);

                result[resultIndex++] = (value >>> 18)                | 0b11110000;
                result[resultIndex++] = ((value >>> 12) & 0b00111111) | 0x80;
                result[resultIndex++] = ((value >>> 6) & 0b00111111)  | 0x80;
                result[resultIndex++] = (value & 0b00111111)          | 0x80;
            }else{
                result[resultIndex++] = (value >>> 12)               | 0b11100000;
                result[resultIndex++] = ((value >>> 6) & 0b00111111) | 0x80;
                result[resultIndex++] = (value & 0b00111111)         | 0x80;
            }
        }

        return result;
    }
}