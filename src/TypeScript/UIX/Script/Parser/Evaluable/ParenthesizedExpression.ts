/// <reference path="Expression.ts" />
/// <reference path="ExpressionType.ts" />
/// <reference path="LiteralExpression.ts" />
/// <reference path="../Token/Token.ts" />

namespace UIX.Script.Parser.Evaluable{
    export class ParenthesizedExpression extends Expression{
        
        public get expressionType(){
            return ExpressionType.Parenthesized;
        }

        public getChildren(){
            return [this.openParenthesis, this.expression, this.closeParenthesis];
        }

        public readonly openParenthesis:LiteralExpression;
        public readonly expression:Expression;
        public readonly closeParenthesis:LiteralExpression;

        public constructor(openParenthesisToken:Token.Token, expression:Expression, closeParenthesisToken:Token.Token){
            super();
            this.openParenthesis = new LiteralExpression(openParenthesisToken, LiteralExpressionType.Parenthesis);
            this.expression = expression;
            this.closeParenthesis = new LiteralExpression(closeParenthesisToken, LiteralExpressionType.Parenthesis);
        }
    }
}