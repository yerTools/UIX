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

        protected compareToBasicTextExpression(textExpression:BaseType.TextExpression, flags:BaseType.ExpressionFlag){
            return textExpression.type === this.type && flags === this.flags;
        }

        public abstract match(text:Text.TextSpan, startIndex:number, rawText:Text.TextSpan, lowerText?:Text.TextSpan):null|Match.MatchResult|Match.MatchResult[];

        public matchInterface(startIndex:number, rawText:Text.TextSpan, lowerText?:Text.TextSpan){
            if(this.flags & BaseType.ExpressionFlag.IgnoreCase){
                if(!lowerText){
                    lowerText = Text.TextSpan.fromString(Text.Manipulation.toLowerCase(rawText.toString()));
                }
                return this.match(lowerText, startIndex, rawText, lowerText);
            }
            return this.match(rawText, startIndex, rawText, lowerText);
        }

        public matchOne(text:string, startIndex:number){
            let rawText = Text.TextSpan.fromString(text);
            if(this.flags & BaseType.ExpressionFlag.IgnoreCase){
                return this.matchInterface(startIndex, rawText, Text.TextSpan.fromString(Text.Manipulation.toLowerCase(text)));
            }
            return this.matchInterface(startIndex, rawText);
        }

        public matchAll(text:string, startIndex:number){
            let rawText = Text.TextSpan.fromString(text);
            let lowerText:undefined|Text.TextSpan;
            if(this.flags & BaseType.ExpressionFlag.IgnoreCase){
                lowerText = Text.TextSpan.fromString(Text.Manipulation.toLowerCase(text));
            }

            let matches:Match.MatchResult[] = [];

            while(startIndex < text.length){
                let match = this.matchInterface(startIndex, rawText, lowerText);
                if(match){
                    if(Array.isArray(match)){
                        match.sort((a,b) => 
                            a.index + a.length - b.index - b.length
                        );

                        let nextIndex = startIndex + 1;
                        for(let i = 0; i < match.length; i++){
                            matches.push(match[i]);
                    
                            let currentIndex = match[i].index + match.length;
                            if(currentIndex > nextIndex){
                                nextIndex = currentIndex;
                            }
                        }
                        
                    }else{
                        matches.push(match);
                    
                        let nextIndex = match.index + match.length;
                        if(nextIndex > startIndex){
                            startIndex = nextIndex
                        }else{
                            startIndex++;
                        }
                    }
                }else{
                    break;
                }
            }

            return matches;
        }
    }
}