/// <reference path="IWidget.ts" />
/// <reference path="WidgetType.ts" />
/// <reference path="../../Serializer/SerializableWidget.ts" />

namespace UIX.WidgetSystem.Widget.Definition{
    export abstract class Widget implements IWidget{
        public static createWidget(name?:string){
            let div = document.createElement("div");
            div.className = "uix widget";
            if(name){
                div.classList.add(name);
            }
            return div;
        }

        public static createWidgetWrapper(name?:string){
            let div = document.createElement("div");
            div.className = "uix wrapper";
            if(name){
                div.classList.add(name);
            }
            return div;
        }

        public abstract readonly parent:IWidget;

        public abstract get widgetType():WidgetType;

        public abstract toSerializableWidget():WidgetSystem.Serializer.SerializableWidget;
        public abstract parentWidgetChanged(widget:IWidget):void;
        public abstract childWidgetChanged(widget:Widget):void;
        public abstract hasWidgetChanged():boolean;
        public abstract isParent(widget:Widget):boolean;
        public abstract render():HTMLElement;
        public abstract getDimensions(invoker?:IRenderable):Style.Dimensions|null;
    }
}