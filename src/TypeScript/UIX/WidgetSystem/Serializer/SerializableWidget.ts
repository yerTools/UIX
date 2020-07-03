/// <reference path="WidgetType.ts" />

namespace UIX.WidgetSystem.Serializer{
    export class SerializableWidget{
        private static registeredParser = new Map<WidgetType, (serializableWidget:SerializableWidget, parent:Widget.Definition.IWidget)=>null|WidgetSystem.Widget.Definition.Widget>();

        public static register(widgetType:WidgetType,tryParseCallback:((serializableWidget:SerializableWidget, parent:Widget.Definition.IWidget)=>null|WidgetSystem.Widget.Definition.Widget)){
            SerializableWidget.registeredParser.set(widgetType, tryParseCallback);
        }

        public static tryParse(serializableWidget:SerializableWidget, parent:Widget.Definition.IWidget){
            let parser = this.registeredParser.get(serializableWidget.widgetType);
            if(parser){
                return parser(serializableWidget, parent);
            }
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