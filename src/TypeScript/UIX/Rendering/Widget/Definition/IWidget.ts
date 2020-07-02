/// <reference path="IRenderable.ts" />

namespace UIX.Rendering.Widget.Definition{
    export interface IWidget extends IRenderable{
        childWidgetChanged(widget:Widget):void;
        hasWidgetChanged():boolean;
    }
}