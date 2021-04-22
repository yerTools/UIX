/// <reference path="BuildToolsConfiguration.ts" />
/// <reference path="TypeScriptCompilerOptions.ts" />

namespace BuildTools.Configuration{

    export enum BuildTarget{
        Browser,
        WebWorker,
        ServiceWorker
    }

    export class TypeScriptConfiguration{
        public static fromBuildToolsConfig(buildToolsConfiguration:BuildToolsConfiguration, outFile:string, buildTarget:BuildTarget, targetVersion?:ESVersion, includePath?:string):TypeScriptConfiguration{
            const typeScriptConfiguration = new TypeScriptConfiguration();
            typeScriptConfiguration.compilerOptions = TypeScriptCompilerOptions.fromBuildToolsConfig(buildToolsConfiguration, outFile, buildTarget, targetVersion);
            typeScriptConfiguration.include = [ includePath ? includePath : "./**/*"];
            return typeScriptConfiguration;
        }

        public compileOnSave:boolean = true;
        public compilerOptions?:TypeScriptCompilerOptions;
        public include?:string[];
    }
}