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