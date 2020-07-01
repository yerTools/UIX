/// <reference path="FeatureDefinition.ts" />
/// <reference path="../Tokenizer/Token.ts" />

namespace UIX.Libraries.Markdown.Syntax{
    export class TokenFeatureDefinition{
        public readonly featureDefinition:FeatureDefinition;
        public readonly tokenIndex:number;
        public readonly length:number;
        private readonly isOpenSequenceIndex:boolean;
        public isOpenSequence:boolean;
        public isCloseSequence:boolean;

        public get id(){
            return this.featureDefinition.id;
        }

        public get tokens(){
            return this.isOpenSequenceIndex ? this.featureDefinition.openTokens[this.tokenIndex] : this.featureDefinition.closeTokens[this.tokenIndex];
        }

        public get tokenText(){
            let tokens = this.tokens;
            if(tokens.length === 1){
                return tokens[0].value;
            }
            let text = "";
            for(let i = 0; i < tokens.length; i++){
                text += tokens[i].value;
            }
            return text;
        }

        public constructor(featureDefinition:FeatureDefinition, isOpenSequence:boolean, length:number, tokenIndex:number){
            this.featureDefinition = featureDefinition;
            this.length = length;
            this.tokenIndex = tokenIndex;
            this.isOpenSequenceIndex = isOpenSequence;
            this.isOpenSequence = isOpenSequence;
            this.isCloseSequence = !isOpenSequence;
        }
    }

}