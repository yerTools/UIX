/// <reference path="IRenderable.ts" />
/// <reference path="../../Serializer/SerializableWidget.ts" />

namespace UIX.WidgetSystem.Widget.Definition{
    export interface IWidget extends IRenderable{
        readonly id:number;
        toSerializableWidget():WidgetSystem.Serializer.SerializableWidget;
        childWidgetChanged(widget:Widget):void;
        hasWidgetChanged():boolean;
        isParent(widget:Widget):boolean;
    }
}