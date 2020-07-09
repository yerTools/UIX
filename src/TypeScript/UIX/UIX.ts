/// <reference path="Core/Static/Initialization.ts" />
/// <reference path="Interface/AjaxInterface.ts" />
/// <reference path="Interface/ServiceWorkerInterface.ts" />
/// <reference path="WidgetSystem/Render.ts" />

namespace UIX{
    let success = false;
    let localStoredWebsite = localStorage.getItem("webpage");
    if(localStoredWebsite){
        success = WidgetSystem.Render.fromJson(localStoredWebsite);
    }
    if(!success){
        AjaxInterface.get("/Webpage.json").then(response => {
            if(response && response.wasSuccessfully){
                success = WidgetSystem.Render.fromResponse(response);
            }

            if(!success){
                AjaxInterface.get("https://uix.yer.tools/Webpage.json").then(fallbackResponse => {
                    if(fallbackResponse && fallbackResponse.wasSuccessfully){
                        success = WidgetSystem.Render.fromResponse(fallbackResponse);
                    }
                });
            }
        });
    }
    WidgetSystem.Render.test();
    WidgetSystem.Render.checkIfInEditMode();
}