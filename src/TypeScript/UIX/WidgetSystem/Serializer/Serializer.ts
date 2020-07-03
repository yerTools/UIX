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
        if(propertyName === "widgetType"){
            return WidgetType[propertyValue];
        }
        return propertyValue;
    }

    export function serialize(webpageWidget:Widget.WebpageWidget){
        return JSON.stringify(SerializableWidget.removeUndefinedProperties(webpageWidget.toSerializableWidget()), customJSONSerializer);
    }

    export function deserialize(json:string){
        return Widget.WebpageWidget.tryParse(JSON.parse(json,customJSONDeserializer));
    }
}