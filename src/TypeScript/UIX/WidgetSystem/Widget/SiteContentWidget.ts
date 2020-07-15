/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />

namespace UIX.WidgetSystem.Widget{
    export class SiteContentWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;
        public readonly id:number;
        
        private changed = true;
        private childChanged = false;
        private child:Definition.Widget|null = null;
        private readonly htmlElement:HTMLElement;
        private readonly childWrapper:HTMLElement;


        public get children(): Definition.Widget[] { 
            if(this.child){
                return [this.child];
            }else{
                return [];
            }
        }
        
        public get containerWidgetType(): Definition.ContainerWidgetType { return Definition.ContainerWidgetType.SiteContent; }

        public constructor(parent:Definition.IWidget){
            super();
            this.id = Definition.Widget.getNextId();

            this.parent = parent;
            this.htmlElement = Definition.Widget.createWidget(this.id, "siteContent");
            this.childWrapper = Definition.Widget.createWidgetWrapper();
            this.htmlElement.appendChild(this.childWrapper);
        }

        public setChild(child:Definition.Widget|null){
            if(this.child !== child && (!child || !this.isParent(child))){
                this.child = child;
                this.childChanged = true;
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public toSerializableWidget(){
            return new Serializer.SerializableWidget(Serializer.WidgetType.SiteContent, [this.child?.toSerializableWidget() ?? null]);
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
                
                this.changed = false;
            }
            return this.htmlElement;
        }
    }

    Serializer.SerializableWidget.register(Serializer.WidgetType.SiteContent, (serializableWidget, parent) => {
        if(serializableWidget.children && serializableWidget.children.length === 1){
            let siteContentWidget = new SiteContentWidget(parent);
            if(serializableWidget.children[0]){
                let parsed = Serializer.SerializableWidget.tryParse(serializableWidget.children[0], siteContentWidget);
                if(parsed){
                    siteContentWidget.setChild(parsed);
                }
            }
            return siteContentWidget;
        }
        return null;
    });
}