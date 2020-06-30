/// <reference path="Token.ts" />
/// <reference path="TokenType.ts" />
/// <reference path="../Syntax/LanguageDefinition.ts" />

namespace UIX.Libraries.Markdown.Tokenizer{
    

    export class Tokenizer{
        public static isCharEndOfLine(char:string){
            return char === '\r' || char === '\n';
        }

        public static isCharWhitespace(char:string){
            return !Tokenizer.isCharEndOfLine(char) && char && char.trimStart().length === 0;
        }

        public static isCharDigit(char:string){
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

        public static isSpecialChar(char:string){
            return Syntax.LanguageDefinition.usedSpecialChars.has(char);
        }

        public static isTextChar(char:string){
            return char && 
                !Tokenizer.isCharWhitespace(char) && 
                !Tokenizer.isSpecialChar(char) &&
                !Tokenizer.isCharEndOfLine(char) &&
                !Tokenizer.isCharDigit(char);
        }

        private readonly text:string;
        private index = 0;

        private get peekChar(){
            if(this.index < this.text.length){
                return this.text[this.index];
            }
            return "";
        }

        public constructor(text:string){
            this.text = text;
        }

        private substring(startIndex:number){
            if(startIndex < this.index){
                return this.text.substring(startIndex, this.index < this.text.length ? this.index : this.text.length);
            }
            return "";
        }

        private readChar(){
            let result = this.peekChar;
            if(result){
                this.next();
            }
            return result;
        }

        private next(){
            this.index++;
        }

        public reset(){
            this.index = 0;
        }

        private tryParseEndOfLine(startIndex:number, startChar:string){
            if(Tokenizer.isCharEndOfLine(startChar)){
                let includedLineFeed = startChar === '\n';
                let includedCarriageReturn = startChar === '\r';

                while(Tokenizer.isCharEndOfLine(this.peekChar)){

                    if(this.peekChar === '\n'){
                        if(includedLineFeed){
                            break;
                        }
                        includedLineFeed = true;
                    }else if(this.peekChar === '\r'){
                        if(includedCarriageReturn){
                            break;
                        }
                        includedCarriageReturn = true;
                    }

                    this.next();
                }
                return new Token(TokenType.EndOfLine, "\n", startIndex);
            }
            return null;
        }
        
        private tryParseWhitespace(startIndex:number, startChar:string){
            if(Tokenizer.isCharWhitespace(startChar)){
                let text = " ";
                while(Tokenizer.isCharWhitespace(this.peekChar)){
                    this.next();
                    text += " ";
                }
                return new Token(TokenType.Whitespace, text, startIndex);
            }
            return null;
        }

        private tryParseNumber(startIndex:number, startChar:string){
            if(Tokenizer.isCharDigit(startChar)){
                while(Tokenizer.isCharDigit(this.peekChar)){
                    this.next();
                }
                return new Token(TokenType.Number, this.substring(startIndex), startIndex);
            }
            return null;
        }
       
        private tryParseSpecialChar(startIndex:number, startChar:string){
            if(Tokenizer.isSpecialChar(startChar)){
                return new Token(TokenType.SpecialChar, startChar, startIndex);
            }
            return null;
        }

        private parseText(startIndex:number){
            let currentChar = this.peekChar;

            while(Tokenizer.isTextChar(currentChar)){
                this.next();
                currentChar = this.peekChar;
            };
            return new Token(TokenType.Text, this.substring(startIndex), startIndex);
        }

        public getNextToken():Token{
            let startIndex = this.index;
            let startChar = this.readChar();
            
            if(!startChar){
                return Token.createEndOfMarkdown(startIndex);
            }else{
                let token = this.tryParseWhitespace(startIndex, startChar);
                if(token){
                    return token;
                }
                token = this.tryParseSpecialChar(startIndex, startChar);
                if(token){
                    return token;
                }
                token = this.tryParseEndOfLine(startIndex, startChar);
                if(token){
                    return token;
                }
                token = this.tryParseNumber(startIndex, startChar);
                if(token){
                    return token;
                }
                
                return this.parseText(startIndex);
            }
        }

        private removeWhitespaceFromEmptyLines(tokens:Token[]){
            if(tokens.length === 0){
                return tokens;
            }

            for(let i = 1; i < tokens.length; i++){
                if(tokens[i].type === TokenType.EndOfLine && tokens[i - 1].type === TokenType.Whitespace &&
                   (i === 1 || tokens[i - 2].type === TokenType.EndOfLine)){
                    tokens.splice(i - 1, 1);
                    i--;
                }
            }

            return tokens;
        }

        private combineTextAndWhitespaceTokens(tokens:Token[]){
            if(tokens.length === 0){
                return tokens;
            }

            let startIndex:number|null = null;

            let merge = (endIndex:number) => {
                if(startIndex !== null && startIndex !== endIndex){
                    for(let i = startIndex + 1; i <= endIndex; i++){
                        if(tokens[i].type === TokenType.Whitespace){
                            (<string>tokens[startIndex].value) += " ";
                        }else{
                            (<string>tokens[startIndex].value) += tokens[i].value;
                        }
                    }
                    let deleteCount = endIndex - startIndex;
                    tokens.splice(startIndex + 1, deleteCount);
                    startIndex = null;
                    return deleteCount;
                }
                startIndex = null;
                return 0;
            };

            for(let i = 0; i < tokens.length; i++){
                switch(tokens[i].type){
                    case TokenType.Text:
                        if(startIndex === null){
                            startIndex = i;
                        }
                        break;
                    case TokenType.Whitespace:
                        if(startIndex !== null && i + 1 !== tokens.length && tokens[i + 1].type === TokenType.EndOfLine){
                            i -= merge(i - 1);
                        }
                        break;
                    default:
                        if(startIndex !== null){
                            i -= merge(i - 1);
                        }
                        break;
                }
            }

            merge(tokens.length - 1);
            return tokens;
        }

        private cleanTokens(tokens:Token[], removeWhitespaceFromEmptyLines:boolean){
            if(removeWhitespaceFromEmptyLines){
                this.removeWhitespaceFromEmptyLines(tokens);
            }
            this.combineTextAndWhitespaceTokens(tokens);
        }

        public getTokensUntilEndOfLine(removeWhitespaceFromEmptyLines = true){
            let tokens:Token[] = [];
            let currentToken:Token;

            do{
                currentToken = this.getNextToken();
                tokens.push(currentToken);                
            }while(currentToken.type !== TokenType.EndOfMarkdown && currentToken.type !== TokenType.EndOfLine);

            this.cleanTokens(tokens, removeWhitespaceFromEmptyLines);
            return tokens;
        }

        public getAllTokens(reset = true, removeWhitespaceFromEmptyLines = true){
            if(reset){
                this.reset();
            }

            let tokens:Token[] = [];
            let currentToken:Token;

            do{
                currentToken = this.getNextToken();
                tokens.push(currentToken);                
            }while(currentToken.type !== TokenType.EndOfMarkdown);

            this.cleanTokens(tokens, removeWhitespaceFromEmptyLines);
            return tokens;
        }
    }
}