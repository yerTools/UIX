/// <reference path="Expression.ts" />
/// <reference path="ExpressionType.ts" />
/// <reference path="LiteralExpression.ts" />
/// <reference path="../Token/Token.ts" />

namespace UIX.Script.Parser.Evaluable{
    export class BinaryExpression extends Expression{
        
        public get expressionType(){
            return ExpressionType.Binary;
        }

        public getChildren(){
            return [this.left, this.operation, this.right];
        }

        public readonly left:Expression;
        public readonly operation:LiteralExpression;
        public readonly right:Expression;

        public constructor(left:Expression, operationToken:Token.Token, right:Expression){
            super();
            this.left = left;
            this.operation = new LiteralExpression(operationToken, LiteralExpressionType.Operation);
            this.right = right;
        }
    }
}