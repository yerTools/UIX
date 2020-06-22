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