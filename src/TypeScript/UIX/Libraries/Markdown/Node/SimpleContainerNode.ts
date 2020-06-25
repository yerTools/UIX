/// <reference path="ContainerNode.ts" />
/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class SimpleContainerNode extends ContainerNode{
        public type:NodeType;
        public readonly children:Node[] = [];

        public constructor(){
            super();
            this.type = NodeType.SimpleContainer;
        }

        public getHTML(){
            let result = "";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getHTML();
            }

            return result;
        }

        public getText(){
            let result = "";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getText();
            }

            return result;
        }
    }
}