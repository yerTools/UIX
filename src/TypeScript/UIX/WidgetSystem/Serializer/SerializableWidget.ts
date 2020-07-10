/// <reference path="WidgetType.ts" />

namespace UIX.WidgetSystem.Serializer{
    export class SerializableWidget{
        private static registeredParser = new Map<WidgetType, (serializableWidget:SerializableWidget, parent:Widget.Definition.IWidget)=>null|WidgetSystem.Widget.Definition.Widget>();

        public static register(widgetType:WidgetType,tryParseCallback:((serializableWidget:SerializableWidget, parent:Widget.Definition.IWidget)=>null|WidgetSystem.Widget.Definition.Widget)){
            SerializableWidget.registeredParser.set(widgetType, tryParseCallback);
        }

        public static isSerializableWidget(value:any):value is SerializableWidget{
            if(value && typeof value === "object"){
                if(typeof value.widgetType !== "number"){
                    return false;
                }
                if(!(value.widgetType in WidgetType)){
                    return false;
                }
                if(value.settings && typeof value.settings !== "string"){
                    return false;
                }
                if(value.data && typeof value.data !== "string"){
                    return false;
                }
                if(value.children){
                    if(!Array.isArray(value.children)){
                        return false;
                    }
                    for(let i = 0; i < value.children.length; i++){
                        if(value.children[i] === null || !SerializableWidget.isSerializableWidget(value.children[i])){
                            return false;
                        }
                    }
                }

                return true;
            }
            return false
        }

        public static tryParse(serializableWidget:SerializableWidget, parent:Widget.Definition.IWidget){
            try{
                let parser = this.registeredParser.get(serializableWidget.widgetType);
                if(parser){
                    return parser(serializableWidget, parent);
                }
            }catch(error){}
            return null;
        }

        public static removeUndefinedProperties(serializableWidget:SerializableWidget):any{
            if(serializableWidget.children){
                for(let i = 0; i < serializableWidget.children.length; i++){
                    if(serializableWidget.children[i]){
                        SerializableWidget.removeUndefinedProperties(<SerializableWidget>serializableWidget.children[i]);
                    }
                }
            }else{
                delete serializableWidget.children;
            }
            if(!serializableWidget.settings){
                delete serializableWidget.settings;
            }
            if(!serializableWidget.data){
                delete serializableWidget.data;
            }
            return serializableWidget;
        }

        public widgetType:WidgetType;
        public children?:(SerializableWidget|null)[];
        public settings?:string;
        public data?:string;

        public constructor(widgetType:WidgetType, children?:(SerializableWidget|null)[], settings?:string, data?:string){
            this.widgetType = widgetType;
            this.children = children;
            this.settings = settings;
            this.data = data;
        }
    }
}