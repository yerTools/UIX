/// <reference path="Definition/IWidget.ts" />

namespace UIX.WidgetSystem.Widget{
    export class WidgetParent implements Widget.Definition.IWidget {

        private body:Widget.Definition.Widget|null = null;
        private requestedAnimationFrame:number|null = null;

        public readonly id:number;

        public constructor(){
            this.id = Definition.Widget.getNextId();
        }

        public setBody(body:Widget.Definition.Widget){
            this.body = body;
            return this.render();
        }

        public childWidgetChanged(widget:Definition.Widget){
            if(this.requestedAnimationFrame === null){
                this.requestedAnimationFrame = requestAnimationFrame(() => {
                    this.requestedAnimationFrame = null;
                    if(this.body){
                        this.render();
                    }
                });
            }
        }

        public hasWidgetChanged(){
            return !!this.body && this.body.hasWidgetChanged();
        }

        public isParent(){
            return false;
        };

        public render(){
            if(this.requestedAnimationFrame !== null){
                cancelAnimationFrame(this.requestedAnimationFrame);
                this.requestedAnimationFrame = null;
            }
            if(this.body){
                return this.body.render();
            }
            return document.createElement("div");
        }
    }
}