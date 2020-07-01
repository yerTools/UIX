/// <reference path="IWidget.ts" />
/// <reference path="WidgetType.ts" />

namespace UIX.Rendering.Widget.Definition{
    export abstract class Widget implements IWidget{
        public abstract readonly parent:IWidget;

        public abstract get widgetType():WidgetType;

        public abstract parentWidgetChanged():void;
        public abstract childWidgetChanged():void;
        public abstract calculateWidget():void;
        public abstract hasWidgetChanged():boolean;
        public abstract render():void;
        public abstract getDimensions(invoker?:IRenderable):Style.Dimensions|null;
    }
}