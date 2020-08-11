namespace UIX.Libraries.TextExpression.Text{
    export class TextSpan{
        public static fromString(text:string){
            let data = new Uint16Array(text.length);
            for(let i = 0; i < text.length; i++){
                data[i] = text.charCodeAt(i);
            }
            return new TextSpan(data);
        }

        private readonly data:Uint16Array;
        public readonly length:number;

        private constructor(data:Uint16Array){
            this.data = data;
            this.length = data.length;
        }

        public substring(start:number, end?:number){
            return new TextSpan(this.data.subarray(start, end));
        }

        public equalsString(text:string){
            if(this.length !== text.length){
                return false;
            }
            for(let i = 0; i < this.length; i++){
                if(this.data[i] !== text.charCodeAt(i)){
                    return false;
                }
            }
            return true;
        }

        public equals(text:TextSpan){
            if(this.length !== text.length){
                return false;
            }
            for(let i = 0; i < this.length; i++){
                if(this.data[i] !== text.data[i]){
                    return false;
                }
            }
            return true;
        }

        public startsWith(text:TextSpan){
            if(this.length < text.length){
                return false;
            }
            for(let i = 0; i !== text.length; ++i){
                if(this.data[i] !== text.data[i]){
                    return false;
                }
            }
            return true;
        }
    
        public endsWith(text:TextSpan){
            if(this.length < text.length){
                return false;
            }
            for(let x = text.length - 1, y = this.length - text.length; x >= 0; --x){
                if(this.data[y + x] !== text.data[x]){
                    return false;
                }
            }
            return true;
        }
        
        public indexOf(text:TextSpan, startIndex:number){
            if(this.length < text.length + startIndex){
                return null;
            }
            if(text.length === 0){
                return startIndex;
            }
            for(let valid = true, end = this.length - text.length + 1; startIndex !== end; ++startIndex){
                if(this.data[startIndex] === text.data[0]){
                    valid = true;
                    for(let i = 1; i !== text.length; ++i){
                        if(this.data[startIndex + i] !== text.data[i]){
                            valid = false;
                            break;
                        }
                    }
                    if(valid){
                        return startIndex;
                    }
                }
                
            }
            return null;
        }

        public toString(){
            let result = "";
            for(let i = 0; i < this.length; i++){
                result += String.fromCharCode(this.data[i]);
            }
            return result;
        }
    }
}