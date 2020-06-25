/// <reference path="Node.ts" />
/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class TextNode extends Node{
       
        public type:NodeType;
        public text:string;

        public constructor(text:string){
            super();
            this.type = NodeType.Text;
            this.text = text;
        }

        public getHTML(){
            if(this.text){
                return Node.escapeTextForHTML(this.text);
            }
            return "";
        }

        public getText(){
            return this.text;
        }

        public isEmptyOrWhitespace(){
            return !(this.text && this.text.trimStart() !== "");
        }
    }
}