/// <reference path="Definition/ContainerWidget.ts" />
/// <reference path="Definition/ContainerWidgetType.ts" />

namespace UIX.WidgetSystem.Widget{
    export class VerticalDividerWidget extends Definition.ContainerWidget {
        public readonly parent:Definition.IWidget;
        public readonly id:number;
        
        private changed = true;
        private resizableChanged = true;
        private widthChanged = true;
        private leftChildChanged = false;
        private rightChildChanged = false;

        private _width:number;
        private _widthAbsolute:boolean;
        private _widthFromLeft:boolean;

        private _resizable:boolean;
        private leftChild:Definition.Widget|null = null;
        private rightChild:Definition.Widget|null = null;
        private readonly htmlElement:HTMLElement;
        private readonly leftChildWrapper:HTMLElement; 
        private readonly rightChildWrapper:HTMLElement; 
        private resizer:HTMLElement|undefined; 

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

        public get resizable(){
            return this._resizable;
        }

        public set resizable(value:boolean){
            if(this._resizable !== value){
                this._resizable = value;
                this.changed = true;
                this.resizableChanged = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public get width(){
            return this._width;
        }

        public set width(value:number){
            if(this._width !== value){
                this._width = value;
                this.changed = true;
                this.widthChanged = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public get widthAbsolute(){
            return this._widthAbsolute;
        }

        public set widthAbsolute(value:boolean){
            if(this._widthAbsolute !== value){
                this._widthAbsolute = value;
                this.changed = true;
                this.widthChanged = true;
                this.parent.childWidgetChanged(this);
            }
        }

        public get widthFromLeft(){
            return this._widthFromLeft;
        }

        public set widthFromLeft(value:boolean){
            if(this._widthFromLeft !== value){
                this._widthFromLeft = value;
                this.changed = true;
                this.widthChanged = true;
                this.parent.childWidgetChanged(this);
            }
        }
        
        public constructor(parent:Definition.IWidget, width = 50, widthAbsolute = false, widthFromLeft = true, resizable = false){
            super();
            this.id = Definition.Widget.getNextId(this);

            this.parent = parent;

            this._width = width;
            this._widthAbsolute = widthAbsolute;
            this._widthFromLeft = widthFromLeft;

            this._resizable = resizable;

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
                ], JSON.stringify({
                    width: this._width,
                    widthAbsolute: this._widthAbsolute,
                    widthFromLeft: this._widthFromLeft,
                    resizable: this._resizable
                }));
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

        private createResizer(){
            const defaultOffset = 2;
            const resizeOffset = 200;

            let resizer = document.createElement("div");
            resizer.className = "uix vertical-divider resizer";

            let setPosition = (offset:number) => {
                if(this._widthAbsolute){
                    if(this._widthFromLeft){
                        resizer.style.left = (this._width - offset) + "px";
                    }else{
                        resizer.style.right = (this._width - offset) + "px";
                    }
                }else{
                    if(this._widthFromLeft){
                        resizer.style.left = "calc(" + this._width + "% - " + offset + "px)";
                    }else{
                        resizer.style.right = "calc(" + this._width + "% - " + offset + "px)";
                    }
                }
            };
            setPosition(defaultOffset);

            let mouseMove = (mouseMove:MouseEvent) => {
                let boundingClientRect = this.htmlElement.getBoundingClientRect();
                let absoluteWidth = mouseMove.clientX - boundingClientRect.left;
                if(!this._widthFromLeft){
                    absoluteWidth = boundingClientRect.width - absoluteWidth;
                }

                if(this._widthAbsolute){
                    this.width = absoluteWidth;
                }else{
                    this.width = 100 * absoluteWidth / boundingClientRect.width;
                }
                
                setPosition(defaultOffset + resizeOffset);
            };
            
            let changeFollowMouse = (mouseDown:boolean) => {
                resizer.style.padding = mouseDown ? resizeOffset + "px" : "";
                setPosition((mouseDown ? resizeOffset : 0) + defaultOffset);
                if(mouseDown){
                    this.htmlElement.classList.add("resizing");
                    resizer.addEventListener("mousemove", mouseMove, { passive: true });
                }else{
                    this.htmlElement.classList.remove("resizing");
                    resizer.removeEventListener("mousemove", mouseMove);
                }
            };

            resizer.addEventListener("mousedown", () => changeFollowMouse(true), { passive: true });
            resizer.addEventListener("mouseup", () => changeFollowMouse(false), { passive: true });
            resizer.addEventListener("mouseleave", () => changeFollowMouse(false), { passive: true });

            return resizer;
        }

        public render(){
            if(this.changed){
                if(this.resizableChanged){
                    if(!this.resizable !== !this.resizer){
                        if(this.resizable){
                            this.resizer = this.createResizer();
                            this.htmlElement.insertBefore(this.resizer, this.rightChildWrapper);

                        }else{
                            this.htmlElement.removeChild(<HTMLElement>this.resizer);
                        }
                    }
                    this.resizableChanged = false;
                }

                if(this.widthChanged){
                    
                    let widthLeft:string;
                    let widthRight:string;

                    if(this._widthAbsolute){
                        widthLeft = this._width + "px";
                        widthRight = "calc(100% - " + this._width + "px)";
                    }else{
                        widthLeft = this._width + "%";
                        widthRight = (100 - this._width) + "%";
                    }

                    if(this._widthFromLeft){
                        this.leftChildWrapper.style.width = widthLeft;
                        this.rightChildWrapper.style.width = widthRight;
                    }else{
                        this.leftChildWrapper.style.width = widthRight;
                        this.rightChildWrapper.style.width = widthLeft;
                    }

                    this.widthChanged = false;
                }

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
        if(serializableWidget.children && serializableWidget.children.length === 2 && serializableWidget.settings){
            let settings = JSON.parse(serializableWidget.settings);
            if(typeof settings === "object" && settings){
                let verticalDividerWidget = new VerticalDividerWidget(parent, settings.width, settings.widthAbsolute, settings.widthFromLeft, settings.resizable);
                
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
        }
        return null;
    });
}