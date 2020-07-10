/// <reference path="IAjaxSettings.ts" />
/// <reference path="AjaxResult.ts" />
/// <reference path="AjaxRequest.ts" />

namespace UIX.Libraries.Ajax{
    export class Ajax{
        static get(url:string, data:null|ArrayBuffer|Blob|string|FormData = null, sendImmediately = true){
            return new Ajax(AjaxRequest.get(url, data, sendImmediately));
        }

        static async getAsync(url:string, data:null|ArrayBuffer|Blob|string|FormData = null, sendImmediately = true){
            return await this.get(url, data, sendImmediately).promise;
        }

        static post(url:string, data:null|ArrayBuffer|Blob|string|FormData = null, sendImmediately = true){
            return new Ajax(AjaxRequest.post(url, data, sendImmediately));
        }

        static async postAsync(url:string, data:null|ArrayBuffer|Blob|string|FormData = null, sendImmediately = true){
            return await this.post(url, data, sendImmediately).promise;
        }

        private xhr:XMLHttpRequest|null = null;
        private result:AjaxResult|null = null;

        private promiseResolves:Array<(resolve:AjaxResult|null)=>void> = [];
        private promiseRejects:Array<(resolve:AjaxResult|null)=>void> = [];

        private pending = true;

        private url:string;
        private data:null|ArrayBuffer|Blob|string|FormData;
        private usePost:boolean;
        
        public get isSuccessfull(){
            return this.result !== null && this.result.wasSuccessfully;
        }

        public get promise():Promise<AjaxResult|null>{
            return new Promise((resolve, reject) => {
                if(this.pending){
                    this.promiseResolves.push(resolve);
                    this.promiseRejects.push(reject);
                }else{
                    if(this.isSuccessfull){
                        resolve(this.result);
                    }else{
                        reject(this.result);
                    }
                }
            });
        }

        public constructor(ajaxRequest:AjaxRequest){
            this.url = ajaxRequest.url;
            this.data = ajaxRequest.data;
            this.usePost = ajaxRequest.usePost;

            if(ajaxRequest.sendImmediately){
                this.createAndSendXhr();
            }
        }

        private resolve(result:AjaxResult|null){
            this.result = result;
            this.pending = false;

            if(this.result){
                if(this.promiseResolves.length){
                    for(let i = 0; i !== this.promiseResolves.length; ++i){
                        this.promiseResolves[i](result);
                    }
                    this.promiseResolves.splice(0, this.promiseResolves.length);
                    this.promiseRejects.splice(0, this.promiseRejects.length);
                }
            }else{
                if(this.promiseRejects.length){
                    for(let i = 0; i !== this.promiseRejects.length; ++i){
                        this.promiseRejects[i](result);
                    }
                    this.promiseResolves.splice(0, this.promiseResolves.length);
                    this.promiseRejects.splice(0, this.promiseRejects.length);
                }
            }
        }

        private createAndSendXhr() {
            this.reset();

            this.xhr = new XMLHttpRequest();

            let xhr = this.xhr;
            let _this = this;
            this.xhr.onload = function () {
                if(_this.xhr === xhr){
                    _this.xhr = null;
                    _this.resolve(AjaxResult.fromXHR(xhr));
                }
            };

            this.xhr.onerror = function () {
                if(_this.xhr === xhr){
                    _this.xhr = null;
                    _this.resolve(null);
                }
            };

            this.xhr.open(this.usePost ? "POST" : "GET", this.url);

            if(this.data === null){
                this.xhr.send();
            }else{
                this.xhr.send(this.data)
            }
        }

        public async send(){
            this.createAndSendXhr();
            return await this.promise;
        }

        public reset(){
            if(this.xhr){
                this.xhr.abort();
                this.xhr = null;
            }
            this.result = null;
            this.pending = true;
        }
    }
}