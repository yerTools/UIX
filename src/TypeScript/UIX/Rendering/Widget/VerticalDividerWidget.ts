/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />
/// <reference path="Style/Dimensions.ts" />

namespace UIX.Rendering.Widget{
    export class VerticalDividerWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;

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
        
        public get containerWidgetType(): Definition.ContainerWidgetType { return Definition.ContainerWidgetType.VerticalDivider; }

        public constructor(parent:Definition.IWidget){
            super();
            this.parent = parent;
            this.htmlElement = Definition.Widget.createWidget("verticalDivider");
            this.leftChildWrapper = Definition.Widget.createWidgetWrapper();
            this.rightChildWrapper = Definition.Widget.createWidgetWrapper();
            this.htmlElement.appendChild(this.leftChildWrapper);
            this.htmlElement.appendChild(this.rightChildWrapper);
        }

        public setLeftChild(leftChild:Definition.Widget|null){
            if(this.leftChild !== leftChild){
                this.leftChild = leftChild;
                this.leftChildChanged = true;
                this.changed = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public setRightChild(rightChild:Definition.Widget|null){
            if(this.rightChild !== rightChild){
                this.rightChild = rightChild;
                this.changed = true;
                this.rightChildChanged = true;
                this.parent.childWidgetChanged(this);
            }
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

        public render(){
            if(this.changed){
                {
                    let leftChildHTMLElement:HTMLElement|null;
                    if(this.leftChild){
                        leftChildHTMLElement = this.leftChild.render();
                    }else{
                        leftChildHTMLElement = null;
                    }

                    if(this.leftChildChanged){
                        if(this.leftChildWrapper.lastChild){
                            this.leftChildWrapper.removeChild(this.leftChildWrapper.lastChild);
                        }
                        if(leftChildHTMLElement){
                            this.leftChildWrapper.appendChild(leftChildHTMLElement);
                        }
                        this.leftChildChanged = false;
                    }
                }

                {
                    let rightChildHTMLElement:HTMLElement|null;
                    if(this.rightChild){
                        rightChildHTMLElement = this.rightChild.render();
                    }else{
                        rightChildHTMLElement = null;
                    }

                    if(this.rightChildChanged){
                        if(this.rightChildWrapper.lastChild){
                            this.rightChildWrapper.removeChild(this.rightChildWrapper.lastChild);
                        }
                        if(rightChildHTMLElement){
                            this.rightChildWrapper.appendChild(rightChildHTMLElement);
                        }
                        this.rightChildChanged = false;
                    }
                }
                
                this.changed = false;
            }
            return this.htmlElement;
        }

        public getDimensions(invoker?:Definition.IRenderable):Style.Dimensions|null {
            throw new Error("Method not implemented.");
        }
    }
}