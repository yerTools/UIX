/// <reference path="../UIX/Core/Static/SharedData/Informations.ts" />
/// <reference path="TypeDefinitions/ServiceWorker.d.ts" />
/// <reference path="Helper/ResponseHelper.ts" />

namespace UIX.ServiceWorker{
    const WEB_CACHE_NAME = "UIX.WebCache";
    const DATA_CACHE_NAME = "UIX.DataCache";
    const MAX_REQUEST_LOADING_TIME = 250;


    function canBeCached(request:Request){
        return true;
    }

    function fetchRequest(request:Request){
        return fetch(request);
    }

    async function fetchAndCache(request:Request, lastCachedResponse:Response|undefined){
        try{
            let response = await fetchRequest(request);

            let cache = await caches.open(WEB_CACHE_NAME);

            let responseClone = response.clone();
            if(lastCachedResponse){
                let equal = await Helper.ResponseHelper.equals(lastCachedResponse, responseClone);
                if(!equal){
                    console.log("content of " + lastCachedResponse.url + " changed");
                    cache.put(request, response.clone());
                }
            }else{
                cache.put(request, responseClone);
            }

            return response;
        }catch(error){
            return lastCachedResponse;
        }
    }

    function onInstall(event:InstallEvent){
        event.waitUntil(caches.open(WEB_CACHE_NAME).then(cache => {
            return cache.addAll([

            ]).then(() => self.skipWaiting());
        }));
    }

    function onFetch(event:FetchEvent){
        if(canBeCached(event.request)){
            event.respondWith(new Promise(async resolve => {
                let cachedResponse = await caches.open(WEB_CACHE_NAME).then(cache => cache.match(event.request, {ignoreSearch: false}));
                let fetchPromise = fetchAndCache(event.request, cachedResponse?.clone());
                let timeoutHandle:number|null = null;
                if(cachedResponse){
                    timeoutHandle = setTimeout(()=>{
                        resolve(cachedResponse);
                    }, MAX_REQUEST_LOADING_TIME);
                }
                let fetchedResult = await fetchPromise;
                if(timeoutHandle !== null){
                    clearTimeout(timeoutHandle);
                }
                resolve(fetchedResult || cachedResponse);
            }));
        }else{
            event.respondWith(fetchRequest(event.request));
        }
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