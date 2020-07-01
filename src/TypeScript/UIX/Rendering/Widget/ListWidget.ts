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

        public parentWidgetChanged(): void {
            throw new Error("Method not implemented.");
        }
        public childWidgetChanged(): void {
            throw new Error("Method not implemented.");
        }
        public calculateWidget(): void {
            throw new Error("Method not implemented.");
        }
        public hasWidgetChanged(): boolean {
            throw new Error("Method not implemented.");
        }
        public render(): void {
            throw new Error("Method not implemented.");
        }
        public getDimensions(invoker?:Definition.IRenderable):Style.Dimensions|null {
            throw new Error("Method not implemented.");
        }
    }
}