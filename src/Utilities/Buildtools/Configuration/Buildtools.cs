using System;
using System.Collections.Generic;
using System.Text;

namespace Buildtools.Configuration
{
    public class Buildtools
    {
        public enum ESVersion
        {
            ES5,
            ES2015,
            ES2016,
            ES2017,
            ES2018,
            ES2019,
            ES2020,
            ESNext
        }

        public bool BuildInRelease { get; set; } = true;
        public bool MuteAdditionalVersionsOutput { get; set; } = true;
        public SassSettings Sass { get; set; } = new SassSettings();
        public TypeScriptSettings TypeScript { get; set; } = new TypeScriptSettings();

        public WebServerFileStructure ServerFileStructure { get; set; } = new WebServerFileStructure();

        public class SassSettings
        {
            public bool Compress { get; set; } = true;
            public bool SourceMap { get; set; } = true;
        }

        public class TypeScriptSettings
        {
            public bool Pretty { get; set; } = true;
            public bool PreserveConstEnums { get; set; } = true;
            public bool RemoveComments { get; set; } = false;
            public bool Declaration { get; set; } = true;
            public bool SourceMap { get; set; } = true;
            public bool DownlevelIteration { get; set; } = true;
            public bool Strict { get; set; } = true;
            public string DefaultTarget { get; set; } = nameof(ESVersion.ES5);
            public IncludedLibraries Libraries { get; set; } = new IncludedLibraries();

            public class IncludedLibraries
            {
                public string[] Default { get; set; } = new string[] { };
                public string[] WebWorker { get; set; } = new string[] { "WebWorker" };
                public string[] ServiceWorker { get; set; } = new string[] { "WebWorker" };
                public string[] Browser { get; set; } = new string[] { "DOM", "DOM.Iterable" };

                public IncludedLibraries()
                {
                    List<string> defaultLibraries = new List<string>();

                    foreach(ESVersion esVersion in (ESVersion[])Enum.GetValues(typeof(ESVersion)))
                    {
                        defaultLibraries.Add(esVersion.ToString());
                    }

                    defaultLibraries.AddRange(Default);
                    Default = defaultLibraries.ToArray();
                }
            }
        }

        public class WebServerFileStructure
        {
            public string SoureMapDirectory { get; set; } = "/sourceMap/";
        }

        public TSConfig GenerateTSConfig(string outFile, TSConfig.BuildTarget buildTarget, ESVersion? targetVersion = null, string includePath = null)
        {
            return TSConfig.FromBuildtoolsConfig(this, outFile, buildTarget, targetVersion, includePath);
        }
    }
}