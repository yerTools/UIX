/// <reference path="Widget/WebpageWidget.ts" />
/// <reference path="Widget/VerticalDividerWidget.ts" />
/// <reference path="Widget/MarkdownWidget.ts" />
/// <reference path="Serializer/Serializer.ts" />

namespace UIX.WidgetSystem.Render{
    export function test(){

        let serializableWidget = <Serializer.SerializableWidget> {
            widgetType: Serializer.WidgetType.Webpage,
            children: [
                {
                    widgetType: Serializer.WidgetType.VerticalDivider,
                    children: [
                        {
                            widgetType: Serializer.WidgetType.Markdown,
                            data: "# Hello World!\nWelcome to the *first* UIX Webpage! **I really hope *you* like it!**"
                        },
                        {
                            widgetType: Serializer.WidgetType.Markdown,
                            data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                        }
                    ]
                }
            ]
        };

        let webpageWidget = Widget.WebpageWidget.tryParse(serializableWidget);
        if(webpageWidget){
            document.body.appendChild(webpageWidget.render());
        }
    }
}