/// <reference path="ContainerNode.ts" />
/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class HeaderNode extends ContainerNode{
        public type:NodeType;
        public readonly children:Node[] = [];
        public headerNumber:number;

        public constructor(headerNumber:number){
            super();
            this.type = NodeType.Header;
            this.headerNumber = headerNumber;
        }
        
        public getHTML(className = ""){
            let result = "<h" + this.headerNumber + (className ? " class=\"" + className + "\"" : "") + ">";

            for(let i = 0; i < this.children.length; i++){
                result += this.children[i].getHTML();
            }

            return result + "</h" + this.headerNumber + ">";
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