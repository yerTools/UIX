/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="Style/Dimensions.ts" />

namespace UIX.Rendering.Widget{
    export class HorizontalDividerWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;

        private topChild:Definition.Widget|null = null;
        private bottomChild:Definition.Widget|null = null;

        public get children(): Definition.Widget[] { 
            if(this.topChild && this.bottomChild){
                return [this.topChild, this.bottomChild];
            }else if(this.topChild){
                return [this.topChild];
            }else if(this.bottomChild){
                return [this.bottomChild];
            }else{
                return [];
            }
        }
        public get containerWidgetType(): Definition.ContainerWidgetType { return Definition.ContainerWidgetType.HorizontalDivider; }

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