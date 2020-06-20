/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
/// <reference path="MessageType.ts" />

namespace UIX.Core.WebWorker.Messages{
    export abstract class MessageContainer{
        private static lastId = 0;
        private static activeIds = 0;

        protected static lendNewId(){
            ++MessageContainer.activeIds;
            return ++MessageContainer.lastId;
        }

        protected static handBackId(){
            if(--MessageContainer.activeIds === 0){
                MessageContainer.lastId = 0;
            }
        }

        protected static isMessageContainer(value:any) : value is MessageContainer{
            return value && typeof value === "object" && value.baseType && value.id && value.messageType;
        }

        protected _rawMessage:any;
        public readonly baseType:string;
        public readonly id:number;
        public readonly messageType:MessageType;

        public get rawMessage(){
            return this._rawMessage;
        }

        protected constructor(baseType:string, messageType:MessageType, id:number, rawMessage:any){
            this.baseType = baseType;
            this.messageType = messageType;
            this.id = id;
            this._rawMessage = rawMessage;
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