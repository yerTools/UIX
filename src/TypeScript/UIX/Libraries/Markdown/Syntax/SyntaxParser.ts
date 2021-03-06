/// <reference path="LanguageFeatures.ts" />
/// <reference path="../Tokenizer/Tokenizer.ts" />
/// <reference path="../Tokenizer/Token.ts" />
/// <reference path="../FeatureStack.ts" />

namespace UIX.Libraries.Markdown.Syntax{
    export class SyntaxParser{
        public readonly tokens:Tokenizer.Token[];
        private position = 0;

        public constructor (tokenizer:Tokenizer.Tokenizer){
            this.tokens = tokenizer.getAllTokens();
        }

        public parse(){
            this.position = 0;
            
            let featureStack = new FeatureStack();

            while(this.position < this.tokens.length){
                let feature = this.getNextFeature(true) ?? this.getNextFeature(false);
                if(feature === null){
                    featureStack.pushToken(this.tokens[this.position]);
                    this.position++;
                }else{
                    featureStack.pushOrPopTokenFeatureDefinition(feature, this.tokens[this.position].index);
                    this.position += feature.length;
                }
            }

            featureStack.processPendingOperations();
            return featureStack;
        }

        private getNextFeature(isContainer:boolean){
            let lastMatches:TokenFeatureDefinition[] = [];

            let length = 0;
            for(let x = this.position; x < this.tokens.length; x++){
                length++;
                let matches = LanguageFeatures.tokenFeatureDefinitionMap.matchStart(isContainer, this.tokens, this.position, length);
                if(matches.length === 0){
                    length--;
                    break;
                }
                lastMatches = matches;
            }

            for(let i = 0; i < lastMatches.length; i++){
                if(lastMatches[i].length === length){
                    return lastMatches[i];
                }
            }
            return null;
        }
    }
}