/// <reference path="../Static/SharedData/Informations.ts" />
/// <reference path="../../Libraries/Uri/Uri.ts" />
/// <reference path="../../Interface/ServiceWorkerInterface.ts" />

namespace UIX.Core.Tools.ClearCache{
    const shouldClearCache = checkIfInClearCacheMode();

    export function clearCacheIfRequired(){
        if(shouldClearCache){
            if(sessionStorage.getItem("UIX-Clear-Cache") === "true"){
                sessionStorage.clear();
                location.href = "/";
            }else{

                localStorage.clear();
                sessionStorage.clear();

                sessionStorage.setItem("UIX-Clear-Cache", "true");
                ServiceWorkerInterface.uninstallServiceWorkers().then(() => location.reload(true));
            }
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