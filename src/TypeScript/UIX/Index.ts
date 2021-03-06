/// <reference path="UIX.ts" />

namespace UIX{
    if(!Core.Tools.ClearCache.clearCacheIfRequired()){
        const UIX_DEVELOPMENT_MODE = false;

        if(UIX_DEVELOPMENT_MODE){
            WidgetSystem.Render.fallback();
        }else{
            let success = false;
            {
                let localStoredWebsite = localStorage.getItem("webpage");
                if(localStoredWebsite){
                    success = WidgetSystem.Render.fromJson(localStoredWebsite);
                }
            }
            if(!success){
                AjaxInterface.get("/Webpage.uix.json").then(response => {
                    if(response && response.wasSuccessfully){
                        success = WidgetSystem.Render.fromResponse(response);
                    }

                    if(!success){
                        AjaxInterface.get("https://uix.yer.tools/Webpage.uix.json").then(fallbackResponse => {
                            if(fallbackResponse && fallbackResponse.wasSuccessfully){
                                success = WidgetSystem.Render.fromResponse(fallbackResponse);
                            }
                            
                            if(!success && !WidgetSystem.Render.redirectToEditMode()){
                                WidgetSystem.Render.fallback();
                            }
                        });
                    }
                });
            }
        }
    }else{
        WidgetSystem.Render.clearingCacheMessage();
    }
}