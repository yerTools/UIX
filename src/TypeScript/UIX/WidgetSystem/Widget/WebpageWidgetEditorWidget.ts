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

            this.webpageWrapper.addEventListener("mousemove", event => this.mouseMoved(event), { passive: true });
            this.webpageWrapper.addEventListener("mouseleave", event => this.mouseMoved(), { passive: true });
            this.webpageWrapper.addEventListener("click", event => this.clicked(event));

            this.htmlElement.appendChild(this.webpageWrapper);

            this.update();
        }

        private clicked(mouseEvent:MouseEvent){
            let clickedElement = this.mouseMoved(mouseEvent);
            if(clickedElement){
                mouseEvent.preventDefault();

                let idString = clickedElement.id;
                if(idString){
                    let widget = Definition.Widget.getById(parseInt(idString.substring(idString.indexOf("-") + 1)));
                    if(widget){
                        console.log(Builder.WidgetBuilder.tryParse(widget));
                    }
                }

            }
        }

        private mouseMoved(mouseEvent?:MouseEvent){
            let currentHighlighted = this.webpageWrapper.querySelector(".uix.widget.hover-highlight");
            let highlightElement:Element|undefined;
            if(mouseEvent){
                let currentElement = <Element|null>mouseEvent.target; 
                while(currentElement){
                    if(currentElement.classList.contains("uix") && currentElement.classList.contains("widget")){
                        if(!currentElement.classList.contains("uix-webpage-editor") && !currentElement.classList.contains("uix-webpage")){
                            highlightElement = currentElement;
                        }
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }
            }

            if(currentHighlighted){
                if(currentHighlighted !== highlightElement){
                    currentHighlighted.classList.remove("hover-highlight");
                    if(highlightElement){
                        highlightElement.classList.add("hover-highlight");
                    }
                }
            }else if(highlightElement){
                highlightElement.classList.add("hover-highlight");
            }
            return highlightElement;
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