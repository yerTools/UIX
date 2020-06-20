/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
/// <reference path="../Static/SharedData/Informations.ts" />
/// <reference path="Interfaces/IWebWorker.ts" />
/// <reference path="Messages/Response.ts" />
/// <reference path="Messages/Request.ts" />

namespace UIX.Core.WebWorker{
    export class Communication{
        private webWorker:Worker|null = null;
        private webWorkerInterface:Interfaces.IWebWorker|null = null;
        private activeRequests:Map<number,(resolve:Messages.Response)=>void> = new Map();

        public constructor(workerUrl:string, workerName:string, fallbackWebWorker:Interfaces.IWebWorker){
            if(Static.SharedData.Informations.features.webWorker){
                try{
                    this.webWorker = new Worker(workerUrl, {name: workerName, credentials: "same-origin"});
                    this.webWorker.onmessage = event => {
                        let response = Messages.Response.receivedFromMessageEvent(event);
                        if(response){
                            let resolve = this.activeRequests.get(response.id);
                            if(resolve){
                                this.activeRequests.delete(response.id);
                                resolve(response);
                            }
                        }
                    };
                }catch(error){}
            }
            if(this.webWorker === null){
                this.webWorkerInterface = fallbackWebWorker;
            }
        }

        public sendRequest(request:Messages.Request){
            if(this.webWorkerInterface !== null){
                request.handBackId();
                return this.webWorkerInterface.processMessage(request);
            }
            return new Promise<Messages.Response>((resolve, reject) => {
                if(this.webWorker !== null){
                    this.activeRequests.set(request.id, resolve);
                    this.webWorker.postMessage(request);
                }else{
                    reject("unknown error");
                }
            });
        }
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