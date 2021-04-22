namespace BuildTools.Configuration{

    export enum ESVersion{
        ES5,
        ES2015,
        ES2016,
        ES2017,
        ES2018,
        ES2019,
        ES2020,
        ESNext
    }

    export class BuildToolsConfiguration{
        public static loadConfiguration(path:string):BuildToolsConfiguration{
            let configuration:BuildToolsConfiguration|undefined;

            if(fs.existsSync(path)){
                path = fs.realpathSync(path, {encoding: "utf8"});
                try{
                    console.log("Loading configuration from: " + path);
                    configuration = <BuildToolsConfiguration> JSON.parse(fs.readFileSync(path, {encoding: "utf8"}));
                }catch(error){
                    console.log("There was an exception while reading the configuration file!");
                    console.log(error);
                }
            }

            if(!configuration){
                configuration = new BuildToolsConfiguration();
                console.log("Writing default configuration to: " + path);
            }

            fs.writeFileSync(path, JSON.stringify(configuration, undefined, 4), {encoding: "utf8"});
            return configuration;
        }

        public static getBuildMode(buildToolsConfiguration:BuildToolsConfiguration){
            return buildToolsConfiguration.buildInRelease ? buildToolsConfiguration.buildModes.release : buildToolsConfiguration.buildModes.dev;
        }

        public constructor(){
            for(const entry in ESVersion){
                if(isNaN(+entry)){
                    this.buildModes.dev.typeScript.libraries.default.push(entry);
                    this.buildModes.release.typeScript.libraries.default.push(entry);
                }
            }
        }

        public buildInRelease:boolean = false;
        public muteAdditionalVersionsOutput:boolean = true;
        
        public serverFileStructure = {
            sourceMapDirectory: "/sourceMap/",
            javaScriptRootPath: "/js/",
            cssRootPath: "/css/",
            typeScriptDeclarationDirectory: "/declaration/"
        };

        public buildModes = {
            dev: {
                sass: {
                    compress: false,
                    sourceMap: true
                },

                typeScript: {
                    pretty: true,
                    preserveConstEnums: true,
                    removeComments: false,
                    declaration: true,
                    sourceMap: true,
                    downlevelIterations: true,
                    strict: true,
                    defaultTarget: ESVersion[ESVersion.ES5],
                    libraries: {
                        default: <string[]>[],
                        webWorker: ["WebWorker"],
                        serviceWorker: ["WebWorker"],
                        browser: ["DOM", "DOM.Iterable"]
                    }
                },

                copyDefaultContent: true
            },
            release: {
                sass: {
                    compress: true,
                    sourceMap: false
                },

                typeScript: {
                    pretty: false,
                    preserveConstEnums: true,
                    removeComments: true,
                    declaration: false,
                    sourceMap: false,
                    downlevelIterations: true,
                    strict: true,
                    defaultTarget: ESVersion[ESVersion.ES5],
                    libraries: {
                        default: <string[]>[],
                        webWorker: ["WebWorker"],
                        serviceWorker: ["WebWorker"],
                        browser: ["DOM", "DOM.Iterable"]
                    }
                },

                copyDefaultContent: false
            }
        }

        
    }
}