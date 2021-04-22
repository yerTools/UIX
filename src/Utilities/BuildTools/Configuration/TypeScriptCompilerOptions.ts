/// <reference path="BuildToolsConfiguration.ts" />
/// <reference path="TypeScriptConfiguration.ts" />

namespace BuildTools.Configuration{

    export class TypeScriptCompilerOptions{
        public static fromBuildToolsConfig(buildToolsConfiguration:BuildToolsConfiguration, outFile:string, buildTarget:BuildTarget, targetVersion?:ESVersion):TypeScriptCompilerOptions{
            const typeScriptCompilerOptions = new TypeScriptCompilerOptions();

            typeScriptCompilerOptions.outFile = outFile;
            typeScriptCompilerOptions.target = targetVersion === undefined ? BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.defaultTarget : ESVersion[targetVersion];
            typeScriptCompilerOptions.downlevelIteration = BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.downlevelIterations;
            typeScriptCompilerOptions.strict = BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.strict;
            typeScriptCompilerOptions.pretty = BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.pretty;
            typeScriptCompilerOptions.preserveConstEnums = BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.preserveConstEnums;
            typeScriptCompilerOptions.removeComments = BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.removeComments;
            typeScriptCompilerOptions.sourceMap = BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.sourceMap;
            typeScriptCompilerOptions.declaration = BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.declaration;

            typeScriptCompilerOptions.lib = <string[]> Object.assign([], BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.libraries.default);
            
            switch(buildTarget){
                case BuildTarget.Browser:
                    Object.assign(typeScriptCompilerOptions.lib, BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.libraries.browser);
                    break;
                case BuildTarget.ServiceWorker:
                    Object.assign(typeScriptCompilerOptions.lib, BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.libraries.serviceWorker);
                break;
                case BuildTarget.WebWorker:
                    Object.assign(typeScriptCompilerOptions.lib, BuildToolsConfiguration.getBuildMode(buildToolsConfiguration).typeScript.libraries.webWorker);
                    break;
            }

            typeScriptCompilerOptions.inlineSources = typeScriptCompilerOptions.sourceMap;
            typeScriptCompilerOptions.mapRoot = typeScriptCompilerOptions.sourceMap ? buildToolsConfiguration.serverFileStructure.sourceMapDirectory : undefined;
            
            typeScriptCompilerOptions.alwaysStrict = 
                typeScriptCompilerOptions.noImplicitAny =
                typeScriptCompilerOptions.noImplicitReturns =
                typeScriptCompilerOptions.noImplicitThis =
                typeScriptCompilerOptions.strictBindCallApply =
                typeScriptCompilerOptions.strictFunctionTypes =
                typeScriptCompilerOptions.strictNullChecks =
                typeScriptCompilerOptions.strictPropertyInitialization =
                typeScriptCompilerOptions.noFallthroughCasesInSwitch = 
                typeScriptCompilerOptions.strict;

            return typeScriptCompilerOptions;
        }

        public watch:boolean = true;
        
        public target?:string;
        public lib?:string[];
        public downlevelIteration:boolean = false;

        public declaration:boolean = false;

        public strict:boolean = false;
        public alwaysStrict:boolean = false;
        public noImplicitAny:boolean = false;
        public noImplicitReturns:boolean = false;
        public noImplicitThis:boolean = false;
        public strictBindCallApply:boolean = false;
        public strictFunctionTypes:boolean = false;
        public strictNullChecks:boolean = false;
        public strictPropertyInitialization:boolean = false;
        public noFallthroughCasesInSwitch:boolean = false;
        
        public outFile?:string;

        public pretty:boolean = false;
        public preserveConstEnums:boolean = false;
        public removeComments:boolean = false;

        public sourceMap:boolean = false;
        public mapRoot?:string;
        public inlineSources:boolean = false;
    }
}