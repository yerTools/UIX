/// <reference path="../Evaluable/Expression.ts" />
/// <reference path="../Token/Token.ts" />
/// <reference path="../DiagnosticInformation.ts" />

namespace UIX.Script.Parser.Syntax{
    export class SyntaxTree{
        public readonly diagnostics:DiagnosticInformation[];
        public readonly root:Evaluable.Expression;
        public readonly endOfInputToken:Token.Token;

        constructor(diagnostics:DiagnosticInformation[], root:Evaluable.Expression, endOfInputToken:Token.Token){
            this.diagnostics = diagnostics;
            this.root = root;
            this.endOfInputToken = endOfInputToken;
        }
    }
}