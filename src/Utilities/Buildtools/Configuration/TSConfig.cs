using System;
using System.Collections.Generic;
using System.Text;

namespace Buildtools.Configuration
{
    public class TSConfig
    {
        public enum BuildTarget
        {
            Browser,
            WebWorker,
            ServiceWorker
        }

        public bool compileOnSave = true;
        public CompilerOptions compilerOptions;
        public string[] include;

        public static TSConfig FromBuildtoolsConfig(Buildtools buildtools, string outFile, BuildTarget buildTarget, Buildtools.ESVersion? targetVersion = null, string includePath = null)
        {
            return new TSConfig() {
                compilerOptions = CompilerOptions.FromBuildtoolsConfig(buildtools, outFile, buildTarget, targetVersion),
                include = new string[] { string.IsNullOrWhiteSpace(includePath) ? "./**/*" : includePath }
            };
        }

        public class CompilerOptions
        {
            public static CompilerOptions FromBuildtoolsConfig(Buildtools buildtools, string outFile, BuildTarget buildTarget, Buildtools.ESVersion? targetVersion = null)
            {
                CompilerOptions compilerOptions = new CompilerOptions() {
                    outFile = outFile,
                    target = targetVersion == null ? buildtools.TypeScript.DefaultTarget : targetVersion.ToString(),
                    downlevelIteration = buildtools.TypeScript.DownlevelIteration,
                    strict = buildtools.TypeScript.Strict,
                    pretty = buildtools.BuildInRelease ? false : buildtools.TypeScript.Pretty,
                    preserveConstEnums = buildtools.BuildInRelease ? false : buildtools.TypeScript.PreserveConstEnums,
                    removeComments = buildtools.BuildInRelease ? true : buildtools.TypeScript.RemoveComments,
                    sourceMap = buildtools.TypeScript.SourceMap,
                    declaration = buildtools.TypeScript.Declaration
                };

                List<string> libraries = new List<string>(buildtools.TypeScript.Libraries.Default);

                switch (buildTarget)
                {
                    case BuildTarget.Browser:
                        libraries.AddRange(buildtools.TypeScript.Libraries.Browser);
                        break;
                    case BuildTarget.ServiceWorker:
                        libraries.AddRange(buildtools.TypeScript.Libraries.ServiceWorker);
                        break;
                    case BuildTarget.WebWorker:
                        libraries.AddRange(buildtools.TypeScript.Libraries.WebWorker);
                        break;
                }

                compilerOptions.lib = libraries.ToArray();

                compilerOptions.inlineSources = compilerOptions.sourceMap;

                compilerOptions.mapRoot = compilerOptions.sourceMap ? buildtools.ServerFileStructure.SoureMapDirectory : null;

                compilerOptions.alwaysStrict = 
                    compilerOptions.noImplicitAny =  
                    compilerOptions.noImplicitReturns = 
                    compilerOptions.noImplicitThis = 
                    compilerOptions.strictBindCallApply = 
                    compilerOptions.strictFunctionTypes = 
                    compilerOptions.strictNullChecks = 
                    compilerOptions.strictPropertyInitialization = 
                    compilerOptions.noFallthroughCasesInSwitch = compilerOptions.strict;

                return compilerOptions;
            }

            public bool watch = true;

            public string target;
            public string[] lib;
            public bool downlevelIteration;

            public bool declaration;


            public bool strict;
            public bool alwaysStrict;
            public bool noImplicitAny;
            public bool noImplicitReturns;
            public bool noImplicitThis;
            public bool strictBindCallApply;
            public bool strictFunctionTypes;
            public bool strictNullChecks;
            public bool strictPropertyInitialization;
            public bool noFallthroughCasesInSwitch;

            public string outFile;

            public bool pretty;
            public bool preserveConstEnums;
            public bool removeComments;

            public bool sourceMap;
            public string mapRoot;
            public bool inlineSources;
        }
    }
}