/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
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

/*
 * Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */