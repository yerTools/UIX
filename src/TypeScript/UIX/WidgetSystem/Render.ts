/// <reference path="Widget/WebpageWidget.ts" />
/// <reference path="Widget/WebpageWidgetEditorWidget.ts" />
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
    export const isInEditMode = checkIfInEditMode();
    const webpageWidgetEditorWidget = createEditorIfNecessary();

    function checkIfInEditMode(){
        if(Core.Static.SharedData.Informations.isInBrowserContext){
            let uri = new Libraries.Uri(location.href);
            if(uri.query){
                let parts = uri.query.split('&');
                for(let i = 0; i < parts.length; i++){
                    if(parts[i] === "UIX-Edit-Mode=true"){
                        document.body.classList.add("UIX-Edit-Mode");
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function createEditorIfNecessary(){
        if(isInEditMode){
            let webpageWidgetEditorWidget = new Widget.WebpageWidgetEditorWidget();
            document.body.appendChild(webpageWidgetEditorWidget.render());
            return webpageWidgetEditorWidget;
        }
        return null;
    }

    function appendWebpageWidget(webpageWidget:Widget.WebpageWidget){
        if(webpageWidgetEditorWidget){
            webpageWidgetEditorWidget.setWebpageWidget(webpageWidget);
        }else{
            document.body.appendChild(webpageWidget.render());
        }
    }

    export function fromResponse(response:Libraries.Ajax.AjaxResult){
        if(response.response){
            if(typeof response.response === "string"){
                return fromJson(response.response);
            }else if(typeof response.response === "object"){
                return fromJson(JSON.stringify(response.response));
            }
        }
        return false;
    }

    export function fromJson(json:string){
        let serializableWidget = Serializer.Serializer.deserializeToSerializableWidget(json);
        if(serializableWidget){
            return fromSerializableWidget(serializableWidget);
        }
        return false;
    }

    export function fromSerializableWidget(serializableWidget:Serializer.SerializableWidget){
        let webpageWidget = Widget.WebpageWidget.tryParse(serializableWidget);
        if(webpageWidget){
            appendWebpageWidget(webpageWidget);
            return true;
        }
        return false;
    }

    export function redirectToEditMode(){
        if(!isInEditMode){
            location.href = new Libraries.Uri(location.href).addQuery("UIX-Edit-Mode", "true").toString();
            return true;
        }
        return false;
    }

    export function fallback(){
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
                                    data: "## TODO-List:\n[x] Simple markdown parser  \n[ ] Drag and drop editor  \n[+] Optimized for speed  \n[-] No PHP or ASP.NET required\n# *Sounds* **interest**ing?"
                                },
                                {
                                    widgetType: Serializer.WidgetType.Button,
                                    data: JSON.stringify({text: "Edit this site", href: "?UIX-Edit-Mode=true"})
                                },
                                {
                                    widgetType: Serializer.WidgetType.Markdown,
                                    data: "If you want to try it for **free** you can check out ~lima-city.de~ trough my ref-link:"
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
        console.log(Serializer.Serializer.serializeSerializableWidget(serializableWidget));
        fromSerializableWidget(serializableWidget);
    }
}