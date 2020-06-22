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