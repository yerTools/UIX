/// <reference path="Node.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class MarkdownContainer{

        public readonly children:Node[] = [];

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