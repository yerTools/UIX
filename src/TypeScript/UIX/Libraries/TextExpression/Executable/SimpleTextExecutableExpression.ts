/// <reference path="ExecutableExpression.ts" />

namespace UIX.Libraries.TextExpression.Executable{
    export class SimpleTextExecutableExpression extends ExecutableExpression{

        public readonly query:Text.TextSpan;

        public constructor(simpleTextExpression:SimpleTextExpression, flags:BaseType.ExpressionFlag){
            super(simpleTextExpression.type, flags);
            if(flags & BaseType.ExpressionFlag.IgnoreCase){
                this.query = Text.TextSpan.fromString(Text.Manipulation.toLowerCase(simpleTextExpression.query));
            }else{
                this.query = Text.TextSpan.fromString(simpleTextExpression.query);
            }
        }

        public compareToSimpleTextExpression(simpleTextExpression:SimpleTextExpression, flags:BaseType.ExpressionFlag){
            if(!this.compareToBasicTextExpression(simpleTextExpression, flags)){
                return false;
            }
            if(this.flags & BaseType.ExpressionFlag.IgnoreCase){
                return this.query.equalsString(Text.Manipulation.toLowerCase(simpleTextExpression.query));
            }
            return this.query.equalsString(simpleTextExpression.query);
        }

        public match(text:Text.TextSpan, startIndex:number){
            if(text.length < this.query.length || startIndex !== 0 && (this.flags & BaseType.ExpressionFlag.FromBeginning || this.flags & BaseType.ExpressionFlag.FromEnding)){
                return null;
            }
            if(this.flags & BaseType.ExpressionFlag.FromBeginningToEnding){
                if(this.query.equals(text)){
                    return new Match.MatchResult(0, this.query.length);
                }
            }else if(this.flags & BaseType.ExpressionFlag.FromBeginning){
                if(text.startsWith(this.query)){
                    return new Match.MatchResult(0, this.query.length)
                }
            }else if(this.flags & BaseType.ExpressionFlag.FromEnding){
                if(text.endsWith(this.query)){
                    return new Match.MatchResult(text.length  - this.query.length, this.query.length)
                }
            }else{
                let index = text.indexOf(this.query, startIndex);
                if(index !== null){
                    return new Match.MatchResult(index, this.query.length);
                }
            }
            return null;
        }
    }
}