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