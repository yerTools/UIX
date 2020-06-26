/// <reference path="TokenType.ts" />

namespace UIX.Script.Parser.Token{
    export class Token{
        public static createEndOfInput(index:number){
            return new Token(TokenType.EndOfInput, null, "", index);
        }

        public static createUnknown(rawValue:string, index:number){
            return new Token(TokenType.Unknown, null, rawValue, index);
        }

        public type:TokenType;
        public value:null|any;
        public rawValue:string;
        public index:number;

        public constructor(type:TokenType, value:any, rawValue:string, index:number){
            this.type = type;
            this.value = value;
            this.rawValue = rawValue;
            this.index = index;
        }

        public toString(includeIndex = true){
            let result = TokenType[this.type];

            if(this.value !== null && this.value !== undefined){
                result += ": " + this.value.toString();
            }else{
                result += ": '" + this.rawValue + "'";
            }

            if(includeIndex){
                result += " @" + this.index
            }

            return result;
        }
    }
}