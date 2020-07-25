/// <reference path="../Widget/Definition/Widget.ts" />

namespace UIX.WidgetSystem.Helper{
    export class WidgetList{
        public readonly childChanged:boolean[] = [];
        public readonly children:(Widget.Definition.Widget|null)[] = [];
        public readonly childrenWrapper:HTMLElement[] = [];
        public readonly childrenWrapperAppended:boolean[] = [];

        public getChildren():Widget.Definition.Widget[] {
            let children:Widget.Definition.Widget[] = [];
            for(let i = 0; i < this.children.length; i++){
                if(this.children[i]){
                    children.push(<Widget.Definition.Widget>this.children[i]);
                }
            }
            return children;
        }

        public addChild(child:Widget.Definition.Widget, index?:number, widgetWrapperName?:string){
            if(index !== undefined){
                if(index < 0){
                    index = 0;
                }
                for(let i = 0; index < this.children.length && i < index && i < this.children.length; i++){
                    if(!this.children[i]){
                        index++;
                    }
                }
            }

            if(index === undefined || index >= this.children.length){
                this.children.push(child);
                this.childChanged.push(true);
                this.childrenWrapper.push(Widget.Definition.Widget.createWidgetWrapper(widgetWrapperName));
                this.childrenWrapperAppended.push(false);
            }else{
                this.children.splice(index, 0, child);
                this.childChanged.splice(index, 0, true);
                this.childrenWrapper.splice(index, 0, Widget.Definition.Widget.createWidgetWrapper(widgetWrapperName));
                this.childrenWrapperAppended.splice(index, 0, false);
            }
        }

        public removeChild(index:number){
            if(!this.children.length){
                return false;
            }

            if(index < 0){
                index = 0;
            }

            for(let i = 0; i < index && i < this.children.length && index < this.children.length - 1; i++){
                if(!this.children[i]){
                    index++;
                }
            }

            if(index >= this.children.length){
                index = this.children.length - 1;
            }

            if(this.children[index]){
                if(this.childrenWrapperAppended[index]){
                    this.children[index] = null;
                    this.childChanged[index] = true;
                }else{
                    this.children.splice(index, 1);
                    this.childChanged.splice(index, 1);
                    this.childrenWrapper.splice(index, 1);
                    this.childrenWrapperAppended.splice(index, 1);
                }
            }
            return true;
        }

        public render(parentElement:HTMLElement){
            for(let i = 0; i < this.children.length; i++){
                if(this.childChanged[i]){
                    if(this.children[i]){
                        if(!this.childrenWrapperAppended[i]){
                            if(i + 1 < parentElement.children.length){
                                parentElement.insertBefore(this.childrenWrapper[i], parentElement.children[i + 1]);
                            }else{
                                parentElement.appendChild(this.childrenWrapper[i]);
                            }
                            this.childrenWrapperAppended[i] = true;
                        }

                        if(this.childrenWrapper[i].lastChild){
                            this.childrenWrapper[i].removeChild(<ChildNode>this.childrenWrapper[i].lastChild);
                        }
                        this.childrenWrapper[i].appendChild((<Widget.Definition.Widget>this.children[i]).render());
                        this.childChanged[i] = false;
                    }else{
                        parentElement.removeChild(this.childrenWrapper[i]);
                        this.children.splice(i, 1);
                        this.childChanged.splice(i, 1);
                        this.childrenWrapper.splice(i, 1);
                        this.childrenWrapperAppended.splice(i, 1);
                        --i;
                    }
                }else if(this.children[i]){
                    (<Widget.Definition.Widget>this.children[i]).render();
                }
            }
        }
    }
}