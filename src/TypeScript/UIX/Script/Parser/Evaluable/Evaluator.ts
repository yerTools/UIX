/// <reference path="Expression.ts" />
/// <reference path="ExpressionType.ts" />
/// <reference path="LiteralExpression.ts" />
/// <reference path="BinaryExpression.ts" />
/// <reference path="ParenthesizedExpression.ts" />
/// <reference path="../Token/TokenType.ts" />
/// <reference path="../DiagnosticInformation.ts" />

namespace UIX.Script.Parser.Evaluable{
    export class Evaluator{
        public readonly diagnostics:DiagnosticInformation[] = [];
        public readonly root:Expression;

        public constructor(root:Expression){
            this.root = root;
        }

        public evalueate(){
            return this.evalueateExpression(this.root);
        }

        private evalueateExpression(expression:Expression):number|null{
            switch(expression.expressionType){
                case ExpressionType.Literal:
                    if((<LiteralExpression>expression).literalExpressionType === LiteralExpressionType.Number && typeof (<LiteralExpression>expression).literalToken.value === "number"){
                        return <number>(<LiteralExpression>expression).literalToken.value;
                    }
                    this.diagnostics.push(DiagnosticInformation.error("'" + (<LiteralExpression>expression).literalToken.rawValue + "' isn't a valid number", (<LiteralExpression>expression).literalToken.index, (<LiteralExpression>expression).literalToken.rawValue.length));
                    return null;
                case ExpressionType.Binary:
                    let left = this.evalueateExpression((<BinaryExpression>expression).left);
                    if(left === null){
                        return left;
                    }
                    let right = this.evalueateExpression((<BinaryExpression>expression).right);
                    if(right === null){
                        return right;
                    }
                    switch((<BinaryExpression>expression).operation.literalToken.type){
                        case Token.TokenType.Character_Plus:
                            return left + right;
                        case Token.TokenType.Character_Minus:
                            return left - right;
                        case Token.TokenType.Character_Star:
                            return left * right;
                        case Token.TokenType.Character_Slash:
                            return left / right;
                        case Token.TokenType.Character_Percent:
                            return left % right;
                        default:
                            this.diagnostics.push(DiagnosticInformation.error("Token type <" + Token.TokenType[(<BinaryExpression>expression).operation.literalToken.type] + "> is a unexpected binary operator", (<BinaryExpression>expression).operation.literalToken.index, (<BinaryExpression>expression).operation.literalToken.rawValue.length));
                            return null;
                    }
                case ExpressionType.Parenthesized:
                    return this.evalueateExpression((<ParenthesizedExpression>expression).expression);
                default:
                    this.diagnostics.push(DiagnosticInformation.error("Expression type '" + ExpressionType[expression.expressionType] + "' can't be evaluated"));
                    return null;
            }
        }
    }
}