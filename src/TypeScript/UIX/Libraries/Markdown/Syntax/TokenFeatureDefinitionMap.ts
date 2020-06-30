/// <reference path="TokenFeatureDefinition.ts" />
/// <reference path="FeatureDefinition.ts" />
/// <reference path="../Tokenizer/Token.ts" />
/// <reference path="../Tokenizer/TokenType.ts" />

namespace UIX.Libraries.Markdown.Syntax{
    export class TokenFeatureDefinitionMap{
        private readonly inlineTokenSequences:Tokenizer.Token[][] = [];
        private readonly inlineFeatureDefinitions:TokenFeatureDefinition[][] = [];
        private readonly containerTokenSequences:Tokenizer.Token[][] = [];
        private readonly containerFeatureDefinitions:TokenFeatureDefinition[][] = [];

        private insertInto(tokens:Tokenizer.Token[], tokenIndex:number, featureDefinition:FeatureDefinition, isOpenSequence:boolean){
            let tokenSequences = featureDefinition.isContainer ? this.containerTokenSequences : this.inlineTokenSequences;
            let featureDefinitions = featureDefinition.isContainer ? this.containerFeatureDefinitions : this.inlineFeatureDefinitions;

            let exits = false;
            let i = 0;
            for(;!exits && i < tokenSequences.length; i++){
                if(tokenSequences[i].length < tokens.length){
                    break;
                }else if(tokenSequences[i].length === tokens.length){
                    exits = true;
                    for(let x = 0; x < tokens.length; x++){
                        if(!tokens[x].isSimilar(tokenSequences[i][x])){
                            exits = false;
                            break;
                        }
                    }
                    if(exits){
                        i--;
                    }
                }
            }


            if(exits){
                let push = true;
                for(let x = 0; x < featureDefinitions[i].length; x++){
                    if(featureDefinition.id == featureDefinitions[i][x].id){
                        if(isOpenSequence){
                            featureDefinitions[i][x].isOpenSequence = true;
                        }else{
                            featureDefinitions[i][x].isCloseSequence = true;
                        }
                        push = false;
                        break;
                    }
                }
                if(push){
                    featureDefinitions[i].push(new TokenFeatureDefinition(featureDefinition, isOpenSequence, tokens.length, tokenIndex));
                }
            }else{
                tokenSequences.splice(i, 0, tokens);
                featureDefinitions.splice(i, 0, [new TokenFeatureDefinition(featureDefinition, isOpenSequence, tokens.length, tokenIndex)]);
            }
        }

        public add(featureDefinition:FeatureDefinition){
            for(let i = 0; i < featureDefinition.openTokens.length; i++){
                this.insertInto(featureDefinition.openTokens[i], i, featureDefinition, true);
            }
            if(featureDefinition.hasCloseToken){
                for(let i = 0; i < featureDefinition.closeTokens.length; i++){
                    this.insertInto(featureDefinition.closeTokens[i], i, featureDefinition, false);
                }
            }            
        }

        public matchStart(isContainer:boolean, tokenSequence:Tokenizer.Token[], startIndex:number, length:number){
            let tokenSequences = isContainer ? this.containerTokenSequences : this.inlineTokenSequences;
            let featureDefinitions = isContainer ? this.containerFeatureDefinitions : this.inlineFeatureDefinitions;

            let result:TokenFeatureDefinition[] = [];

            for(let x = 0; x < tokenSequences.length; x++){
                if(tokenSequences[x].length < length){
                    break;
                }
                let isMatch = true;
                for(let y = 0; y < length; y++){
                    if(!tokenSequence[startIndex + y].isSimilar(tokenSequences[x][y]) || tokenSequence[startIndex + y].type === Tokenizer.TokenType.Whitespace && tokenSequence[startIndex + y].value.length < tokenSequences[x][y].value.length){
                        isMatch = false;
                        break;
                    }
                }
                if(isMatch){
                    for(let y = 0; y < featureDefinitions[x].length; y++){
                        result.push(featureDefinitions[x][y]);
                    }
                }
            }

            return result;
        }
    }

}