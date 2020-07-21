namespace UIX.Libraries.ContextMenu{
    export type AsyncContextItemsCallback<T> = (this:ContextMenu, parent:ContextItem|undefined, mouseEvent:MouseEvent, state?:T) => ContextItem|ContextItem[]|Promise<ContextItem[]>;

    export class AsyncContextItems<T>{
        public readonly callback:AsyncContextItemsCallback<T>;
        public readonly state?:T;

        public constructor(callback:AsyncContextItemsCallback<T>, state?:T){
            this.callback = callback;
            this.state = state;
        }

        public invoke(contextMenu:ContextMenu, parent:ContextItem|undefined, mouseEvent:MouseEvent){
            let result = this.callback.call(contextMenu, parent, mouseEvent, this.state);
            if(!Array.isArray(result)){
                if(result instanceof ContextItem){
                    return [result];
                }
                return result;
            }
            return result;
        }
    }
}