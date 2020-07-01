/// <reference path="Definition/IWidget.ts" />
/// <reference path="Style/Dimensions.ts" />

namespace UIX.Rendering.Widget{
    export class WebpageWidget implements Widget.Definition.IWidget {
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