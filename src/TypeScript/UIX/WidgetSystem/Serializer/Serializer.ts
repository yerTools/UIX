/// <reference path="WidgetType.ts" />
/// <reference path="../Widget/WebpageWidget.ts" />

namespace UIX.WidgetSystem.Serializer.Serializer{
    function customJSONSerializer(propertyName:string, propertyValue:any):any{
        if(propertyName === "widgetType"){
            return WidgetType[propertyValue];
        }
        return propertyValue;
    }

    function customJSONDeserializer(propertyName:string, propertyValue:any):any{
        if(propertyName === "widgetType" && typeof propertyValue === "string"){
            return WidgetType[<any>propertyValue];
        }
        return propertyValue;
    }

    export function serialize(webpageWidget:Widget.WebpageWidget){
        return serializeSerializableWidget(webpageWidget.toSerializableWidget());
    }

    export function serializeSerializableWidget(serializableWidget:SerializableWidget){
        return JSON.stringify(SerializableWidget.removeUndefinedProperties(serializableWidget), customJSONSerializer);
    }

    export function deserializeToSerializableWidget(json:string){
        try{
            let parsed = JSON.parse(json,customJSONDeserializer);
            if(SerializableWidget.isSerializableWidget(parsed)){
                return parsed;
            }
        }catch(error){}
        return null;
    }

    export function deserialize(json:string){
        let serializableWidget = deserializeToSerializableWidget(json);
        if(serializableWidget){
            return Widget.WebpageWidget.tryParse(serializableWidget);
        }
        return null;
    }
}