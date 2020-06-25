/// <reference path="Node/MarkdownNode.ts" />
/// <reference path="Node/ContainerNode.ts" />
/// <reference path="Node/Node.ts" />
/// <reference path="Node/NodeType.ts" />
/// <reference path="Node/ParagraphNode.ts" />
/// <reference path="Node/StyleNode.ts" />
/// <reference path="Node/TextNode.ts" />
/// <reference path="Node/SimpleContainerNode.ts" />
/// <reference path="MarkdownParserState.ts" />

namespace UIX.Libraries.Markdown{
    export class ContainerStack{
        public readonly markdownNode = new Node.MarkdownNode();
        public readonly containerStack:Node.ContainerNode[] = [];
        public readonly markdownParserState:MarkdownParserState;

        public constructor(markdownParserState:MarkdownParserState){
            this.markdownParserState = markdownParserState;
        }

        public pushText(text:string){
            let container:Node.ContainerNode;
            if(this.containerStack.length === 0){
                container = this.add(Node.NodeType.Paragraph);
            }else{
                container = this.containerStack[this.containerStack.length - 1];
            }
            container.children.push(new Node.TextNode(text));
        }

        public pushNodeIntoTop(node:Node.Node, containerNodeType?:Node.NodeType){
            this.get(containerNodeType).children.push(node);
        }

        public pushNodeIntoNew(containerNodeType:Node.NodeType, node:Node.Node){
            this.add(containerNodeType).children.push(node);
        }

        public get(containerNodeType?:Node.NodeType){
            let container = this.containerStack.length === 0 ? <Node.ContainerNode>this.markdownNode : this.containerStack[this.containerStack.length - 1];

            if(containerNodeType === undefined || container.type === containerNodeType){
                return container;
            }

            return this.add(containerNodeType);
        }

        public add(containerNodeType:Node.NodeType){
            let container:Node.ContainerNode;

            switch(containerNodeType){
                case Node.NodeType.Paragraph:
                    container = new Node.ParagraphNode();
                    break;
                case Node.NodeType.Style:
                    container = new Node.StyleNode();
                    break;
                default:
                    container = new Node.SimpleContainerNode();
                    break
            }

            return this.addContainerNode(container);
        }

        public addContainerNode(containerNode:Node.ContainerNode){
            this.markdownParserState.currentContainerType = containerNode.type;

            (this.containerStack.length === 0 ? this.markdownNode : this.containerStack[this.containerStack.length - 1]).children.push(containerNode);
            this.containerStack.push(containerNode);
            return containerNode;
        }

        public pop(){
            let container:Node.ContainerNode;

            if(this.containerStack.length === 0){
                container = this.markdownNode;
                this.markdownParserState.currentContainerType = Node.NodeType.Markdown;
            }else{
                container = this.containerStack[this.containerStack.length - 1];
                this.containerStack.pop();
                this.markdownParserState.currentContainerType = this.containerStack.length === 0 ? Node.NodeType.Markdown : this.containerStack[this.containerStack.length - 1].type;
            }

            return container;
        }

        public popUntil(containerNodeType:Node.NodeType){
            let container:Node.ContainerNode;

            do{
                container = this.pop();
            }while(container.type !== Node.NodeType.Markdown && container.type !== containerNodeType);

            return container;
        }

        public clear(){
            this.containerStack.splice(0, this.containerStack.length);
            this.markdownParserState.currentContainerType = Node.NodeType.Markdown;
            return this.markdownNode;
        }

        public lastContainer(){
            let container = this.containerStack.length === 0 ? <Node.ContainerNode>this.markdownNode : this.containerStack[this.containerStack.length - 1];
            while(container.children.length > 0){
                let child = container.children[container.children.length - 1];
                if(Node.ContainerNode.isContainerNode(child)){
                    container = child;
                }else{
                    return container;
                }
            }
            return container;
        }

        public lastNode(){
            let container = this.lastContainer();
            if(container.children.length !== 0){
                return container.children[container.children.length - 1];
            }
            return <Node.Node> container; 
        }

        public isIn(containerNodeType:Node.NodeType){
            if(containerNodeType === Node.NodeType.Markdown){
                return true;
            }else if(this.containerStack.length === 0){
                return false;
            }

            for(let i = this.containerStack.length - 1; i !== -1; --i){
                if(this.containerStack[i].type === containerNodeType){
                    return true;
                }
            }

            return false;
        }
    }
}