/// <reference path="../UIX/Core/Static/SharedData/Informations.ts" />
/// <reference path="TypeDefinitions/ServiceWorker.d.ts" />

namespace UIX.ServiceWorker{
    const WEB_CACHE_NAME = "UIX.WebCache";
    const DATA_CACHE_NAME = "UIX.DataCache";

    function onInstall(event:InstallEvent){
        event.waitUntil(caches.open(WEB_CACHE_NAME).then(cache => {
            return cache.addAll([

            ]).then(() => self.skipWaiting());
        }));
    }

    function onFetch(event:FetchEvent){
        event.respondWith(
            caches.open(WEB_CACHE_NAME).then(cache => {
                return cache.match(event.request, {ignoreSearch: true})
            })
            .then(response => {
                return response || fetch(event.request);
            })
        );
    }

    function onActivate(event:ActivateEvent){
        event.waitUntil(self.clients.claim());
    }
    
    if(!Core.Static.SharedData.Informations.isInBrowserContext){
        self.addEventListener("install", (event:any) => onInstall(event));
        self.addEventListener("fetch", (event:any) => onFetch(event));
        self.addEventListener("activate", (event:any) => onActivate(event));
    }
}