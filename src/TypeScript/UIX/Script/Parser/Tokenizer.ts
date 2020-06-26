/// <reference path="Token/Token.ts" />
/// <reference path="Token/ITokenParser.ts" />
/// <reference path="Token/WhitespaceTokenParser.ts" />
/// <reference path="Token/NumberTokenParser.ts" />
/// <reference path="Token/CharacterTokenParser.ts" />
/// <reference path="DiagnosticInformation.ts" />


namespace UIX.Script.Parser{
    export class Tokenizer{
        private static readonly registeredParser:Token.ITokenParser[] = [
            Token.WhitespaceTokenParser,
            Token.NumberTokenParser,
            Token.CharacterTokenParser
        ];

        public static registerTokenParser(tokenParser:Token.ITokenParser){
            this.registeredParser.push(tokenParser);
        }

        private readonly input:string;
        private index = 0;
        public readonly diagnostics:DiagnosticInformation[] = [];

        public get peekChar(){
            if(this.index < this.input.length){
                return this.input[this.index];
            }
            return "";
        }

        public constructor(input:string){
            this.input = input;
        }

        private readChar(){
            let result = this.peekChar;
            if(result){
                this.next();
            }
            return result;
        }

        public substring(startIndex:number){
            if(startIndex < this.index){
                return this.input.substring(startIndex, this.index < this.input.length ? this.index : this.input.length);
            }
            return "";
        }

        public next(){
            this.index++;
        }

        public reset(){
            this.index = 0;
        }

        public getNextToken(){
            let startIndex = this.index;
            let startChar = this.readChar();
            
            if(!startChar){
                return Token.Token.createEndOfInput(startIndex);
            }

            for(let i = 0; i !== Tokenizer.registeredParser.length; i++){
                let token = Tokenizer.registeredParser[i].tryParse(this, startIndex, startChar);
                if(token){
                    return token;
                }
            }

            this.diagnostics.push(DiagnosticInformation.error("Bad character input: '" + startChar + "'", startIndex, 1));
            return Token.Token.createUnknown(startChar, startIndex);
        }

        public getAllTokens(includeWhitespace = false, reset = true){
            if(reset){
                this.reset();
            }

            let tokens:Token.Token[] = [];
            let currentToken:Token.Token;

            do{
                currentToken = this.getNextToken();
                if(includeWhitespace || currentToken.type !== Token.TokenType.Whitespace){
                    tokens.push(currentToken);                
                }
            }while(currentToken.type !== Token.TokenType.EndOfInput);

            return tokens;
        }
    }
}