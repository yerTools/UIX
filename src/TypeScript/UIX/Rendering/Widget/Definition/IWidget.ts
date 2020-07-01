/// <reference path="IRenderable.ts" />

namespace UIX.Rendering.Widget.Definition{
    export interface IWidget extends IRenderable{
        childWidgetChanged():void;
        calculateWidget():void;
        hasWidgetChanged():boolean;
    }
}