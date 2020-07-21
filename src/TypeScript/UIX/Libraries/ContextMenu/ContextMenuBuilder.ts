namespace UIX.Libraries.ContextMenu{
    export type BuilderSyncCallback = ((this:ContextMenuBuilder, builder:ContextMenuBuilder) => ContextItem|ContextItem[])|ContextItem|ContextItem[];
    export type BuilderCallback = ((this:ContextMenuBuilder, builder:ContextMenuBuilder) => ContextItem|ContextItem[]|AsyncContextItems<any>)|ContextItem|ContextItem[]|AsyncContextItems<any>;

    export class ContextMenuBuilder{
        public static readonly builder = new ContextMenuBuilder();

        public static get(children:BuilderCallback){
            if(typeof children === "function"){
                children = children.call(this.builder, this.builder);
            }
            if(children){
                if(children instanceof AsyncContextItems){
                    return children;
                }
                if(!Array.isArray(children)){
                    children = [children];
                }
                return children;
            }
            return [];
        }

        public static getSync(children:BuilderSyncCallback){
            if(typeof children === "function"){
                children = children.call(this.builder, this.builder);
            }
            if(children){
                if(!Array.isArray(children)){
                    children = [children];
                }
                return children;
            }
            return [];
        }

        public item(name:string, onClick:OnItemClickCallback, greyedOut = false){
            return ContextItem.create(name, onClick, greyedOut);
        }

        public greyedOutItem(name:string){
            return ContextItem.createGreyedOut(name);
        }

        public placeholder(name?:string){
            return ContextItem.createPlaceholder(name);
        }

        public group(children:BuilderSyncCallback){
            return ContextItem.createGroup(ContextMenuBuilder.getSync(children));
        }

        public subMenu(name:string, children:BuilderCallback, greyedOut = false){
            return ContextItem.createSubMenu(name, ContextMenuBuilder.get(children), greyedOut);
        }
    }
}