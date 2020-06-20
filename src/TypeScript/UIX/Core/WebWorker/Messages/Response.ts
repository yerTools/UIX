/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
/// <reference path="MessageContainer.ts" />
/// <reference path="Request.ts" />

namespace UIX.Core.WebWorker.Messages{
    export class Response extends MessageContainer{
        public static readonly baseTypeName = "Response";

        protected static isResponse(value:any) : value is Response{
            return MessageContainer.isMessageContainer(value) && value.baseType === Response.baseTypeName;
        }

        public static tryParse(value:any){
            if(this.isResponse(value)){
                return new Response(value.messageType, value.id, value._rawMessage);
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

        public static create(request:Request, rawMessage?:any){
            return new Response(MessageType.Response, request.id, rawMessage);
        }

        protected constructor(messageType:MessageType, id:number, rawMessage?:any){
            super(Response.baseTypeName, messageType, id, rawMessage);
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