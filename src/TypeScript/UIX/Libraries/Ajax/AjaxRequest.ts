/// <reference path="IAjaxSettings.ts" />
/// <reference path="../Uri/Uri.ts" />

namespace UIX.Libraries.Ajax{
    export class AjaxRequest{
        static get(url:string, data:null|ArrayBuffer|Blob|string|FormData = null, sendImmediately = true){
            return new AjaxRequest(new Uri(url).makeAbsolute().completePath, data, { sendImmediately: sendImmediately, usePost: false });
        }

        static post(url:string, data:null|ArrayBuffer|Blob|string|FormData = null, sendImmediately = true){
            return new AjaxRequest(new Uri(url).makeAbsolute().completePath, data, { sendImmediately: sendImmediately, usePost: true });
        }
        
        static clone(ajaxRequest:AjaxRequest){
            return new AjaxRequest(ajaxRequest.url, ajaxRequest.data, {sendImmediately: ajaxRequest.sendImmediately, usePost: ajaxRequest.usePost});
        }

        public url:string;
        public data:null|ArrayBuffer|Blob|string|FormData;
        public sendImmediately:boolean;
        public usePost:boolean;

        private constructor(uri:string, data:null|ArrayBuffer|Blob|string|FormData = null, {sendImmediately = true, usePost = false} : IAjaxSettings = {}){
            this.url = uri;
            this.data = data;
            this.sendImmediately = sendImmediately;
            this.usePost = usePost;
        }
    }
}