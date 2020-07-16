/// <reference path="Definition/Widget.ts" />
/// <reference path="Definition/WidgetType.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="../../Libraries/Markdown/Node/Node.ts" />

namespace UIX.WidgetSystem.Widget{
    export class ButtonWidget extends Definition.Widget {
        
        private changed = true;

        private _text:string;
        private _href:string|undefined;
        private _blankTarget?:boolean;
        private _onClick:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)|undefined;
        
        private readonly htmlElement:HTMLElement;
        private readonly buttonWrapperElement:HTMLElement;

        public readonly parent:Definition.IWidget;
        public readonly id:number;

        public get widgetType(){ return Definition.WidgetType.Button; };
        public get serializableWidgetType(){ return  Serializer.WidgetType.Button; }

        public get text(){
            return this._text;
        }

        public set text(value:string){
            this._text = value;
            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public get href(){
            return this._href;
        }

        public set href(value:string|undefined){
            this._href = value;
            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public get blankTarget(){
            return this._blankTarget;
        }

        public set blankTarget(value:boolean|undefined){
            this._blankTarget = value;
            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public get onClick(){
            return this._onClick;
        }

        public set onClick(value:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)|undefined){
            this._onClick = value;
            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public constructor(parent:Definition.IWidget, text:string, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            super();
            this.id = Definition.Widget.getNextId(this);
            
            this.parent = parent;
            this._text = text;
            this._href = href;
            this._blankTarget = blankTarget;
            this._onClick = onClick;
            this.htmlElement = Definition.Widget.createWidget(this.id, "button");
            this.buttonWrapperElement = Definition.Widget.createWidgetWrapper();
            this.htmlElement.appendChild(this.buttonWrapperElement);
        }

        public toSerializableWidget(){
            let data = <any>{ text: this._text };
            if(this._href){
                data.href = this._href;
            }
            return new Serializer.SerializableWidget(Serializer.WidgetType.Button, undefined, undefined, JSON.stringify(data));
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
                while(this.buttonWrapperElement.lastChild){
                    this.buttonWrapperElement.removeChild(this.buttonWrapperElement.lastChild);
                }
                let wrapper = this.buttonWrapperElement;
                if(this._href){
                    let link = Definition.Widget.createAnchor(undefined, this._blankTarget, this._href);
                    wrapper.appendChild(link);
                    wrapper = link;
                }
                let span = document.createElement("span");
                span.innerHTML = Libraries.Markdown.Node.Node.escapeTextForHTML(this._text);
                wrapper.appendChild(span);
                if(this._onClick){
                    wrapper.onclick = event => {
                        if(this._onClick){
                            this._onClick(event, this);
                        }
                    };
                }
                this.changed = false;
            }
            return this.htmlElement;
        }
    }

    Serializer.SerializableWidget.register(Serializer.WidgetType.Button, (serializableWidget, parent) => {
        if(serializableWidget.data){
            try{
                let data = JSON.parse(serializableWidget.data);

                if(typeof data.text === "string"){
                    return new ButtonWidget(parent, data.text, data.href);
                }

            }catch(error){ }
        }
        return null;
    });
}