/// <reference path="../Tokenizer.ts" />
/// <reference path="ITokenParser.ts" />
/// <reference path="Token.ts" />
/// <reference path="TokenType.ts" />
/// <reference path="../DiagnosticInformation.ts" />

namespace UIX.Script.Parser.Token{

    function isDigit(char:string){
        switch(char){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return true;
        }
        return false;
    }

    export const NumberTokenParser : ITokenParser = {
        tryParse(tokenizer:Tokenizer, startIndex:number, startChar:string){
            if(isDigit(startChar)){
                
                while(isDigit(tokenizer.peekChar)){
                    tokenizer.next();
                }
    
                let rawValue = tokenizer.substring(startIndex);
                let parsedValue = parseInt(rawValue);
                if(isNaN(parsedValue)){
                    tokenizer.diagnostics.push(DiagnosticInformation.error("The number '" + rawValue + "' isn't a valid number", startIndex, rawValue.length));
                }
                return new Token(TokenType.Integer, parsedValue, rawValue, startIndex);
            }
            return null;
        },

    };
}