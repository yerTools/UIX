/// <reference path="../Tokenizer.ts" />
/// <reference path="Token.ts" />

namespace UIX.Script.Parser.Token{
    export interface ITokenParser{
        tryParse(tokenizer:Tokenizer, startIndex:number, startChar:string):null|Token;
    }
}