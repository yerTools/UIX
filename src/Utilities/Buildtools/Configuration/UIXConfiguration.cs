using System;
using System.Collections.Generic;
using System.Text;

namespace Buildtools.Configuration
{
    public class UIXConfiguration
    {
        public UIXConfiguration(Buildtools buildtools)
        {
            fileSystem.path.jsRootPath = buildtools.ServerFileStructure.JavaScriptRootPath;
        }

        public string buildTime = DateTime.UtcNow.ToString("o");
        public FileSystem fileSystem = new FileSystem();

        public class FileSystem
        {
            public Path path = new Path();
            public FileName fileName = new FileName();

            public class Path
            {
                public string jsRootPath = "/js/";
            }

            public class FileName
            {
                public string uix = "UIX.js";
                public string ajaxWorker = "UIX.AjaxWorker.js";
                public string serviceWorker = "UIX.ServiceWorker.js";
            }
        }
    }
}
