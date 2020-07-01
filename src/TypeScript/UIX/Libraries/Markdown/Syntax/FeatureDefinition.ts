/// <reference path="SyntaxType.ts" />
/// <reference path="SyntaxDefinition.ts" />
/// <reference path="../Tokenizer/Token.ts" />
/// <reference path="../Tokenizer/TokenType.ts" />
/// <reference path="../Tokenizer/Tokenizer.ts" />

namespace UIX.Libraries.Markdown.Syntax{
    export class FeatureDefinition{
        private static currentId = 0;

        private static getTokensFromText(text:string){
            let tokens = new Tokenizer.Tokenizer(text).getAllTokens(false, false);
            if(tokens.length && tokens[tokens.length - 1].type === Tokenizer.TokenType.EndOfMarkdown){
                tokens.splice(tokens.length - 1, 1);
            }
            return tokens;
        }

        public readonly syntaxDefinition:SyntaxDefinition;
        public readonly id = ++FeatureDefinition.currentId;
        public readonly isContainer:boolean;
        public readonly openTokens:Tokenizer.Token[][];
        public readonly closeTokens:Tokenizer.Token[][];

        public get hasCloseToken(){
            return this.closeTokens.length !== 0;
        }

        public constructor(syntaxDefinition:SyntaxDefinition, isContainer:boolean){
            this.isContainer = isContainer;
            this.syntaxDefinition = syntaxDefinition;
            this.openTokens = new Array(syntaxDefinition.openTokens.length);
            this.closeTokens =  new Array(syntaxDefinition.closeTokens.length);

            for(let i = 0; i < syntaxDefinition.openTokens.length; i++){
                this.openTokens[i] = FeatureDefinition.getTokensFromText(syntaxDefinition.openTokens[i]);
            }
            for(let i = 0; i < syntaxDefinition.closeTokens.length; i++){
                this.closeTokens[i] = FeatureDefinition.getTokensFromText(syntaxDefinition.closeTokens[i]);
            }
        }

    }

}