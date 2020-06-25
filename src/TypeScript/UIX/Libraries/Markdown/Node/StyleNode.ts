/// <reference path="ContainerNode.ts" />
/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class StyleNode extends ContainerNode{
        public type:NodeType;
        public readonly children:Node[] = [];

        public constructor(){
            super();
            this.type = NodeType.Style;
        }
        
        public getHTML(className = ""){
            let result = "<span" + (className ? " class=\"" + className + "\"" : "") + ">";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getHTML();
            }

            return result + "</span>";
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