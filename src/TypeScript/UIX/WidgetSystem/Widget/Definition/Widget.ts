/// <reference path="IWidget.ts" />
/// <reference path="WidgetType.ts" />
/// <reference path="../../Serializer/SerializableWidget.ts" />

namespace UIX.WidgetSystem.Widget.Definition{
    export abstract class Widget implements IWidget{
        private static currentId = 0;
        public static getNextId(){
            return ++this.currentId;
        }

        public static getHTMLElementId(id:number){
            return "uix-" + id;
        }

        public static createWidget(id:number, name?:string){
            let div = document.createElement("div");
            div.id = this.getHTMLElementId(id);
            div.className = "uix widget";
            if(name){
                div.classList.add(name);
            }
            return div;
        }

        public static createWidgetWrapper(name?:string){
            let div = document.createElement("div");
            div.className = "uix wrapper";
            if(name){
                div.classList.add(name);
            }
            return div;
        }

        public static createAnchor(name?:string, blankTarget = true, href?:string){
            let anchor = document.createElement("a");
            
            if(name){
                anchor.className = name;
            }
            if(blankTarget){
                anchor.target = "_blank";
                anchor.rel = "noopener";
            }
            if(href){
                anchor.href = href;
            }

            return anchor;
        }

        public abstract readonly parent:IWidget;
        public abstract readonly id:number;

        public abstract get widgetType():WidgetType;
        
        public abstract toSerializableWidget():WidgetSystem.Serializer.SerializableWidget;
        public abstract parentWidgetChanged(widget:IWidget):void;
        public abstract childWidgetChanged(widget:Widget):void;
        public abstract hasWidgetChanged():boolean;
        public abstract isParent(widget:Widget):boolean;
        public abstract render():HTMLElement;
    }
}