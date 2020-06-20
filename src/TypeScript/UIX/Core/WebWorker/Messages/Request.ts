/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
/// <reference path="MessageContainer.ts" />

namespace UIX.Core.WebWorker.Messages{
    export class Request extends MessageContainer{
        public static readonly baseTypeName = "Request";

        protected static isRequest(value:any) : value is Request{
            return MessageContainer.isMessageContainer(value) && value.baseType === Request.baseTypeName;
        }

        public static tryParse(value:any){
            if(this.isRequest(value)){
                return new Request(value.messageType, value.id, value._rawMessage);
            }
            return null;
        }

        public static fromMessageEvent(messageEvent:MessageEvent){
            return this.tryParse(messageEvent.data);
        }

        public static create(rawMessage?:any){
            return new Request(MessageType.Request, undefined, rawMessage);
        }

        protected constructor(messageType:MessageType, id?:number, rawMessage?:any){
            super(Request.baseTypeName, messageType, id ?? MessageContainer.lendNewId(), rawMessage);
        }

        public handBackId(){
            MessageContainer.handBackId();
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