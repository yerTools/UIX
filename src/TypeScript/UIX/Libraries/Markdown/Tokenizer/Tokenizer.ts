/// <reference path="Token.ts" />
/// <reference path="TokenType.ts" />

namespace UIX.Libraries.Markdown.Tokenizer{
    export class Tokenizer{
        private readonly markdownParser:MarkdownParser;
        private index = 0;

        private get peekChar(){
            if(this.index < this.markdownParser.markdown.length){
                return this.markdownParser.markdown[this.index];
            }
            return "";
        }

        public constructor(markdownParser:MarkdownParser){
            this.markdownParser = markdownParser;
        }

        private substring(startIndex:number){
            if(startIndex < this.index){
                return this.markdownParser.markdown.substring(startIndex, this.index < this.markdownParser.markdown.length ? this.index : this.markdownParser.markdown.length);
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

        private isCharEndOfLine(char:string){
            return char === '\r' || char === '\n';
        }

        private tryParseEndOfLine(startIndex:number, startChar:string){
            if(this.isCharEndOfLine(startChar)){
                
                let count = 1;
                let includedLineFeed = startChar === '\n';
                let includedCarriageReturn = startChar === '\r';

                while(this.isCharEndOfLine(this.peekChar)){

                    if(this.peekChar === '\n'){
                        if(includedLineFeed){
                            count++;
                            includedCarriageReturn = false;
                        }
                        includedLineFeed = true;
                    }else if(this.peekChar === '\r'){
                        if(includedCarriageReturn){
                            count++;
                            includedLineFeed = false;
                        }
                        includedCarriageReturn = true;
                    }

                    this.next();
                }
                return new Token(TokenType.EndOfLine, "\n", startIndex, count);
            }
            return null;
        }
        
        private isCharWhitespace(char:string){
            return !this.isCharEndOfLine(char) && char && char.trimStart().length === 0;
        }

        private tryParseWhitespace(startIndex:number, startChar:string){
            if(this.isCharWhitespace(startChar)){
                while(this.isCharWhitespace(this.peekChar)){
                    this.next();
                }
                return new Token(TokenType.Whitespace, this.substring(startIndex), startIndex, 1);
            }
            return null;
        }

        private isCharDigit(char:string){
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

        private tryParseNumber(startIndex:number, startChar:string){
            if(this.isCharDigit(startChar)){
                while(this.isCharDigit(this.peekChar)){
                    this.next();
                }
                return new Token(TokenType.Number, this.substring(startIndex), startIndex, 1);
            }
            return null;
        }

        private isSpecialChar(char:string){
            switch(char){
                case '*':
                case '<':
                case '>':
                case '#':
                case '-':
                case '+':
                case '=':
                case '*':
                case '_':
                case '~':
                case '[':
                case ']':
                case '(':
                case ')':
                case '!':
                case '`':
                case '.':
                case ':':
                case '\\':
                    return true;
            }
            return false;
        }

        private tryParseSpecialChar(startIndex:number, startChar:string){
            if(this.isSpecialChar(startChar)){
                let count = 1;
                while(this.isSpecialChar(this.peekChar) && this.peekChar === startChar){
                    count++;
                    this.next();
                }
                return new Token(TokenType.SpecialChar, startChar, startIndex, count);
            }
            return null;
        }

        private parseText(startIndex:number){
            let currentChar = this.peekChar;

            while(!this.isCharWhitespace(currentChar) && 
                  !this.isSpecialChar(currentChar) &&
                  !this.isCharEndOfLine(currentChar) &&
                  !this.isCharDigit(currentChar)){
                this.next();
                currentChar = this.peekChar;
            };
            return new Token(TokenType.Text, this.substring(startIndex), startIndex, 1);
        }

        public getNextToken(){
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
                        (<string>tokens[startIndex].value) += tokens[i].value;
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

        private cleanTokens(tokens:Token[]){
            this.removeWhitespaceFromEmptyLines(tokens);
            this.combineTextAndWhitespaceTokens(tokens);
        }

        public getTokensUntilEndOfLine(){
            let tokens:Token[] = [];
            let currentToken:Token;

            do{
                currentToken = this.getNextToken();
                tokens.push(currentToken);                
            }while(currentToken.type !== TokenType.EndOfMarkdown && currentToken.type !== TokenType.EndOfLine);

            this.cleanTokens(tokens);
            return tokens;
        }

        public getAllTokens(reset = true){
            if(reset){
                this.reset();
            }

            let tokens:Token[] = [];
            let currentToken:Token;

            do{
                currentToken = this.getNextToken();
                tokens.push(currentToken);                
            }while(currentToken.type !== TokenType.EndOfMarkdown);

            this.cleanTokens(tokens);
            return tokens;
        }
    }
}