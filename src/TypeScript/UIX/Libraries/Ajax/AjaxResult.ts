namespace UIX.Libraries.Ajax{
    export class AjaxResult{
        static fromXHR(xhr:XMLHttpRequest){
            return new AjaxResult(xhr.status, xhr.statusText, xhr.responseURL, xhr.response);
        }

        static error(url?:string, errorMessage?:string, errorData?:any){
            return new AjaxResult(-1, errorMessage ?? "unknown error", url ?? "error", errorData);
        }

        static clone(ajaxResult:AjaxResult){
            return new AjaxResult(ajaxResult.status, ajaxResult.statusText, ajaxResult.url, ajaxResult.response);
        }

        public status:number;
        public statusText:string;
        public url:string;
        public response:any;

        public get wasSuccessfully(){
            return this.status >= 200 && this.status < 300;
        }

        public constructor(status:number, statusText:string, url:string, response:any){
            this.status = status;
            this.statusText = statusText;
            this.url = url;
            this.response = response;

            if(typeof response === "string"){
                try{
                    this.response = JSON.parse(response);
                }catch(error){}
            }
        }

        
        
    }
}