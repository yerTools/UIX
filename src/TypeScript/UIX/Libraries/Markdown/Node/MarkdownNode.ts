/// <reference path="ContainerNode.ts" />
/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class MarkdownNode extends ContainerNode{
        public type:NodeType;
        public readonly children:Node[] = [];

        public constructor(){
            super();
            this.type = NodeType.Markdown;
        }

        public getHTML(className = "uix-markdown"){
            let result = "<div" + (className ? " class=\"" + className + "\"" : "") + ">";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getHTML();
            }

            return result + "</div>";
        }

        public getText(){
            let result = "";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getText();
            }

            return result.trim();
        }
    }
}