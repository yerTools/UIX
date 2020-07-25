/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />

namespace UIX.WidgetSystem.Widget{
    export class VerticalDividerWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;
        public readonly id:number;
        
        private changed = true;
        private leftChildChanged = false;
        private rightChildChanged = false;
        private leftChild:Definition.Widget|null = null;
        private rightChild:Definition.Widget|null = null;
        private readonly htmlElement:HTMLElement;
        private readonly leftChildWrapper:HTMLElement; 
        private readonly rightChildWrapper:HTMLElement; 


        public get children(): Definition.Widget[] { 
            if(this.leftChild && this.rightChild){
                return [this.leftChild, this.rightChild];
            }else if(this.leftChild){
                return [this.leftChild];
            }else if(this.rightChild){
                return [this.rightChild];
            }else{
                return [];
            }
        }
        
        public get containerWidgetType(){ return Definition.ContainerWidgetType.VerticalDivider; }
        public get serializableWidgetType(){ return  Serializer.WidgetType.VerticalDivider; }

        public constructor(parent:Definition.IWidget){
            super();
            this.id = Definition.Widget.getNextId(this);

            this.parent = parent;
            this.htmlElement = Definition.Widget.createWidget(this.id, "vertical-divider");
            this.leftChildWrapper = Definition.Widget.createWidgetWrapper();
            this.rightChildWrapper = Definition.Widget.createWidgetWrapper();
            this.htmlElement.appendChild(this.leftChildWrapper);
            this.htmlElement.appendChild(this.rightChildWrapper);
        }

        public setLeftChild(leftChild:Definition.Widget|null){
            if(this.leftChild !== leftChild && (!leftChild || !this.isParent(leftChild))){
                this.leftChild = leftChild;
                this.leftChildChanged = true;
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public getLeftChild(){
            return this.leftChild;
        }

        public setRightChild(rightChild:Definition.Widget|null){
            if(this.rightChild !== rightChild && (!rightChild || !this.isParent(rightChild))){
                this.rightChild = rightChild;
                this.changed = true;
                this.rightChildChanged = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public getRightChild(){
            return this.rightChild;
        }

        public toSerializableWidget(){
            return new Serializer.SerializableWidget(this.serializableWidgetType, 
                [
                    this.leftChild?.toSerializableWidget() ?? null,
                    this.rightChild?.toSerializableWidget() ?? null,
                ]);
        }

        public parentWidgetChanged(widget:Definition.IWidget){
            if(this.leftChild){
                this.leftChild.parentWidgetChanged(widget);
            }
            if(this.rightChild){
                this.rightChild.parentWidgetChanged(widget);
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
                if(this.leftChildChanged){
                    let leftChildHTMLElement:HTMLElement|null;
                    if(this.leftChild){
                        leftChildHTMLElement = this.leftChild.render();
                    }else{
                        leftChildHTMLElement = null;
                    }

                    if(this.leftChildWrapper.lastChild){
                        this.leftChildWrapper.removeChild(this.leftChildWrapper.lastChild);
                    }
                    if(leftChildHTMLElement){
                        this.leftChildWrapper.appendChild(leftChildHTMLElement);
                    }
                    this.leftChildChanged = false;
                }else if(this.leftChild){
                    this.leftChild.render();
                }

                if(this.rightChildChanged){
                    let rightChildHTMLElement:HTMLElement|null;
                    if(this.rightChild){
                        rightChildHTMLElement = this.rightChild.render();
                    }else{
                        rightChildHTMLElement = null;
                    }

                    if(this.rightChildWrapper.lastChild){
                        this.rightChildWrapper.removeChild(this.rightChildWrapper.lastChild);
                    }
                    if(rightChildHTMLElement){
                        this.rightChildWrapper.appendChild(rightChildHTMLElement);
                    }
                    this.rightChildChanged = false;
                }else if(this.rightChild){
                    this.rightChild.render();
                }
                
                this.changed = false;
            }
            return this.htmlElement;
        }
    }

    Serializer.SerializableWidget.register(Serializer.WidgetType.VerticalDivider, (serializableWidget, parent) => {
        if(serializableWidget.children && serializableWidget.children.length === 2){
            let verticalDividerWidget = new VerticalDividerWidget(parent);
            if(serializableWidget.children[0]){
                let parsed = Serializer.SerializableWidget.tryParse(serializableWidget.children[0], verticalDividerWidget);
                if(parsed){
                    verticalDividerWidget.setLeftChild(parsed);
                }
            }
            if(serializableWidget.children[1]){
                let parsed = Serializer.SerializableWidget.tryParse(serializableWidget.children[1], verticalDividerWidget);
                if(parsed){
                    verticalDividerWidget.setRightChild(parsed);
                }
            }
            return verticalDividerWidget;
        }
        return null;
    });
}