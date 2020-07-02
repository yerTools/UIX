/// <reference path="Definition/IWidget.ts" />
/// <reference path="Style/Dimensions.ts" />

namespace UIX.Rendering.Widget{
    export class WebpageWidget implements Widget.Definition.IWidget {
        private body:Widget.Definition.Widget|null = null;
        private changed = true;
        private bodyChanged = false;
        private requestedAnimationFrame:number|null = null;
        private readonly htmlElement:HTMLElement;
        private readonly bodyWrapper:HTMLElement;

        public constructor(){
            this.htmlElement = Definition.Widget.createWidget("uix-webpage");
            this.bodyWrapper = Definition.Widget.createWidgetWrapper();
            this.htmlElement.appendChild(this.bodyWrapper);
        }

        public setBody(body:Widget.Definition.Widget|null){
            if(this.body !== body){
                this.body = body;
                this.changed = true;
                this.bodyChanged = true;
            }
        }

        public childWidgetChanged(widget:Definition.Widget):void {
            this.changed = true;
            if(this.requestedAnimationFrame === null){
                this.requestedAnimationFrame = requestAnimationFrame(() => {
                    this.requestedAnimationFrame = null;
                    this.render();
                });
            }
        }

        public hasWidgetChanged(){
            return this.changed;
        }

        public render():HTMLElement {
            if(this.changed){
                let bodyHTMLElement:HTMLElement|null;
                if(this.body){
                    bodyHTMLElement = this.body.render();
                }else{
                    bodyHTMLElement = null;
                }

                if(this.bodyChanged){
                    if(this.bodyWrapper.lastChild){
                        this.bodyWrapper.removeChild(this.bodyWrapper.lastChild);
                    }
                    if(bodyHTMLElement){
                        this.bodyWrapper.appendChild(bodyHTMLElement);
                    }
                    this.bodyChanged = false;
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