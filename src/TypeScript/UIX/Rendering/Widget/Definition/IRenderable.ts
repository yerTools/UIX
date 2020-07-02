/// <reference path="../Style/Dimensions.ts" />

namespace UIX.Rendering.Widget.Definition{
    export interface IRenderable {
        render():HTMLElement;
        getDimensions(invoker?:IRenderable):Style.Dimensions|null;
    }
}