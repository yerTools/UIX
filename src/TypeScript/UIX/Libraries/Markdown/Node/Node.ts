namespace UIX.Libraries.Markdown.Node{
    export abstract class Node{
        public static escapeTextForHTML(text:string){
            let result = "";
            let lastWasSpace = false;
            for(let i = 0; i < text.length; i++){
                switch(text[i]){
                    case '&':
                        result += "&amp;";
                        if(lastWasSpace){
                            lastWasSpace = false;
                        }
                        break;
                    case '"':
                        result += "&quot;";
                        if(lastWasSpace){
                            lastWasSpace = false;
                        }
                        break;
                    case '<':
                        result += "&lt;";
                        if(lastWasSpace){
                            lastWasSpace = false;
                        }
                        break;
                    case '>':
                        result += "&gt;";
                        if(lastWasSpace){
                            lastWasSpace = false;
                        }
                        break;
                    case '\'':
                        result += "&#39;";
                        if(lastWasSpace){
                            lastWasSpace = false;
                        }
                        break;
                    case '\n':
                        result += "<br/>";
                        if(!lastWasSpace){
                            lastWasSpace = true;
                        }
                        break;
                    case ' ':
                        if(lastWasSpace){
                            result += "&nbsp;";
                        }else{
                            result += " ";
                        }
                        lastWasSpace = !lastWasSpace;
                        break;
                    default:
                        result += text[i];
                        if(lastWasSpace){
                            lastWasSpace = false;
                        }
                        break;
                }
            }
            return result;
        }

        public abstract get isToken():boolean;
        
        public abstract getHTML():string;
        public abstract getText():string;
        public abstract isEmptyOrWhitespace():boolean;
    }
}