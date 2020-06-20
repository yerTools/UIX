/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
/// <reference path="../UIX/Core/Static/SharedData/Informations.ts" />
/// <reference path="../UIX/Core/WebWorker/Interfaces/IWebWorker.ts" />
/// <reference path="../UIX/Core/WebWorker/Messages/Request.ts" />
/// <reference path="../UIX/Core/WebWorker/Messages/FetchRequest.ts" />
/// <reference path="../UIX/Core/WebWorker/Messages/FetchResponse.ts" />
/// <reference path="../UIX/Libraries/Ajax/Ajax.ts" />

namespace UIX.AjaxWorker{
    declare function postMessage(message: any, options?: PostMessageOptions): void;

    export const WorkerInterface : Core.WebWorker.Interfaces.IWebWorker = {
        async processMessage(request:Core.WebWorker.Messages.Request){
            let result:Libraries.Ajax.AjaxResult|null = null;
 
            if(Core.WebWorker.Messages.FetchRequest.isFetchRequest(request)){
                if(!request.ajaxRequest.sendImmediately){
                    request.ajaxRequest.sendImmediately = true;
                }
    
                try{
                    result = await new Libraries.Ajax.Ajax(request.ajaxRequest).promise
                }catch (e){
                    result = null;
                }
                if(result === null){
                    result = Libraries.Ajax.AjaxResult.error(request.ajaxRequest.url);
                }
            }else{
                result = Libraries.Ajax.AjaxResult.error();
            }

            return Core.WebWorker.Messages.FetchResponse.create(request, result);
        }
    };
    
    if(!Core.Static.SharedData.Informations.isInBrowserContext){
        self.onmessage = (event:MessageEvent) => {
            let request = Core.WebWorker.Messages.FetchRequest.fromMessageEvent(event);
            if(request){
                WorkerInterface.processMessage(request).then(result => postMessage(result));
            }
        };
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