/// <reference path="TokenCategory.ts" />
/// <reference path="TokenType.ts" />

namespace UIX.Script.Syntax.Token{
    export class Token{
        public static getTokenCategoryParent(tokenCategory:TokenCategory){
            switch(tokenCategory){
                case TokenCategory.Number:
                case TokenCategory.Text:
                    return TokenCategory.Value;
                case TokenCategory.Type:
                case TokenCategory.ControlFlow:
                    return TokenCategory.Keyword;
                case TokenCategory.Assignment:
                case TokenCategory.Comparison:
                case TokenCategory.Arithmetic:
                case TokenCategory.Bitwise:
                case TokenCategory.Logical:
                    return TokenCategory.Operator;
            }
            return null;
        }

        public static getTokenCategory(tokenType:TokenType){
            switch(tokenType){
                //EndOfFile
                case TokenType.EndOfFile:
                    return TokenCategory.EndOfFile;
                
                //Whitespace
                case TokenType.NewLine:
                case TokenType.Space:
                case TokenType.Tabulator:
                    return TokenCategory.Whitespace;

                //Brace
                case TokenType.CurlyBraceOpen:
                case TokenType.CurlyBraceClose:
                case TokenType.ParenthesisOpen:
                case TokenType.ParenthesisClose:
                case TokenType.SquareBracketOpen:
                case TokenType.SquareBracketClose:
                    return TokenCategory.Brace;

                //Symbol
                case TokenType.Label:
                case TokenType.Name:
                    return TokenCategory.Symbol;

                //Value
                //Number
                case TokenType.Integer:
                case TokenType.BinaryNumber:
                case TokenType.OctalNumber:
                case TokenType.HexNumber:
                case TokenType.FloatingPoint:
                case TokenType.ScientificNotation:
                    return TokenCategory.Number;
                //Text
                case TokenType.Char:
                case TokenType.String:
                    return TokenCategory.Text;

                //Keyword
                //Type
                case TokenType.Float:
                case TokenType.Double:
                case TokenType.Int:
                case TokenType.Long:
                    return TokenCategory.Type;
                //ControlFlow
                case TokenType.If:
                case TokenType.Else:
                case TokenType.While:
                    return TokenCategory.ControlFlow;
                
                //Operator
                case TokenType.Conditional:
                case TokenType.Increment:
                case TokenType.Decrement:
                case TokenType.Dot:
                case TokenType.Comma:
                case TokenType.Colon:
                case TokenType.Semicolon:
                    return TokenCategory.Operator;
                //Assignment
                case TokenType.Assignment:
                case TokenType.OperationAssignment:
                    return TokenCategory.Assignment;
                //Comparison
                case TokenType.Equal:
                case TokenType.NotEqual:
                case TokenType.GreaterThan:
                case TokenType.GreaterThanOrEqual:
                case TokenType.LessThan:
                case TokenType.LessThanOrEqual:
                    return TokenCategory.Comparison;
                //Arithmetic
                case TokenType.Addition:
                case TokenType.Subtraction:
                case TokenType.Multiplication:
                case TokenType.Division:
                case TokenType.Remainder:
                case TokenType.Exponentiation:
                    return TokenCategory.Arithmetic;
                //Bitwise
                case TokenType.BitwiseAnd:
                case TokenType.BitwiseOr:
                case TokenType.BitwiseXor:
                case TokenType.BitwiseNot:
                case TokenType.LeftShift:
                case TokenType.RightShift:
                    return TokenCategory.Bitwise;
                //Logical,
                case TokenType.LogicalAnd:
                case TokenType.LogicalOr:
                case TokenType.LogicalNot:
                    return TokenCategory.Logical;
                
                //Unknown
                default:
                    return TokenCategory.Unknown;
            }
        }

        public readonly type:TokenType;

        public get tokenCategory(){ 
            return Token.getTokenCategory(this.type); 
        }

        public get tokenCategoryParent(){
            return Token.getTokenCategoryParent(this.tokenCategory);
        }

        public constructor(type:TokenType){
            this.type = type;
        }
    }
}