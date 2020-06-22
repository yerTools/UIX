/// <reference path="../Messages/Request.ts" />
/// <reference path="../Messages/Response.ts" />

namespace UIX.Core.WebWorker.Interfaces{
    export interface IWebWorker{
        processMessage(request:Messages.Request):Promise<Messages.Response>;
    }
}