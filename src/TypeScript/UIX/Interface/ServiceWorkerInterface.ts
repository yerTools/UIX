/// <reference path="../Core/Static/SharedData/Informations.ts" />

namespace UIX.ServiceWorkerInterface{
    if(Core.Static.SharedData.Informations.features.serviceWorker){
        navigator.serviceWorker.register("/" + YER_TOOLS_UIX_CONFIGURATION.fileSystem.fileName.serviceWorker, {
            scope: "/"
        }).then(function(registration) {
            console.log('Service Worker Registered');
        });

        navigator.serviceWorker.ready.then(function(registration) {
            console.log('Service Worker Ready');
        });
    }

    export async function uninstallServiceWorkers(){
        if(Core.Static.SharedData.Informations.features.serviceWorker){
            let promises:Promise<boolean>[] = [];
            let registrations = await navigator.serviceWorker.getRegistrations();
            for(let i = 0; i < registrations.length; i++){
                promises.push(registrations[i].unregister());
            }
            await Promise.all(promises);
            return true;
        }
        return false;
    }
}