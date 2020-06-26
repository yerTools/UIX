/// <reference path="../Tokenizer.ts" />
/// <reference path="ITokenParser.ts" />
/// <reference path="Token.ts" />
/// <reference path="TokenType.ts" />

namespace UIX.Script.Parser.Token{

    function isWhitespace(char:string){
        return char && char.trimStart().length === 0;
    }

    export const WhitespaceTokenParser : ITokenParser = {
        tryParse(tokenizer:Tokenizer, startIndex:number, startChar:string){
            if(isWhitespace(startChar)){
                
                while(isWhitespace(tokenizer.peekChar)){
                    tokenizer.next();
                }

                return new Token(TokenType.Whitespace, null, tokenizer.substring(startIndex), startIndex);
            }
            return null;
        },

    };
}