/// <reference path="ExpressionType.ts" />
/// <reference path="ExpressionFlag.ts" />
/// <reference path="../Executable/ExecutableExpression.ts" />

//check at index/offset
//inline if with expression ? :
//logical or and and

namespace UIX.Libraries.TextExpression.BaseType{
    export abstract class TextExpression{
        public readonly type:ExpressionType;
        public flags:ExpressionFlag;

        protected constructor(type:ExpressionType, flags:ExpressionFlag = 0){
            this.type = type;
            this.flags = flags;
        }

        public abstract getExecutableExpression(overrideFlags?:ExpressionFlag):Executable.ExecutableExpression;

        public match(text:string, startIndex = 0){
            return this.getExecutableExpression().matchOne(text, startIndex < 0 ? 0 : startIndex);
        }

        public matchAll(text:string, startIndex = 0){
            return this.getExecutableExpression().matchAll(text, startIndex < 0 ? 0 : startIndex);
        }
    }
}