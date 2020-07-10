/// <reference path="IRenderable.ts" />

namespace UIX.WidgetSystem.Widget.Definition{
    export interface IWidget extends IRenderable{
        readonly id:number;
        childWidgetChanged(widget:Widget):void;
        hasWidgetChanged():boolean;
        isParent(widget:Widget):boolean;
    }
}