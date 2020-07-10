/// <reference path="Definition/IWidget.ts" />
/// <reference path="Style/Theme.ts" />
/// <reference path="../Serializer/SerializableWidget.ts" />

namespace UIX.WidgetSystem.Widget{
    export class WebpageWidget implements Widget.Definition.IWidget {
        public static tryParse(serializableWidget:Serializer.SerializableWidget){
            if(serializableWidget.widgetType === Serializer.WidgetType.Webpage && serializableWidget.settings && serializableWidget.children && serializableWidget.children.length === 1){
                
                let theme:Style.Theme|undefined;

                try{
                    let settings = JSON.parse(serializableWidget.settings);
                    if(settings && typeof settings === "object"){
                        let parsedTheme = Style.Theme.tryParse(settings.theme);
                        if(parsedTheme){
                            theme = parsedTheme;
                        }
                    }
                }catch(error){}

                let webpageWidget = new WebpageWidget(theme);
                
                if(serializableWidget.children[0]){
                    let parsed = Serializer.SerializableWidget.tryParse(serializableWidget.children[0], webpageWidget);
                    if(parsed){
                        webpageWidget.setBody(parsed);
                    }
                }
                return webpageWidget;
            }
            return null;
        }

        private body:Widget.Definition.Widget|null = null;
        private changed = true;
        private bodyChanged = false;
        private themeChanged = true;
        private requestedAnimationFrame:number|null = null;
        private readonly htmlElement:HTMLElement;
        private readonly styleWrapper:HTMLStyleElement;
        private readonly bodyWrapper:HTMLElement;

        public readonly theme:Style.Theme;
        public readonly id:number;

        public constructor(theme?:Style.Theme){
            this.id = Definition.Widget.getNextId();

            this.htmlElement = Definition.Widget.createWidget(this.id, "uix-webpage");
            this.bodyWrapper = Definition.Widget.createWidgetWrapper();
            this.styleWrapper = document.createElement("style");
            this.htmlElement.appendChild(this.styleWrapper);
            this.htmlElement.appendChild(this.bodyWrapper);
            
            if(theme){
                this.theme = theme;
            }else{
                this.theme = new Style.Theme();
            }

            this.update();
        }

        public setBody(body:Widget.Definition.Widget|null){
            if(this.body !== body){
                this.body = body;
                this.bodyChanged = true;
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

        public toSerializableWidget(){
            let settings = JSON.stringify({
                theme: this.theme
            });
            return new Serializer.SerializableWidget(Serializer.WidgetType.Webpage, [ this.body?.toSerializableWidget() ?? null ], settings);
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

                if(this.themeChanged){
                    this.styleWrapper.innerHTML = this.theme.asCSS("#" + Definition.Widget.getHTMLElementId(this.id));
                    this.themeChanged = false;
                }

                this.changed = false;
            }
            if(this.requestedAnimationFrame !== null){
                cancelAnimationFrame(this.requestedAnimationFrame);
                this.requestedAnimationFrame = null;
            }
            return this.htmlElement;
        }
    }
}