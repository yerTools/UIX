namespace UIX.Libraries.ContextMenu{
    export type OnItemInteractionCallback = (this:ContextItem, mouseEvent:MouseEvent, contextMenu:ContextMenu, contextItem:ContextItem, htmlElement:HTMLElement)=>void;

    export class ContextItem{

        public static create(name:string, onClick:OnItemInteractionCallback, onHover?:OnItemInteractionCallback, greyedOut = false){
            return new ContextItem(greyedOut, name, undefined, onClick, onHover);
        }

        public static createGreyedOut(name:string, onHover?:OnItemInteractionCallback){
            return new ContextItem(true, name, undefined, undefined, onHover);
        }

        public static createPlaceholder(name?:string, onHover?:OnItemInteractionCallback){
            return new ContextItem(false, name, undefined, undefined, onHover);
        }

        public static createGroup(items:ContextItem[]){
            return new ContextItem(false, undefined, items);
        }

        public static createSubMenu(name:string, items:ContextItem[]|AsyncContextItems<any>, onHover?:OnItemInteractionCallback, greyedOut = false){
            return new ContextItem(greyedOut, name, items, undefined, onHover);
        }

        private children?:ContextItem[]|AsyncContextItems<any>;
        public readonly name?:string
        public readonly onClick?:OnItemInteractionCallback;
        public readonly onHover?:OnItemInteractionCallback;
        public readonly greyedOut:boolean;

        public get isGroup(){
            return !this.name && this.hasChildren;
        }

        public get isPlaceholder(){
            return !this.onClick && !this.hasChildren && !this.greyedOut;
        }

        public get hasChildren(){
            return !!this.children && !this.greyedOut;
        }

        public get isSubMenu(){
            return !!this.name && this.hasChildren;
        }
        
        private constructor(greyedOut:boolean, name?:string, children?:ContextItem[]|AsyncContextItems<any>, onClick?:OnItemInteractionCallback, onHover?:OnItemInteractionCallback){
            this.greyedOut = greyedOut;
            this.name = name;
            if(children){
                if(!Array.isArray(children) || children.length || !name){
                    this.children = children;
                }else{
                    this.greyedOut = true;
                }
            }
            this.onClick = onClick;
            this.onHover = onHover;
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