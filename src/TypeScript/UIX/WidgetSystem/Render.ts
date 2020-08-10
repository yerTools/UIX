/// <reference path="Widget/Builder/WidgetFactory.ts" />
/// <reference path="Widget/WebpageWidgetEditorWidget.ts" />
/// <reference path="Serializer/Serializer.ts" />
/// <reference path="../Libraries/Ajax/AjaxResult.ts" />
/// <reference path="../Libraries/Uri/Uri.ts" />
/// <reference path="../Core/Static/SharedData/Informations.ts" />

namespace UIX.WidgetSystem.Render{
    export const isInEditMode = checkIfInEditMode();
    const webpageWidgetEditorWidget = createEditorIfNecessary();

    function checkIfInEditMode(){
        if(Core.Static.SharedData.Informations.isInBrowserContext){
            if(Libraries.Uri.current.query){
                let parts = Libraries.Uri.current.query.split('&');
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
            location.href = Libraries.Uri.current.addQuery("UIX-Edit-Mode", "true").toString();
            return true;
        }
        return false;
    }

    export function fallback(){
        appendWebpageWidget(Widget.Builder.WidgetFactory.buildWebpage(siteContent => {
            siteContent.list(factory => [
                factory.markdown("# Hello World!\nWelcome to the *first* UIX Webpage! **I really hope *you* like it!**"),
                factory.markdown("---\n\nThis site is *currently* **under construction**, but this is the `first` demo of it. :)"),
                factory.markdown("## TODO-List:\n[x] Simple markdown parser  \n[ ] Drag and drop editor  \n[+] Optimized for speed  \n[-] No PHP or ASP.NET required\n# *Sounds* **interest**ing?"),
                factory.button("Edit this site", "?UIX-Edit-Mode=true"),
                factory.simpleContainer(factory.list([
                    factory.markdown("If you want to try it for **free** you can check out ~lima-city.de~ trough my ref-link:"),
                    factory.button("Check out Lima-City.de", "https://www.lima-city.de/?cref=407236"),
                    factory.markdown("There you can create a web hosting account with `PHP` and `SSL` support. **~Completely free!~**\n---\n")
                ]), "https://www.lima-city.de/?cref=407236"),
                factory.button("Go to GitHub", "https://github.com/yerTools/UIX"),
                factory.markdown("## Clear cache\nAre you not sure if this is the current version of the site?"),
                factory.button("Clear site cache", "?UIX-Clear-Cache=true")
            ]);
        }));
    }

    export function clearingCacheMessage(){
        appendWebpageWidget(Widget.Builder.WidgetFactory.buildWebpage(siteContent => {
            siteContent.list(factory => [
                factory.markdown("#Clearing Cache\nUIX is currently clearing your cache ... please wait ...")
            ]);
        }));
    }
}