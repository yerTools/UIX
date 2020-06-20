/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
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