/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />

namespace UIX.WidgetSystem.Widget{
    export class SimpleContainerWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;
        public readonly id:number;
        
        private changed = true;
        private childChanged = false;
        private hrefChanged = true;

        private child:Definition.Widget|null = null;

        private _href:string|undefined;
        private _blankTarget?:boolean;
        private _onClick:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)|undefined;

        private readonly htmlElement:HTMLElement;
        private readonly childWrapper:HTMLElement;


        public get children(): Definition.Widget[] { 
            if(this.child){
                return [this.child];
            }else{
                return [];
            }
        }
        
        public get containerWidgetType(){ return Definition.ContainerWidgetType.SimpleContainer; }
        public get serializableWidgetType(){ return  Serializer.WidgetType.SimpleContainer; }
        
        public get href(){
            return this._href;
        }

        public set href(value:string|undefined){
            this._href = value;
            this.changed = true;
            this.hrefChanged = true;
            this.parent.childWidgetChanged(this);
        }

        public get blankTarget(){
            return this._blankTarget;
        }

        public set blankTarget(value:boolean|undefined){
            this._blankTarget = value;
            this.changed = true;
            this.hrefChanged = true;
            this.parent.childWidgetChanged(this);
        }

        public get onClick(){
            return this._onClick;
        }

        public set onClick(value:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)|undefined){
            this._onClick = value;
            this.changed = true;
            this.parent.childWidgetChanged(this);
        }

        public constructor(parent:Definition.IWidget, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            super();
            this.id = Definition.Widget.getNextId(this);

            this.parent = parent;
            this._href = href;
            this._blankTarget = blankTarget;
            this._onClick = onClick;

            this.htmlElement = Definition.Widget.createWidget(this.id, "simple-container");
            this.childWrapper = Definition.Widget.createWidgetWrapper();
        }

        public setChild(child:Definition.Widget|null){
            if(this.child !== child && (!child || !this.isParent(child))){
                this.child = child;
                this.childChanged = true;
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public getChild(){
            return this.child;
        }

        public toSerializableWidget(){
            return new Serializer.SerializableWidget(Serializer.WidgetType.SimpleContainer, [this.child?.toSerializableWidget() ?? null], undefined, this._href);
        }

        public parentWidgetChanged(widget:Definition.IWidget){
            if(this.child){
                this.child.parentWidgetChanged(widget);
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
                    let childHTMLElement:HTMLElement|undefined;
                    if(this.child){
                        childHTMLElement = this.child.render();
                    }

                    if(this.childWrapper.lastChild){
                        this.childWrapper.removeChild(this.childWrapper.lastChild);
                    }
                    if(childHTMLElement){
                        this.childWrapper.appendChild(childHTMLElement);
                    }
                    this.childChanged = false;
                }else if(this.child){
                    this.child.render();
                }

                if(this.hrefChanged){

                    if(this.htmlElement.lastChild){
                        this.htmlElement.removeChild(this.htmlElement.lastChild);
                    }

                    if(this._href){
                        let anchor = Definition.Widget.createAnchor(undefined, this._blankTarget, this._href);
                        anchor.appendChild(this.childWrapper);
                        this.htmlElement.appendChild(anchor);
                    }else{
                        this.htmlElement.appendChild(this.childWrapper);
                    }

                    this.hrefChanged = false;
                }
                
                this.changed = false;
            }
            return this.htmlElement;
        }
    }

    Serializer.SerializableWidget.register(Serializer.WidgetType.SimpleContainer, (serializableWidget, parent) => {
        if(serializableWidget.children && serializableWidget.children.length === 1){
            let simpleContainerWidget = new SimpleContainerWidget(parent);
            if(serializableWidget.children[0]){
                let parsed = Serializer.SerializableWidget.tryParse(serializableWidget.children[0], simpleContainerWidget);
                if(parsed){
                    simpleContainerWidget.setChild(parsed);
                }
            }
            if(serializableWidget.data){
                simpleContainerWidget.href = serializableWidget.data;
            }
            return simpleContainerWidget;
        }
        return null;
    });
}