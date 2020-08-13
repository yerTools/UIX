/// <reference path="BaseType/TextExpression.ts" />
/// <reference path="Executable/SimpleTextExecutableExpression.ts" />

namespace UIX.Libraries.TextExpression{
    export class SimpleTextExpression extends BaseType.TextExpression{

        public query:string;
        private _lastSimpleTextExecutableExpression?:Executable.SimpleTextExecutableExpression;

        public constructor(query:string, flags?:BaseType.ExpressionFlag){
            super(BaseType.ExpressionType.Simple, flags);
            this.query = query;
        }

        public getExecutableExpression(overrideFlags?:BaseType.ExpressionFlag){
            let flags = overrideFlags ?? this.flags;

            if(!this._lastSimpleTextExecutableExpression || !this._lastSimpleTextExecutableExpression.compareToSimpleTextExpression(this, flags)){
                this._lastSimpleTextExecutableExpression = new Executable.SimpleTextExecutableExpression(this, flags);
            }
            return this._lastSimpleTextExecutableExpression;
        }
    }
}