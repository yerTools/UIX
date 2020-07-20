namespace UIX.Libraries.ContextMenu{
    export type OnItemClickCallback = (this:ContextItem, mouseEvent:MouseEvent, contextMenu:ContextMenu, contextItem:ContextItem)=>void;

    export class ContextItem{

        public static create(name:string, onClick:OnItemClickCallback, greyedOut = false){
            return new ContextItem(greyedOut, name, undefined, onClick);
        }

        public static createGreyedOut(name:string){
            return new ContextItem(true, name, undefined, undefined);
        }

        public static createPlaceholder(name?:string, onClick?:OnItemClickCallback){
            return new ContextItem(false, name, undefined, onClick);
        }

        public static createGroup(items:ContextItem[]|AsyncContextItems<any>){
            return new ContextItem(false, undefined, items);
        }

        public static createSubMenu(name:string, items:ContextItem[]|AsyncContextItems<any>, greyedOut = false){
            return new ContextItem(greyedOut, name, items);
        }

        private children?:ContextItem[]|AsyncContextItems<any>;
        public readonly name?:string
        public readonly onClick?:OnItemClickCallback;
        public readonly greyedOut:boolean;

        public get isGroup(){
            return !!this.children && !this.name;
        }

        public get hasChildren(){
            return !!this.children;
        }
        
        private constructor(greyedOut:boolean, name?:string, children?:ContextItem[]|AsyncContextItems<any>, onClick?:OnItemClickCallback){
            this.greyedOut = greyedOut;
            this.name = name;
            if(children && (!Array.isArray(children) || children.length)){
                this.children = children;
            }
            this.onClick = onClick;
        }

        public getChildren(contextMenu:ContextMenu, mouseEvent:MouseEvent){
            if(this.children){
                if(Array.isArray(this.children)){
                    return this.children;
                }
                return this.children.invoke(contextMenu, this, mouseEvent);
            }
            return undefined;
        }
    }
}