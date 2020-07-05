/// <reference path="Widget/WebpageWidget.ts" />
/// <reference path="Widget/VerticalDividerWidget.ts" />
/// <reference path="Widget/MarkdownWidget.ts" />
/// <reference path="Widget/ListWidget.ts" />
/// <reference path="Widget/ButtonWidget.ts" />
/// <reference path="Serializer/Serializer.ts" />
/// <reference path="../Libraries/Ajax/AjaxResult.ts" />
/// <reference path="../Libraries/Uri/Uri.ts" />
/// <reference path="../Core/Static/SharedData/Informations.ts" />

namespace UIX.WidgetSystem.Render{
    export function fromResponse(response:Libraries.Ajax.AjaxResult){
        return false;
    }

    export function fromJson(json:string){
        return false;
    }

    export function fromSerializableWidget(serializableWidget:Serializer.SerializableWidget){
        return false;
    }

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
                            widgetType: Serializer.WidgetType.List,
                            children: [
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "Current time: **" + new Date().toLocaleTimeString() + "**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Button,
                                    data: JSON.stringify({text: "Hallo Welt!", href: "./?UIX-Edit-Mode=true"})
                                }
                            ]
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

    export function checkIfInEditMode(){
        if(Core.Static.SharedData.Informations.isInBrowserContext){
            let uri = new Libraries.Uri(location.href);
            if(uri.query){
                let parts = uri.query.split('&');
                for(let i = 0; i < parts.length; i++){
                    if(parts[i] === "UIX-Edit-Mode=true"){
                        document.body.classList.add("UIX-Edit-Mode");
                    }
                }
            }
        }
    }
}