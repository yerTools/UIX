/// <reference path="Definition/Widget.ts" />
/// <reference path="Definition/WidgetType.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="../../Libraries/Markdown/MarkdownParser.ts" />

namespace UIX.Rendering.Widget{
    export class MarkdownWidget extends Definition.Widget {
        private changed = true;
        private markdown:string;
        private readonly htmlElement:HTMLElement;
        private readonly markdownWrapper:HTMLElement;

        public readonly parent:Definition.IWidget;

        public get widgetType(){ return Definition.WidgetType.Markdown; };
        
        public constructor(parent:Definition.IWidget, markdown = ""){
            super();
            this.parent = parent;
            this.markdown = markdown;
            this.htmlElement = Definition.Widget.createWidget("markdown");
            this.markdownWrapper = Definition.Widget.createWidgetWrapper();
            this.htmlElement.appendChild(this.markdownWrapper);
        }

        public getMarkdown(){
            return this.markdown;
        }

        public setMarkdown(markdown:string){
            this.markdown = markdown;
            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public parentWidgetChanged(widget:Definition.IWidget){ }

        public childWidgetChanged(widget:Definition.Widget){ }

        public hasWidgetChanged(){
            return this.changed;
        }

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
}