/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="Style/Dimensions.ts" />

namespace UIX.Rendering.Widget{
    export class ListWidget extends Definition.ContainerWidget {
        
        public readonly parent:Definition.IWidget;
        public readonly items:Definition.Widget[] = [];

        public get children(): Definition.Widget[] { return this.items; }
        public get containerWidgetType(): Definition.ContainerWidgetType { return Definition.ContainerWidgetType.List; }

        public constructor(parent:Definition.IWidget){
            super();
            this.parent = parent;
        }

        public parentWidgetChanged(widget:Definition.IWidget):void {
            throw new Error("Method not implemented.");
        }
        public childWidgetChanged(widget:Definition.Widget):void {
            throw new Error("Method not implemented.");
        }
        public hasWidgetChanged():boolean {
            throw new Error("Method not implemented.");
        }
        public render():HTMLElement {
            throw new Error("Method not implemented.");
        }
        public getDimensions(invoker?:Definition.IRenderable):Style.Dimensions|null {
            throw new Error("Method not implemented.");
        }
    }
}