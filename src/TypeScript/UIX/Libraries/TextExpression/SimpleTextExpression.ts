/// <reference path="BaseType/TextExpression.ts" />
/// <reference path="Executable/SimpleExecutableExpression.ts" />

namespace UIX.Libraries.TextExpression{
    export class SimpleTextExpression extends BaseType.TextExpression{

        public query:string;
        private _lastSimpleExecutableExpression?:Executable.SimpleExecutableExpression;

        public constructor(query:string, flags?:BaseType.ExpressionFlag){
            super(BaseType.ExpressionType.Simple, flags);
            this.query = query;
        }

        protected getExecutableExpression(){
            if(!this._lastSimpleExecutableExpression || !this._lastSimpleExecutableExpression.compareToSimpleTextExpression(this)){
                this._lastSimpleExecutableExpression = new Executable.SimpleExecutableExpression(this);
            }
            return this._lastSimpleExecutableExpression;
        }
    }
}