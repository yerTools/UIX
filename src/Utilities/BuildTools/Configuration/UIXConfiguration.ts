/// <reference path="BuildToolsConfiguration.ts" />

namespace BuildTools.Configuration{

    export class UIXConfiguration{

        public constructor(buildToolsConfiguration:BuildToolsConfiguration){
            this.fileSystem.path.jsRootPath = buildToolsConfiguration.serverFileStructure.javaScriptRootPath;
        }

        public buildTime = new Date().toISOString();
        
        public fileSystem = {
            path: {
                jsRootPath: "/js/"
            },
            fileName: {
                uix: "UIX.js",
                ajaxWorker: "UIX.AjaxWorker.js",
                serviceWorker: "UIX.ServiceWorker.js"
            }
        };
    }
}