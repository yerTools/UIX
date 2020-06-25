/// <reference path="TokenType.ts" />

namespace UIX.Libraries.Markdown.Tokenizer{
    export class Token{


        public static createEndOfMarkdown(index:number){
            return new Token(TokenType.EndOfMarkdown, "", index, 1);
        }

        public type:TokenType;
        public value:string;
        public index:number;
        public count:number;

        public constructor(type:TokenType, value:string, index:number, count:number){
            this.type = type;
            this.value = value;
            this.index = index;
            this.count = count;
        }

        public getText(){
            if(this.count === 0){
                return "";
            }else if(this.count === 1){
                return this.value;
            }
            let text = "";
            while(this.count--){
                text += this.value;
            }
            return text;
        }
    }
}