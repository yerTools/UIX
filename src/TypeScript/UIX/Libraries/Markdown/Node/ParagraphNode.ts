/// <reference path="ContainerNode.ts" />
/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class ParagraphNode extends ContainerNode{
        public type:NodeType;
        public readonly children:Node[] = [];

        public constructor(){
            super();
            this.type = NodeType.Paragraph;
        }

        public getHTML(className = ""){
            if(this.isEmptyOrWhitespace()){
                return "<br/>";
            }

            let result = "<p" + (className ? " class=\"" + className + "\"" : "") + ">";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getHTML();
            }

            return result + "</p>";
        }

        public getText(){
            if(this.isEmptyOrWhitespace()){
                return "\n";
            }

            let result = "";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getText();
            }

            return result + "\n\n";
        }
    }
}