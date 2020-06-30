/// <reference path="FeatureNode.ts" />
/// <reference path="../Syntax/SyntaxType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class FeatureNodeOperation{
        static push(featureNode:FeatureNode){
            return new FeatureNodeOperation(true, featureNode.tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType, featureNode);
        }
        
        static pop(syntaxType:Syntax.SyntaxType){
            return new FeatureNodeOperation(false, syntaxType);
        }

        public readonly featureNode?:FeatureNode;
        public readonly syntaxType:Syntax.SyntaxType;
        public readonly push:boolean;


        private constructor(push:boolean, syntaxType:Syntax.SyntaxType, featureNode?:FeatureNode,){
            this.featureNode = featureNode;
            this.syntaxType = syntaxType;
            this.push = push;
        }
    }
}