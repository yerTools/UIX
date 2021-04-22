/// <reference path="BuildToolsConfiguration.ts" />

namespace BuildTools.Configuration{

    export class JestConfiguration{

        public constructor(buildToolsConfiguration:BuildToolsConfiguration, outputDirectory:string){
            this.fileSystem.path.jsRootPath = outputDirectory + "/" + buildToolsConfiguration.serverFileStructure.javaScriptRootPath;
            fs.mkdirSync(this.fileSystem.path.jsRootPath, {recursive: true});
            this.fileSystem.path.jsRootPath = fs.realpathSync(this.fileSystem.path.jsRootPath, {encoding: "utf8"}) + "/";
            this.releaseMode = buildToolsConfiguration.buildInRelease;
        }

        public releaseMode = false;

        public fileSystem = {
            path: {
                jsRootPath: "/js/"
            },
            testFiles: [
                "UIX.js"
            ]
        };
    }
}