/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
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

            this.xhr.open(this.usePost ? "POST" : "GET", this.url);

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