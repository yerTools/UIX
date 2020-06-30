/// <reference path="Node/Node.ts" />
/// <reference path="Node/MarkdownContainer.ts" />
/// <reference path="Node/FeatureNode.ts" />
/// <reference path="Node/FeatureNodeOperation.ts" />
/// <reference path="Tokenizer/Token.ts" />
/// <reference path="Syntax/TokenFeatureDefinition.ts" />
/// <reference path="Syntax/SyntaxType.ts" />
/// <reference path="Syntax/LanguageFeatures.ts" />

namespace UIX.Libraries.Markdown{
    export class FeatureStack{
        private static readonly defaultTextContainer = new Syntax.TokenFeatureDefinition(Syntax.LanguageFeatures.defaultTextContainer, true, 0, 0); 

        public readonly markdownContainer = new Node.MarkdownContainer();
        public readonly featureStack:Node.FeatureNode[] = [];
        private readonly pendingOperations:Node.FeatureNodeOperation[] = [];

        public pushToken(token:Tokenizer.Token){
            if(token.type === Tokenizer.TokenType.EndOfMarkdown){
                this.endOfMarkdown();
            }else{
                this.processPendignOperations();
                let tokenNode = new Node.TokenNode(token);
                if(this.featureStack.length === 0){
                    this.pushTokenFeatureDefinition(FeatureStack.defaultTextContainer);
                    this.processPendignOperations();
                }
                this.featureStack[this.featureStack.length - 1].children.push(tokenNode);
            }
        }

        public processPendignOperations(){
            if(this.pendingOperations.length){
                let pops = new Set<Syntax.SyntaxType>();
                let clearPops = () =>{
                    while(this.featureStack.length && pops.size){
                        if(!pops.delete(this.featureStack[this.featureStack.length - 1].tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType)){
                            console.log("Popping " + Syntax.SyntaxType[this.featureStack[this.featureStack.length - 1].tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType] + " without command");
                        }
                        this.featureStack.pop();
                    }
                    pops.clear();
                };


                for(let i = 0; i < this.pendingOperations.length; i++){
                    if(this.pendingOperations[i].push){
                        clearPops();
                        if(this.featureStack.length){
                            this.featureStack[this.featureStack.length - 1].children.push(<Node.FeatureNode>this.pendingOperations[i].featureNode);
                        }else{
                            this.markdownContainer.children.push(<Node.FeatureNode>this.pendingOperations[i].featureNode);
                        }
                        if(this.pendingOperations[i].featureNode?.tokenFeatureDefinition.featureDefinition.syntaxDefinition.canHaveChildren){
                            this.featureStack.push(<Node.FeatureNode>this.pendingOperations[i].featureNode);
                        }
                    }else{
                        pops.add(this.pendingOperations[i].syntaxType);
                    }
                }

                clearPops();
                this.pendingOperations.splice(0, this.pendingOperations.length);
            }
        }

        public isIn(syntaxType:Syntax.SyntaxType){
            let map = new Map<Syntax.SyntaxType, boolean>();
            for(let i = 0 ; i < this.featureStack.length; i++){
                map.set(this.featureStack[i].tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType, true);
            }
            for(let i = 0 ; i < this.pendingOperations.length; i++){
                map.set(this.pendingOperations[i].syntaxType, this.pendingOperations[i].push);
            }
            return !!map.get(syntaxType);
        }

        public pop(syntaxType:Syntax.SyntaxType){
            this.pendingOperations.push(Node.FeatureNodeOperation.pop(syntaxType));
        }

        public push(featureNode:Node.FeatureNode){
            this.pendingOperations.push(Node.FeatureNodeOperation.push(featureNode));
        }

        public pushOrPopTokenFeatureDefinition(tokenFeatureDefinition:Syntax.TokenFeatureDefinition){
            if(tokenFeatureDefinition.isCloseSequence && tokenFeatureDefinition.isOpenSequence){
                if(this.isInTokenFeatureDefinition(tokenFeatureDefinition)){
                    this.popTokenFeatureDefinition(tokenFeatureDefinition);
                }else{
                    this.pushTokenFeatureDefinition(tokenFeatureDefinition);
                }
            }else if(tokenFeatureDefinition.isOpenSequence){
                this.pushTokenFeatureDefinition(tokenFeatureDefinition);
            }else{
                this.popTokenFeatureDefinition(tokenFeatureDefinition);
            }
        }

        public isInTokenFeatureDefinition(tokenFeatureDefinition:Syntax.TokenFeatureDefinition){
            return this.isIn( tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType);
        }

        public pushTokenFeatureDefinition(tokenFeatureDefinition:Syntax.TokenFeatureDefinition){
            this.push(new Node.FeatureNode(tokenFeatureDefinition));
        }

        public popTokenFeatureDefinition(tokenFeatureDefinition:Syntax.TokenFeatureDefinition){
            this.pop(tokenFeatureDefinition.featureDefinition.syntaxDefinition.syntaxType);
        }

        public endOfMarkdown(){
            this.processPendignOperations();
            console.log("end of markdown", this.featureStack.length);
        }
    }
}