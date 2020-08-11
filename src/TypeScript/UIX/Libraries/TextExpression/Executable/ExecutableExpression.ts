/// <reference path="../BaseType/ExpressionType.ts" />
/// <reference path="../BaseType/ExpressionFlag.ts" />

/// <reference path="../Text/Manipulation.ts" />
/// <reference path="../Text/TextSpan.ts" />
/// <reference path="../Match/MatchResult.ts" />

namespace UIX.Libraries.TextExpression.Executable{
    export abstract class ExecutableExpression{
        public readonly type:BaseType.ExpressionType;
        public readonly flags:BaseType.ExpressionFlag;

        protected constructor(type:BaseType.ExpressionType, flags:BaseType.ExpressionFlag){
            this.type = type;
            this.flags = flags;
        }

        protected compareToBasicTextExpression(textExpression:BaseType.TextExpression){
            return textExpression.type === this.type && textExpression.flags === this.flags;
        }

        protected abstract match(text:Text.TextSpan, startIndex:number):Match.MatchResult|null;

        public matchOne(text:string, startIndex:number){
            if(this.flags & BaseType.ExpressionFlag.IgnoreCase){
                return this.match(Text.TextSpan.fromString(Text.Manipulation.toLowerCase(text)), startIndex);
            }
            return this.match(Text.TextSpan.fromString(text), startIndex);
        }

        public matchAll(text:string, startIndex:number){
            let textSpan = Text.TextSpan.fromString(this.flags & BaseType.ExpressionFlag.IgnoreCase ? Text.Manipulation.toLowerCase(text) : text);

            let matches:Match.MatchResult[] = [];

            while(startIndex < text.length){
                let match = this.match(textSpan, startIndex);
                if(match){
                    matches.push(match);
                    
                    let nextIndex = match.index + match.length;
                    if(nextIndex > startIndex){
                        startIndex = nextIndex
                    }else{
                        startIndex++;
                    }
                }else{
                    break;
                }
            }

            return matches
        }
    }
}