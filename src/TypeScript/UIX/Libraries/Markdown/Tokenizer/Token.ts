/// <reference path="TokenType.ts" />

namespace UIX.Libraries.Markdown.Tokenizer{
    export class Token{
        public static createEndOfMarkdown(index:number){
            return new Token(TokenType.EndOfMarkdown, "", index);
        }

        public type:TokenType;
        public value:string;
        public index:number;

        public constructor(type:TokenType, value:string, index:number){
            this.type = type;
            this.value = value;
            this.index = index;
        }

        public isSimilar(token:Token){
            if(this.type === TokenType.Whitespace){
                return this.type === token.type;
            }
            return this.type === token.type && this.value === token.value;
        }
    }
}