/// <reference path="../Core/Static/SharedData/Informations.ts" />
/// <reference path="../Libraries/Uri/Uri.ts" />

namespace UIX.ServiceWorkerInterface{
    export const serviceWorkerUri = Libraries.Uri.current.withRelative(new Libraries.Uri("/" + YER_TOOLS_UIX_CONFIGURATION.fileSystem.fileName.serviceWorker)); 

    if(Core.Static.SharedData.Informations.features.serviceWorker){
        navigator.serviceWorker.register(serviceWorkerUri.completePath, {
            scope: "/"
        }).then(function(registration) {
            if(registration.active){
                registration.update();
            }
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