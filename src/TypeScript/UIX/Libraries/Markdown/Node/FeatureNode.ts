/// <reference path="Node.ts" />
/// <reference path="../Syntax/TokenFeatureDefinition.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class FeatureNode extends Node{
        public static isFeatureNode(node:Node):node is FeatureNode{
            return !node.isToken;
        }

        public get isToken(){ return false; };

        public readonly tokenFeatureDefinition:Syntax.TokenFeatureDefinition;
        public readonly children:Node[] = [];
        public readonly index:number;

        public constructor(tokenFeatureDefinition:Syntax.TokenFeatureDefinition, index:number){
            super();
            this.tokenFeatureDefinition = tokenFeatureDefinition;
            this.index = index;
        }

        public getHTML(): string {
            let result = this.tokenFeatureDefinition.featureDefinition.syntaxDefinition.htmlOpenTag;
            
            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getHTML();
            }

            if(this.tokenFeatureDefinition.featureDefinition.syntaxDefinition.htmlCloseTag){
                result += this.tokenFeatureDefinition.featureDefinition.syntaxDefinition.htmlCloseTag;
            }

            return result;
        }
        public getText(): string {
            let result = "";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getText();
            }

            if(this.tokenFeatureDefinition.featureDefinition.isContainer){
                result += "\n";
            }

            return result;
        }

        public isEmptyOrWhitespace(){
            for(let i = 0; i < this.children.length; i++){
                if(!this.children[i].isEmptyOrWhitespace()){
                    return false;
                }
            }
            return true;
        }
    }
}