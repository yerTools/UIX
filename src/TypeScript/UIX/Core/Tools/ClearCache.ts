/// <reference path="../Static/SharedData/Informations.ts" />
/// <reference path="../../Libraries/Uri/Uri.ts" />
/// <reference path="../../Interface/ServiceWorkerInterface.ts" />

namespace UIX.Core.Tools.ClearCache{
    const shouldClearCache = checkIfInClearCacheMode();

    export function clearCacheIfRequired(){
        if(shouldClearCache){
            let lastClearCountText = sessionStorage.getItem("UIX-Clear-Cache");
            let lastClearCount:number|undefined;
            if(lastClearCountText){
                lastClearCount = parseInt(lastClearCountText);
                if(isNaN(lastClearCount)){
                    lastClearCount = undefined;
                }
            }
            if(lastClearCount === undefined){
                lastClearCount = 0;
            }
            if(lastClearCount < 3){
                localStorage.clear();
                sessionStorage.clear();

                sessionStorage.setItem("UIX-Clear-Cache", (lastClearCount + 1).toString());
                ServiceWorkerInterface.uninstallServiceWorkers().then(() => setTimeout(() => location.reload(true), 1500));
            }else{
                location.href = "/";
            }
        }else if(sessionStorage.getItem("UIX-Clear-Cache")){
            sessionStorage.clear();
            setTimeout(() => location.reload(true), 1500);
        }
            
        return shouldClearCache;
    }

    function checkIfInClearCacheMode(){
        if(Core.Static.SharedData.Informations.isInBrowserContext){
            if(Libraries.Uri.current.query){
                let parts = Libraries.Uri.current.query.split('&');
                for(let i = 0; i < parts.length; i++){
                    if(parts[i] === "UIX-Clear-Cache=true"){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}