/// <reference path="Definition/IWidget.ts" />
/// <reference path="Style/Dimensions.ts" />

namespace UIX.WidgetSystem.Widget{
    export class WebpageWidgetEditorWidget implements Widget.Definition.IWidget {
        
        private webpageWidget:WebpageWidget|null = null;
        private changed = true;
        private webpageWidgetChanged = false;
        private requestedAnimationFrame:number|null = null;
        private readonly htmlElement:HTMLElement;
        private readonly webpageWrapper:HTMLElement;

        public readonly id:number;

        public constructor(){
            this.id = Definition.Widget.getNextId();

            this.htmlElement = Definition.Widget.createWidget(this.id, "uix-webpage-editor");
            this.webpageWrapper = Definition.Widget.createWidgetWrapper("webpage-wrapper");
            this.htmlElement.appendChild(this.webpageWrapper);

            this.update();
        }

        public setWebpageWidget(webpageWidget:WebpageWidget|null){
            if(this.webpageWidget !== webpageWidget){
                this.webpageWidget = webpageWidget;
                this.webpageWidgetChanged = true;
                this.update();
            }
        }

        public update(){
            this.changed = true;
            if(this.requestedAnimationFrame === null){
                this.requestedAnimationFrame = requestAnimationFrame(() => {
                    this.requestedAnimationFrame = null;
                    this.render();
                });
            }
        }

        public childWidgetChanged(widget:Definition.Widget):void {
            this.update();
        }

        public hasWidgetChanged(){
            return this.changed;
        }

        public isParent(){
            return false;
        };

        public render():HTMLElement {
            if(this.changed){
                if(this.webpageWidgetChanged){
                    if(this.webpageWrapper.lastChild){
                        this.webpageWrapper.removeChild(this.webpageWrapper.lastChild);
                    }
                    if(this.webpageWidget){
                        this.webpageWrapper.appendChild(this.webpageWidget.render());
                    }
                    this.webpageWidgetChanged = false;
                }

                this.changed = false;
            }
            if(this.requestedAnimationFrame !== null){
                cancelAnimationFrame(this.requestedAnimationFrame);
                this.requestedAnimationFrame = null;
            }
            return this.htmlElement;
        }

        public getDimensions(invoker?:Definition.IRenderable):Style.Dimensions|null {
            throw new Error("Method not implemented.");
        }
    }
}