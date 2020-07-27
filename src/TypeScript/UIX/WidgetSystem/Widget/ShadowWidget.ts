/// <reference path="Definition/Widget.ts" />
/// <reference path="Definition/WidgetType.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="../../Libraries/Markdown/MarkdownParser.ts" />

namespace UIX.WidgetSystem.Widget{
    export class ShadowWidget extends Definition.Widget {
        public get widgetType(){ return Definition.WidgetType.Shadow; };
        public get serializableWidgetType(){ return  Serializer.WidgetType.Shadow; }

        public readonly htmlElement:HTMLElement;

        public readonly parent:Definition.IWidget;
        public readonly id:number;

        private childWidget:Definition.IWidget|null = null;
        private childWidgetIsWidget = false;

        private changed = true;
        private childChanged = false;
        private lastChildHtmlElement:undefined|HTMLElement;

        public constructor(parent:Definition.IWidget, childWrapper:HTMLElement){
            super();
            this.parent = parent;
            this.id = Definition.Widget.getNextId(this);
            
            this.htmlElement = childWrapper;
        }

        public setChild(widget:Definition.IWidget|null){
            if(this.childWidget !== widget){
                this.childWidgetIsWidget = false;
                if(!widget || !(this.childWidgetIsWidget = Definition.Widget.isWidget(widget)) || !this.isParent(widget)){
                    this.childWidget = widget;
                    this.childChanged = true;
                    this.changed = true;
                    this.parent.childWidgetChanged(this);
                }
            }
        }

        public toSerializableWidget(){
            return new Serializer.SerializableWidget(this.serializableWidgetType);
        }

        public parentWidgetChanged(widget:Definition.IWidget){
            if(this.childWidgetIsWidget && this.childWidget){
                (<Definition.Widget>this.childWidget).parentWidgetChanged(widget);
            }
        }

        public childWidgetChanged(widget:Definition.Widget){
            this.changed = true;
            this.parent.childWidgetChanged(widget);
        }

        public hasWidgetChanged(){
            return this.changed;
        }

        public isParent(widget:Definition.Widget):boolean{
            return widget === this || this.parent.isParent(widget);
        };

        public render(){
            if(this.changed){
                if(this.childChanged){
                    if(this.lastChildHtmlElement){
                        if(this.lastChildHtmlElement.parentElement){
                            this.lastChildHtmlElement.parentElement.removeChild(this.lastChildHtmlElement);
                        }
                    }
                    if(this.childWidget){
                        this.lastChildHtmlElement = this.childWidget.render();
                        this.htmlElement.appendChild(this.lastChildHtmlElement);
                    }else{
                        this.lastChildHtmlElement = undefined;
                    }
                }else if(this.childWidget){
                    this.childWidget.render();
                }

                this.changed = false;
            }
            return this.htmlElement;
        }
    }
}