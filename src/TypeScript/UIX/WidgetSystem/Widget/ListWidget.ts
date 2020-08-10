/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="../Helper/WidgetList.ts" />

namespace UIX.WidgetSystem.Widget{
    export class ListWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;
        public readonly id:number;

        private changed = true;
        private readonly htmlElement:HTMLElement;
        private readonly widgetList = new Helper.WidgetList();

        public get children():Definition.Widget[] {
            return this.widgetList.getChildren();
        }
        
        public get containerWidgetType(){ return Definition.ContainerWidgetType.List; }
        public get serializableWidgetType(){ return  Serializer.WidgetType.List; }

        public constructor(parent:Definition.IWidget){
            super();
            this.id = Definition.Widget.getNextId(this);

            this.parent = parent;
            this.htmlElement = Definition.Widget.createWidget(this.id, "list");
        }

        public addChild(child:Definition.Widget, index?:number){
            if(!this.isParent(child)){
                this.widgetList.addChild(child, index);
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public removeChild(index:number){
            if(!this.widgetList.removeChild(index)){
                return;
            }

            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public toSerializableWidget(){
            let children:Serializer.SerializableWidget[] = [];
            for(let i = 0; i < this.widgetList.children.length; i++){
                if(this.widgetList.children[i]){
                    children.push((<Definition.Widget>this.widgetList.children[i]).toSerializableWidget());
                }
            }
            return new Serializer.SerializableWidget(this.serializableWidgetType, children);
        }

        public parentWidgetChanged(widget:Definition.IWidget){
            for(let i = 0; i < this.widgetList.children.length; i++){
                if(this.widgetList.children[i]){
                    (<Definition.Widget>this.widgetList.children[i]).parentWidgetChanged(widget);
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
                this.widgetList.render(this.htmlElement);
                this.changed = false;
            }
            return this.htmlElement;
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