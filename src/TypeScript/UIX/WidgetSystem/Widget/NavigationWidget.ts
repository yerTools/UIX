/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="../Helper/WidgetList.ts" />

namespace UIX.WidgetSystem.Widget{
    export class NavigationWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;
        public readonly id:number;

        private changed = true;
        private readonly htmlElement:HTMLElement;
        private readonly leftAlignedWidgets = new Helper.WidgetList();
        private readonly rightAlignedWidgets = new Helper.WidgetList();

        public get leftAlignedChildren():Definition.Widget[] {
            return this.leftAlignedWidgets.getChildren();
        }
        
        public get rightAlignedChildren():Definition.Widget[] {
            return this.rightAlignedWidgets.getChildren();
        }

        public get children():Definition.Widget[] {
            return this.leftAlignedWidgets.getChildren().concat(this.rightAlignedWidgets.getChildren());
        }

        public get containerWidgetType(){ return Definition.ContainerWidgetType.Navigation; }
        public get serializableWidgetType(){ return  Serializer.WidgetType.Navigation; }

        public constructor(parent:Definition.IWidget){
            super();
            this.id = Definition.Widget.getNextId(this);

            this.parent = parent;
            this.htmlElement = Definition.Widget.createWidget(this.id, "navigation");
        }

        public addLeftAlignedChild(child:Definition.Widget, index?:number){
            if(!this.isParent(child)){
                this.leftAlignedWidgets.addChild(child, index, "left-aligned");
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public addRightAlignedChild(child:Definition.Widget, index?:number){
            if(!this.isParent(child)){
                this.rightAlignedWidgets.addChild(child, index, "right-aligned");
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public removeLeftAlignedChild(index:number){
            if(!this.leftAlignedWidgets.removeChild(index)){
                return;
            }

            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public removeRightAlignedChild(index:number){
            if(!this.rightAlignedWidgets.removeChild(index)){
                return;
            }

            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public toSerializableWidget(){
            let children:(Serializer.SerializableWidget|null)[] = [];
            for(let i = 0; i < this.leftAlignedWidgets.children.length; i++){
                if(this.leftAlignedWidgets.children[i]){
                    children.push((<Definition.Widget>this.leftAlignedWidgets.children[i]).toSerializableWidget());
                }
            }
            children.push(null);
            for(let i = 0; i < this.rightAlignedWidgets.children.length; i++){
                if(this.rightAlignedWidgets.children[i]){
                    children.push((<Definition.Widget>this.rightAlignedWidgets.children[i]).toSerializableWidget());
                }
            }
            return new Serializer.SerializableWidget(this.serializableWidgetType, children);
        }

        public parentWidgetChanged(widget:Definition.IWidget){
            for(let i = 0; i < this.leftAlignedWidgets.children.length; i++){
                if(this.leftAlignedWidgets.children[i]){
                    (<Definition.Widget>this.leftAlignedWidgets.children[i]).parentWidgetChanged(widget);
                }
            }
            for(let i = 0; i < this.rightAlignedWidgets.children.length; i++){
                if(this.rightAlignedWidgets.children[i]){
                    (<Definition.Widget>this.rightAlignedWidgets.children[i]).parentWidgetChanged(widget);
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
                this.leftAlignedWidgets.render(this.htmlElement);
                this.rightAlignedWidgets.render(this.htmlElement);
                this.changed = false;
            }
            return this.htmlElement;
        }
    }

    Serializer.SerializableWidget.register(Serializer.WidgetType.Navigation, (serializableWidget, parent) => {
        if(serializableWidget.children){
            let navigationWidget = new NavigationWidget(parent);
            let leftAligned = true;
            for(let i = 0; i < serializableWidget.children.length; i++){
                if(serializableWidget.children[i]){
                    let parsed = Serializer.SerializableWidget.tryParse(<Serializer.SerializableWidget>serializableWidget.children[i], navigationWidget);
                    if(parsed){
                        if(leftAligned){
                            navigationWidget.addLeftAlignedChild(parsed);
                        }else{
                            navigationWidget.addRightAlignedChild(parsed);
                        }
                    }
                }else{
                    leftAligned = false;
                }
            }
            return navigationWidget;
        }
        return null;
    });
}