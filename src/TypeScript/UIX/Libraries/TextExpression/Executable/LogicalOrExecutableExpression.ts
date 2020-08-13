/// <reference path="ExecutableExpression.ts" />
 
namespace UIX.Libraries.TextExpression.Executable{
    export class LogicalOrExecutableExpression extends ExecutableExpression{

        public firstExecutableExpression:ExecutableExpression;
        public secondExecutableExpression:ExecutableExpression;

        public constructor(logicalOrExpression:LogicalOrExpression, firstExecutableExpression:ExecutableExpression, secondExecutableExpression:ExecutableExpression){
            super(logicalOrExpression.type, logicalOrExpression.flags);
            this.firstExecutableExpression = firstExecutableExpression;
            this.secondExecutableExpression = secondExecutableExpression;
        }

        public match(_text:Text.TextSpan, startIndex:number, rawText:Text.TextSpan, lowerText?:Text.TextSpan){
            let match = this.firstExecutableExpression.matchInterface(startIndex, rawText, lowerText);
            if(match){
                return match;
            }
            return this.secondExecutableExpression.matchInterface(startIndex, rawText, lowerText)
        }
    }
}