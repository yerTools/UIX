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