/// <reference path="Expression.ts" />
/// <reference path="ExpressionType.ts" />
/// <reference path="LiteralExpressionType.ts" />
/// <reference path="../Token/Token.ts" />

namespace UIX.Script.Parser.Evaluable{
    export class LiteralExpression extends Expression{

        public get expressionType(){
            return ExpressionType.Literal;
        }

        public getChildren(){
            return [];
        }

        public readonly literalToken:Token.Token;
        public readonly literalExpressionType:LiteralExpressionType;

        public constructor(literalToken:Token.Token, literalExpressionType:LiteralExpressionType){
            super();
            this.literalToken = literalToken;
            this.literalExpressionType = literalExpressionType;
        }
    }
}