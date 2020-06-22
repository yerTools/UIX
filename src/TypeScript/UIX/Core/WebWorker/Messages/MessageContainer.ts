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