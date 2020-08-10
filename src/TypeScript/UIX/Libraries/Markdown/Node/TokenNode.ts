/// <reference path="Node.ts" />
/// <reference path="../Tokenizer/Token.ts" />
/// <reference path="../../../Core/Tools/EscapeTextForHTML.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class TokenNode extends Node{
        public static isTokenNode(node:Node):node is TokenNode{
            return node.isToken;
        }

        public get isToken(){ return true; };
       
        public readonly token:Tokenizer.Token;

        public constructor(token:Tokenizer.Token){
            super();
            this.token = token;
        }

        public getHTML(){
            if(this.token.type === Tokenizer.TokenType.Whitespace || this.token.type === Tokenizer.TokenType.EndOfLine){
                return " ";
            }
            if(this.token.value){
                return Core.Tools.escapeTextForHTML(this.token.value);
            }
            return "";
        }

        public getText(){
            if(this.token.type === Tokenizer.TokenType.Whitespace){
                return " ";
            }
            return this.token.value;
        }

        public isEmptyOrWhitespace(){
            return !(this.token.value && this.token.value.trimStart() !== "");
        }
    }
}