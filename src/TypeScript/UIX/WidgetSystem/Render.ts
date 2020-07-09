/// <reference path="Widget/WebpageWidget.ts" />
/// <reference path="Widget/VerticalDividerWidget.ts" />
/// <reference path="Widget/MarkdownWidget.ts" />
/// <reference path="Widget/ListWidget.ts" />
/// <reference path="Widget/ButtonWidget.ts" />
/// <reference path="Widget/SiteContentWidget.ts" />
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
            settings: "{}",
            widgetType: Serializer.WidgetType.Webpage,
            children: [
                {
                    widgetType: Serializer.WidgetType.SiteContent,
                    children: [
                        {
                            widgetType: Serializer.WidgetType.List,
                            children: [
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "# Hello World!\nWelcome to the *first* UIX Webpage! **I really hope *you* like it!**"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "---\n\nThis site is *currently* **under construction**, but this is the `first` demo of it. :)"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "## TODO-List:\n[x] Simple markdown parser  \n[ ] Drag and drop editor  \n[+] Optimized for speed  \n[-] No PHP or ASP.NET required"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "# Sounds interesting?\nIf you want to try it for **free** you can check out ~lima-city.de~ trough my ref-link:"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Button,
                                    data: JSON.stringify({text: "Check out Lima-City.de", href: "https://www.lima-city.de/?cref=353333"})
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "There you can create a web hosting account with `PHP` and `SSL` support. **~Completely free!~**\n---\n"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Button,
                                    data: JSON.stringify({text: "Go to GitHub", href: "https://github.com/yerTools/UIX"})
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        let webpageWidget = Widget.WebpageWidget.tryParse(serializableWidget);
        if(webpageWidget){
            console.log(Serializer.Serializer.serialize(webpageWidget));
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