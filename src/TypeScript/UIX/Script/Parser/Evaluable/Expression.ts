/// <reference path="Evaluation.ts" />
/// <reference path="EvaluationType.ts" />
/// <reference path="ExpressionType.ts" />

namespace UIX.Script.Parser.Evaluable{
    export abstract class Expression extends Evaluation{
        public static getText(expression:Expression){
            let result = "(" + ExpressionType[expression.expressionType] + ")";

            switch(expression.expressionType){
                case ExpressionType.Literal:
                    result += "<" + LiteralExpressionType[(<LiteralExpression>expression).literalExpressionType] + "> -> " + (<LiteralExpression>expression).literalToken.toString();
                    break;
                case ExpressionType.Binary:
                case ExpressionType.Parenthesized:
                    break;
                default:
                    result += "!!! > [UIX.Script.Parser.Evaluable.Expression:getText()] < !!!";
                    break;
            }

            return result;
        }

        public abstract get expressionType():ExpressionType;

        public get evaluationType(){
            return EvaluationType.Expression;
        }
    }
}