/// <reference path="NodeType.ts" />

namespace UIX.Libraries.Markdown.Node{
    export abstract class Node{
        public static escapeTextForHTML(text:string){
            let result = "";
            for(let i = 0; i < text.length; i++){
                switch(text[i]){
                    case '&':
                        result += "&amp;";
                        break;
                    case '"':
                        result += "&quot;";
                        break;
                    case '<':
                        result += "&lt;";
                        break;
                    case '>':
                        result += "&gt;";
                        break;
                    case '\'':
                        result += "&#39;";
                        break;
                    case '\n':
                        result += "<br/>";
                        break;
                    default:
                        result += text[i];
                        break;
                }
            }
            return result;
        }

        public abstract type:NodeType;
        
        public abstract getHTML():string;
        public abstract getText():string;
        public abstract isEmptyOrWhitespace():boolean;
    }
}