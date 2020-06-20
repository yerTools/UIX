/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
/// <reference path="Request.ts" />
/// <reference path="../../../Libraries/Ajax/AjaxRequest.ts" />

namespace UIX.Core.WebWorker.Messages{
    export class FetchRequest extends Request{
        public static isFetchRequest(value:any) : value is FetchRequest{
            return Request.isRequest(value) && value.messageType === MessageType.FetchRequest;
        }

        public static tryParse(value:any){
            if(this.isFetchRequest(value)){
                return new FetchRequest(value.id, Libraries.Ajax.AjaxRequest.clone(value._rawMessage));
            }
            return null;
        }

        public static fromMessageEvent(messageEvent:MessageEvent){
            return this.tryParse(messageEvent.data);
        }

        public static create(ajaxRequest:Libraries.Ajax.AjaxRequest){
            return new FetchRequest(undefined, ajaxRequest);
        }

        public get ajaxRequest(){
            return <Libraries.Ajax.AjaxRequest> this.rawMessage;
        }

        protected constructor(id:number|undefined, ajaxRequest:Libraries.Ajax.AjaxRequest){
            super(MessageType.FetchRequest, id, ajaxRequest);
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