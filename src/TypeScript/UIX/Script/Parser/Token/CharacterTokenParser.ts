/// <reference path="../Tokenizer.ts" />
/// <reference path="ITokenParser.ts" />
/// <reference path="Token.ts" />
/// <reference path="TokenType.ts" />

namespace UIX.Script.Parser.Token{
    export const CharacterTokenParser : ITokenParser = {
        tryParse(tokenizer:Tokenizer, startIndex:number, startChar:string){
            let tokenType:TokenType|null = null;

            switch(startChar){
                case '+':
                    tokenType = TokenType.Character_Plus;
                    break;
                case '-':
                    tokenType = TokenType.Character_Minus;
                    break;
                case '*':
                    tokenType = TokenType.Character_Star;
                    break;
                case '/':
                    tokenType = TokenType.Character_Slash;
                    break;
                case '%':
                    tokenType = TokenType.Character_Percent;
                    break;
                case '(':
                    tokenType = TokenType.Character_OpenParentheses;
                    break;
                case ')':
                    tokenType = TokenType.Character_ClosedParentheses;
                    break;                                    
            }

            if(tokenType !== null){
                return new Token(tokenType, null, startChar, startIndex);
            }

            return null;
        },

    };
}