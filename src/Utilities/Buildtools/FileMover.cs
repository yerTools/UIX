using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Buildtools
{
    public class FileMover
    {
        public bool Running { get; private set; } = true;
        public Task MoverTask { get; }
        public FileMover(DirectoryInfo sourceDirectory, DirectoryInfo targetDirectory, string searchPattern)
        {
            if (!sourceDirectory.Exists)
            {
                sourceDirectory.Create();
            }
            if (!targetDirectory.Exists)
            {
                targetDirectory.Create();
            }

            Uri sourceUri = new Uri(sourceDirectory.FullName + "\\", UriKind.Absolute);
            Uri targetUri = new Uri(targetDirectory.FullName + "\\", UriKind.Absolute);

            bool isTargetInSource = sourceUri.IsBaseOf(targetUri);

            MoverTask = Task.Factory.StartNew(async () =>
            {
                int runAfterExit = 2;
                while (runAfterExit-- != 0)
                {
                    foreach (FileInfo fileInfo in sourceDirectory.GetFiles(searchPattern, SearchOption.AllDirectories))
                    {
                        if (!isTargetInSource || !targetUri.IsBaseOf(new Uri(fileInfo.Directory.FullName + "\\", UriKind.Absolute)))
                        {
                            try
                            {
                                FileInfo targetFile = new FileInfo(targetDirectory.FullName + "\\" + fileInfo.Name);
                                if (targetFile.Exists)
                                {
                                    targetFile.Delete();
                                }
                                fileInfo.MoveTo(targetFile.FullName, true);
                            }
                            catch { }
                        }
                    }
                    await Task.Delay(500);

                    if (Running)
                    {
                        runAfterExit++;
                    }
                }
            });
        }

        public void Stop()
        {
            Running = false;
        }
    }
}