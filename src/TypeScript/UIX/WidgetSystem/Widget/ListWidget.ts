/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="Style/Dimensions.ts" />

namespace UIX.WidgetSystem.Widget{
    export class ListWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;
        public readonly id:number;

        private changed = true;
        private readonly childChanged:boolean[] = [];
        private readonly _children:(Definition.Widget|null)[] = [];
        private readonly htmlElement:HTMLElement;
        private readonly childrenWrapper:HTMLElement[] = [];
        private readonly childrenWrapperAppended:boolean[] = [];

        public get children():Definition.Widget[] {
            let children:Definition.Widget[] = [];
            for(let i = 0; i < this._children.length; i++){
                if(this._children[i]){
                    children.push(<Definition.Widget>this._children[i]);
                }
            }
            return children;
        }
        
        public get containerWidgetType(): Definition.ContainerWidgetType { return Definition.ContainerWidgetType.List; }

        public constructor(parent:Definition.IWidget){
            super();
            this.id = Definition.Widget.getNextId();

            this.parent = parent;
            this.htmlElement = Definition.Widget.createWidget(this.id, "list");
        }

        public addChild(child:Definition.Widget, index?:number){
            if(!this.isParent(child)){
                if(index !== undefined){
                    if(index < 0){
                        index = 0;
                    }
                    for(let i = 0; index < this._children.length && i < index && i < this._children.length; i++){
                        if(!this._children[i]){
                            index++;
                        }
                    }
                }

                if(index === undefined || index >= this._children.length){
                    this._children.push(child);
                    this.childChanged.push(true);
                    this.childrenWrapper.push(Definition.Widget.createWidgetWrapper());
                    this.childrenWrapperAppended.push(false);
                }else{
                    this._children.splice(index, 0, child);
                    this.childChanged.splice(index, 0, true);
                    this.childrenWrapper.splice(index, 0, Definition.Widget.createWidgetWrapper());
                    this.childrenWrapperAppended.splice(index, 0, false);
                }
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public removeChild(index:number){
            if(!this._children.length){
                return;
            }

            if(index < 0){
                index = 0;
            }

            for(let i = 0; i < index && i < this._children.length && index < this._children.length - 1; i++){
                if(!this._children[i]){
                    index++;
                }
            }

            if(index >= this._children.length){
                index = this._children.length - 1;
            }

            if(this._children[index]){
                if(this.childrenWrapperAppended[index]){
                    this._children[index] = null;
                    this.childChanged[index] = true;
                }else{
                    this._children.splice(index, 1);
                    this.childChanged.splice(index, 1);
                    this.childrenWrapper.splice(index, 1);
                    this.childrenWrapperAppended.splice(index, 1);
                }
            }

            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public toSerializableWidget(){
            let children:Serializer.SerializableWidget[] = [];
            for(let i = 0; i < this._children.length; i++){
                if(this._children[i]){
                    children.push((<Definition.Widget>this._children[i]).toSerializableWidget());
                }
            }
            return new Serializer.SerializableWidget(Serializer.WidgetType.List, children);
        }

        public parentWidgetChanged(widget:Definition.IWidget){
            for(let i = 0; i < this._children.length; i++){
                if(this._children[i]){
                    (<Definition.Widget>this._children[i]).parentWidgetChanged(widget);
                }
            }
        }

        public childWidgetChanged(widget:Definition.Widget){
            this.changed = true;
            this.parent.childWidgetChanged(widget);
        }

        public hasWidgetChanged(){
            return this.changed;
        }

        public isParent(widget:Definition.Widget):boolean{
            return widget === this || this.parent.isParent(widget);
        };

        public render(){
            if(this.changed){
                for(let i = 0; i < this._children.length; i++){
                    if(this.childChanged[i]){
                        if(this._children[i]){
                            if(!this.childrenWrapperAppended[i]){
                                if(i + 1 < this.htmlElement.children.length){
                                    this.htmlElement.insertBefore(this.childrenWrapper[i], this.htmlElement.children[i + 1]);
                                }else{
                                    this.htmlElement.appendChild(this.childrenWrapper[i]);
                                }
                                this.childrenWrapperAppended[i] = true;
                            }

                            if(this.childrenWrapper[i].lastChild){
                                this.childrenWrapper[i].removeChild(<ChildNode>this.childrenWrapper[i].lastChild);
                            }
                            this.childrenWrapper[i].appendChild((<Definition.Widget>this._children[i]).render());
                            this.childChanged[i] = false;
                        }else{
                            this.htmlElement.removeChild(this.childrenWrapper[i]);
                            this._children.splice(i, 1);
                            this.childChanged.splice(i, 1);
                            this.childrenWrapper.splice(i, 1);
                            this.childrenWrapperAppended.splice(i, 1);
                            --i;
                        }
                    }
                }
                this.changed = false;
            }
            return this.htmlElement;
        }

        public getDimensions(invoker?:Definition.IRenderable):Style.Dimensions|null {
            throw new Error("Method not implemented.");
        }
    }

    Serializer.SerializableWidget.register(Serializer.WidgetType.List, (serializableWidget, parent) => {
        if(serializableWidget.children){
            let listWidget = new ListWidget(parent);
            for(let i = 0; i < serializableWidget.children.length; i++){
                if(serializableWidget.children[i]){
                    let parsed = Serializer.SerializableWidget.tryParse(<Serializer.SerializableWidget>serializableWidget.children[i], listWidget);
                    if(parsed){
                        listWidget.addChild(parsed);
                    }
                }
            }
            return listWidget;
        }
        return null;
    });
}