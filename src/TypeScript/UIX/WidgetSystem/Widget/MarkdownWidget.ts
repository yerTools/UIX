/// <reference path="Definition/Widget.ts" />
/// <reference path="Definition/WidgetType.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="../../Libraries/Markdown/MarkdownParser.ts" />

namespace UIX.WidgetSystem.Widget{
    export class MarkdownWidget extends Definition.Widget {
        private changed = true;
        private _markdown:string;
        private readonly htmlElement:HTMLElement;
        private readonly markdownWrapper:HTMLElement;

        public readonly parent:Definition.IWidget;
        public readonly id:number;

        public get widgetType(){ return Definition.WidgetType.Markdown; };
        
        public get markdown(){
            return this._markdown;
        }

        public set markdown(value:string){
            this._markdown = value;
            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public constructor(parent:Definition.IWidget, markdown = ""){
            super();
            this.id = Definition.Widget.getNextId();
            
            this.parent = parent;
            this._markdown = markdown;
            this.htmlElement = Definition.Widget.createWidget(this.id, "markdown");
            this.markdownWrapper = Definition.Widget.createWidgetWrapper();
            this.htmlElement.appendChild(this.markdownWrapper);
        }

        public toSerializableWidget(){
            return new Serializer.SerializableWidget(Serializer.WidgetType.Markdown, undefined, undefined, this.markdown);
        }

        public parentWidgetChanged(widget:Definition.IWidget){ }

        public childWidgetChanged(widget:Definition.Widget){ }

        public hasWidgetChanged(){
            return this.changed;
        }

        public isParent(widget:Definition.Widget):boolean{
            return widget === this || this.parent.isParent(widget);
        };

        public render(){
            if(this.changed){
                this.markdownWrapper.innerHTML = new Libraries.Markdown.MarkdownParser(this.markdown).parseToHTML();
                this.changed = false;
            }
            return this.htmlElement;
        }

        public getDimensions(invoker?: Definition.IRenderable | undefined): Style.Dimensions | null {
            throw new Error("Method not implemented.");
        }
    }

    Serializer.SerializableWidget.register(Serializer.WidgetType.Markdown, (serializableWidget, parent) => {
        return new MarkdownWidget(parent,serializableWidget.data);
    });
}