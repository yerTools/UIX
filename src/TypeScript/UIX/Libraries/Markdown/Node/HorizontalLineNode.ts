/// <reference path="Node.ts" />
/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export class HorizontalLineNode extends Node{
        public type:NodeType;

        public constructor(){
            super();
            this.type = NodeType.HorizontalLine;
        }

        public getHTML(){
            return "<hr>";
        }

        public getText(){
            return "\n";
        }

        public isEmptyOrWhitespace(){
            return true;
        }
    }
}