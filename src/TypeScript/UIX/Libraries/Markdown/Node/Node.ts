namespace UIX.Libraries.Markdown.Node{
    export abstract class Node{
        public abstract get isToken():boolean;
        
        public abstract getHTML():string;
        public abstract getText():string;
        public abstract isEmptyOrWhitespace():boolean;
    }
}