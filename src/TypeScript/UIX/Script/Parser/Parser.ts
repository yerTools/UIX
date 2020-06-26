/// <reference path="Token/Token.ts" />
/// <reference path="Token/TokenType.ts" />
/// <reference path="Tokenizer.ts" />
/// <reference path="Evaluable/Evaluation.ts" />
/// <reference path="Evaluable/LiteralExpression.ts" />
/// <reference path="Evaluable/BinaryExpression.ts" />
/// <reference path="Syntax/SyntaxTree.ts" />
/// <reference path="DiagnosticInformation.ts" />

namespace UIX.Script.Parser{
    export class Parser{
        private readonly tokens:Token.Token[];
        private index = 0;
        public readonly diagnostics:DiagnosticInformation[] = [];

        private get current(){
            return this.peek(0);
        }

        public constructor(input:string){
            let tokenizer = new Tokenizer(input);
            this.tokens = tokenizer.getAllTokens();
            for(let i = 0; i < tokenizer.diagnostics.length; i++){
                this.diagnostics.push(tokenizer.diagnostics[i]);
            }
        }

        private peek(offset = 0){
            let index = this.index + offset;
            return index < this.tokens.length ? this.tokens[index] : this.tokens[this.tokens.length - 1];
        }

        private next(){
            let current = this.current;
            this.index++;
            return current;
        }

        private match(tokenType:Token.TokenType){
            if(this.current.type == tokenType){
                return this.next();
            }

            this.diagnostics.push(DiagnosticInformation.error("Unexpected token <" + Token.TokenType[this.current.type] + ">, expected <" + Token.TokenType[tokenType] + ">", this.current.index, this.current.rawValue.length));
            return new Token.Token(tokenType, null, "", this.current.index);
        }

        private parsePrimaryExpression():Evaluable.Expression{
            if(this.current.type === Token.TokenType.Character_OpenParentheses){
                let left = this.next();
                let expression = this.parseExpression();
                let right = this.match(Token.TokenType.Character_ClosedParentheses);
                return new Evaluable.ParenthesizedExpression(left, expression, right);
            }

            let integerToken = this.match(Token.TokenType.Integer);
            return new Evaluable.LiteralExpression(integerToken, Evaluable.LiteralExpressionType.Number);
        }

        public parse(){
            let expression = this.parseExpression();
            let endOfInputToken = this.match(Token.TokenType.EndOfInput);
            return new Syntax.SyntaxTree(this.diagnostics, expression, endOfInputToken);
        }

        private parseExpression(){
            return this.parseTerm();
        }

        private parseTerm(){
            let left = this.parseFactor();

            while(this.current.type == Token.TokenType.Character_Plus ||
                  this.current.type == Token.TokenType.Character_Minus){
                let operatorToken = this.next();
                let right = this.parseFactor();
                left = new Evaluable.BinaryExpression(left, operatorToken, right);
            }

            return <Evaluable.Expression>left;
        }

        private parseFactor(){
            let left = this.parsePrimaryExpression();

            while(this.current.type == Token.TokenType.Character_Star ||
                  this.current.type == Token.TokenType.Character_Slash ||
                  this.current.type == Token.TokenType.Character_Percent){
                let operatorToken = this.next();
                let right = this.parsePrimaryExpression();
                left = new Evaluable.BinaryExpression(left, operatorToken, right);
            }

            return <Evaluable.Expression>left;
        }
    }
}