/// <reference path="../Core/Static/SharedData/Informations.ts" />
/// <reference path="../Core/WebWorker/Communication.ts" />
/// <reference path="../Libraries/Ajax/AjaxRequest.ts" />
/// <reference path="../Libraries/Ajax/AjaxResult.ts" />
/// <reference path="../Core/WebWorker/Messages/FetchRequest.ts" />
/// <reference path="../Core/WebWorker/Messages/FetchResponse.ts" />
/// <reference path="../../UIX.AjaxWorker/UIX.AjaxWorker.ts" />

namespace UIX.AjaxInterface{
    const communication = new Core.WebWorker.Communication(YER_TOOLS_UIX_CONFIGURATION.fileSystem.path.jsRootPath + YER_TOOLS_UIX_CONFIGURATION.fileSystem.fileName.ajaxWorker, "AjaxWorker", AjaxWorker.WorkerInterface);

    async function request(ajaxRequest:Libraries.Ajax.AjaxRequest){
        let response = await communication.sendRequest(Core.WebWorker.Messages.FetchRequest.create(ajaxRequest));
        let fetchResponse = Core.WebWorker.Messages.FetchResponse.tryParse(response);
        if(fetchResponse){
            return fetchResponse.ajaxResult;
        }
        return null;
    }

    export async function get(url:string, data:null|ArrayBuffer|Blob|string|FormData = null){
        return request(Libraries.Ajax.AjaxRequest.get(url, data, true));
    }
}