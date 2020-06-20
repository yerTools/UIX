/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
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

            Task.Factory.StartNew(async () =>
            {
                while (Running)
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
                }
            });
        }

        public void Stop()
        {
            Running = false;
        }
    }
}

/*
 * Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */