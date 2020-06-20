/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
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