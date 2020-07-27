/// <reference path="IWidget.ts" />
/// <reference path="WidgetType.ts" />
/// <reference path="../../Serializer/SerializableWidget.ts" />
/// <reference path="../../../Libraries/Uri/Uri.ts" />

namespace UIX.WidgetSystem.Widget.Definition{
    export abstract class Widget implements IWidget{

        private static currentId = 0;
        private static readonly createdWidgets = new Map<number,Widget>();

        public static getNextId(widget?:Widget){
            if(widget && Render.isInEditMode){
                let id = ++this.currentId;
                this.createdWidgets.set(id, widget);                
                return id;
            }
            return ++this.currentId;
        }

        public static getById(id:number){
            return this.createdWidgets.get(id);
        }

        public static getHTMLElementId(id:number){
            return "uix-" + id;
        }

        public static createWidget(id:number, name?:string){
            let div = document.createElement("div");
            div.id = this.getHTMLElementId(id);

            if(Render.isInEditMode){
                div.dataset.id = id.toString();
            }

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

        public static createAnchor(name?:string, blankTarget?:boolean, href?:string){
            let anchor = document.createElement("a");
            
            if(name){
                anchor.className = name;
            }
            if(blankTarget || href && blankTarget === undefined && !new Libraries.Uri(href).makeAbsolute().isSameRoot(Libraries.Uri.current)){
                anchor.target = "_blank";
                anchor.rel = "noopener";
            }
            if(href){
                anchor.href = href;
            }

            return anchor;
        }

        public static isWidget(widget:IWidget):widget is Widget{
            let test = <Widget>widget;
            return typeof test.parent === "object" && test.parent &&
                typeof test.widgetType === "number" &&  typeof test.serializableWidgetType === "number" &&
                typeof test.toSerializableWidget === "function" && typeof test.parentWidgetChanged === "function";
        }

        public abstract readonly parent:IWidget;
        public abstract readonly id:number;

        public abstract get widgetType():WidgetType;
        public abstract get serializableWidgetType():Serializer.WidgetType;

        public abstract toSerializableWidget():Serializer.SerializableWidget;
        public abstract parentWidgetChanged(widget:IWidget):void;
        public abstract childWidgetChanged(widget:Widget):void;
        public abstract hasWidgetChanged():boolean;
        public abstract isParent(widget:Widget):boolean;
        public abstract render():HTMLElement;
    }
}