/// <reference path="FeatureNode.ts" />
/// <reference path="../Syntax/SyntaxType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class NodeError{
        public static wasNeverClosed(featureNode:FeatureNode){
            return new NodeError(featureNode, Syntax.SyntaxType[featureNode.tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType] + " was never closed.");
        }

        public static closingWithoutTag(featureNode:FeatureNode){
            return new NodeError(featureNode, "Closing " + Syntax.SyntaxType[featureNode.tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType] + " without closing tag.");
        }

        public readonly featureNode:FeatureNode;
        public readonly message:string;

        private constructor(featureNode:FeatureNode, message:string){
            this.featureNode = featureNode;
            this.message = message;
        }
    }
}