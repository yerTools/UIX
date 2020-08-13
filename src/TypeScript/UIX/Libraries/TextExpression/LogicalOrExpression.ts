/// <reference path="BaseType/TextExpression.ts" />
/// <reference path="Executable/LogicalOrExecutableExpression.ts" />

namespace UIX.Libraries.TextExpression{
    export class LogicalOrExpression extends BaseType.TextExpression{

        public firstExpression:BaseType.TextExpression;
        public secondExpression:BaseType.TextExpression;

        public constructor(firstExpression:BaseType.TextExpression, secondExpression:BaseType.TextExpression, overrideFlags?:BaseType.ExpressionFlag){
            super(BaseType.ExpressionType.Simple, overrideFlags);
            this.firstExpression = firstExpression;
            this.secondExpression = secondExpression;
        }

        public getExecutableExpression(overrideFlags?:BaseType.ExpressionFlag){
            if(overrideFlags === undefined || this.flags !== BaseType.ExpressionFlag.None){
                overrideFlags = this.flags;
            }
            //TODO: cache?
            return new Executable.LogicalOrExecutableExpression(this, this.firstExpression.getExecutableExpression(overrideFlags),  this.secondExpression.getExecutableExpression(overrideFlags));
        }
    }
}