/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
/// <reference path="Response.ts" />
/// <reference path="Request.ts" />
/// <reference path="FetchRequest.ts" />
/// <reference path="../../../Libraries/Ajax/AjaxResult.ts" />

namespace UIX.Core.WebWorker.Messages{
    export class FetchResponse extends Response{

        public static isFetchResponse(value:any) : value is FetchResponse{
            return Response.isResponse(value) && value.messageType === MessageType.FetchResponse;
        }

        public static tryParse(value:any){
            if(this.isFetchResponse(value)){
                return new FetchResponse(value.id, Libraries.Ajax.AjaxResult.clone(value._rawMessage));
            }
            return null;
        }

        public static receivedFromMessageEvent(messageEvent:MessageEvent){
            let response = this.tryParse(messageEvent.data);
            if(response){
                MessageContainer.handBackId();
            }
            return response;
        }

        public static create(request:Request, ajaxResult:Libraries.Ajax.AjaxResult){
            return new FetchResponse(request.id, ajaxResult);
        }

        public get ajaxResult(){
            return <Libraries.Ajax.AjaxResult> this.rawMessage;
        }

        protected constructor(id:number, ajaxResult:Libraries.Ajax.AjaxResult){
            super(MessageType.FetchResponse, id, ajaxResult);
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