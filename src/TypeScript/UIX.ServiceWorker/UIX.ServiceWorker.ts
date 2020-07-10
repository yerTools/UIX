/// <reference path="../UIx/Polyfill/Polyfills.ts" />
/// <reference path="../UIX/Core/Static/SharedData/Informations.ts" />
/// <reference path="../UIX/Libraries/Uri/Uri.ts" />
/// <reference path="TypeDefinitions/ServiceWorker.d.ts" />
/// <reference path="Helper/ResponseHelper.ts" />
/// <reference path="Helper/FileType.ts" />
/// <reference path="Helper/LocalStorage.ts" />

namespace UIX.ServiceWorker{
    const WEB_CACHE_NAME = "UIX.WebCache";
    const WEB_CACHE_TIMESTAMP_NAME = "UIX.WebCacheTimestamp";
    const DATA_CACHE_NAME = "UIX.DataCache";
    const MAX_REQUEST_LOADING_TIME = 250;
    const MAX_CACHE_AGE = 1000 * 60 * 60 * 24;

    export const currentUri = new Libraries.Uri(location.href);
    export const webCacheTimestamp = new Helper.LocalStorage(WEB_CACHE_TIMESTAMP_NAME);

    function canBeCached(request:Request){
        return true;
    } 

    function fetchRequest(request:Request){
        return new Promise<Response>(async (resolve, reject) => {
            let requestUri = new Libraries.Uri(request.url);

            if(currentUri.isSameRoot(requestUri)){
                let now = new Date();
                let lastCacheTime:Date|undefined;
                {
                    let lastCacheTimeString = await webCacheTimestamp.get(requestUri.toString());
                    if(lastCacheTimeString){
                        try{
                            let date = new Date(lastCacheTimeString);
                            if(!isNaN(date.getTime())){
                                lastCacheTime = date;
                            }
                        }catch(error){}
                    }
                }

                let createNoCacheRequest = !lastCacheTime || (now.getTime() - lastCacheTime.getTime() > MAX_CACHE_AGE); 
                if(!createNoCacheRequest){
                    let fileType = Helper.FileType.get(request);
                    if(fileType === Helper.FileType.FileType.UIXWebpage){
                        createNoCacheRequest = true;
                    }
                }

                if(createNoCacheRequest){
                    let noCacheUri = requestUri.addQuery("uix-no-cache", new Date().getTime().toString());
                    request = new Request(noCacheUri.toString());
                    webCacheTimestamp.set(requestUri.toString(), new Date().toISOString());
                }
            }else if(!webCacheTimestamp.has(requestUri.toString())){
                webCacheTimestamp.set(requestUri.toString(), new Date().toISOString());
            }

            fetch(request).then(response => resolve(response)).catch(reason => reject(reason));
        });
    }

    async function fetchAndCache(request:Request, lastCachedResponse:Response|undefined){
        try{
            let response = await fetchRequest(request);

            let cache = await caches.open(WEB_CACHE_NAME);

            let responseClone = response.clone();
            if(lastCachedResponse){
                let equal = await Helper.ResponseHelper.equals(lastCachedResponse, responseClone);
                if(!equal){
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
        event.waitUntil(new Promise(async resolve =>{
            let webCache = await caches.open(WEB_CACHE_NAME);

            let requests = await webCache.keys();
            
            let fetchUrls:string[] = [];
            let fetchUrlsSet = new Set<string>();

            for(let i = 0; i < requests.length; i++){
                let fileType = Helper.FileType.get(requests[i]);
                if(Helper.FileType.isPartOfUIX(fileType)){
                    if(fileType === Helper.FileType.FileType.StartPage){
                        if(!fetchUrlsSet.has("/")){
                            fetchUrlsSet.add("/")
                            fetchUrls.push("/");
                        }
                    }else if(!fetchUrlsSet.has(requests[i].url)){
                        fetchUrlsSet.add(requests[i].url)
                        fetchUrls.push(requests[i].url);
                    }
                }
            }

            if(!fetchUrlsSet.has("/")){
                fetchUrls.push("/");
            }

            await caches.delete(WEB_CACHE_NAME);
            webCache = await caches.open(WEB_CACHE_NAME);

            await webCacheTimestamp.clear();

            await webCache.addAll(fetchUrls);

            self.skipWaiting();
            resolve();
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