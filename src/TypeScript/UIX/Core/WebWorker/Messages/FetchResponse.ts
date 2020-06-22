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