/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Buildtools
{
    public class CommandExecuter
    {
        private static List<DirectoryInfo> possiblePaths = new List<DirectoryInfo>();
        private static List<string> fileExtensions = new List<string>();
        
        static CommandExecuter()
        {
            {
                string[] paths = (AppDomain.CurrentDomain.BaseDirectory + ";" +
                        Environment.CurrentDirectory + ";" +
                        Environment.GetEnvironmentVariable("PATH")).Replace('/', '\\').Split(';', StringSplitOptions.RemoveEmptyEntries);

                HashSet<string> pathHashSet = new HashSet<string>();

                foreach (string path in paths)
                {
                    string trimedPath = path?.Trim().TrimEnd('\\');
                    if (!string.IsNullOrEmpty(trimedPath) && pathHashSet.Add(trimedPath))
                    {
                        DirectoryInfo directoryInfo = new DirectoryInfo(path);
                        if (directoryInfo.Exists)
                        {
                            possiblePaths.Add(directoryInfo);
                        }
                    }
                }
            }

            {
                string extensions = Environment.GetEnvironmentVariable("PATHEXT");
                if (!string.IsNullOrWhiteSpace(extensions))
                {
                    HashSet<string> extensionHashSet = new HashSet<string>();
                    foreach (string extension in extensions.Split(';', StringSplitOptions.RemoveEmptyEntries))
                    {
                        string trimedExtension = extension?.Trim().TrimStart('.').ToLower();
                        if (!string.IsNullOrEmpty(trimedExtension) && extensionHashSet.Add(trimedExtension))
                        {
                            fileExtensions.Add("." + trimedExtension);
                        }
                    }
                }
            }
            Console.WriteLine();
        }

        public static FileInfo GetFileInfo(string executable)
        {
            executable = executable?.Trim().Replace('/', '\\');

            if (!string.IsNullOrEmpty(executable))
            {
                FileInfo fileInfo = new FileInfo(executable);
                if (fileInfo.Exists)
                {
                    return fileInfo;
                }
                bool hasFileExtension = !string.IsNullOrWhiteSpace(fileInfo.Extension);
                if (hasFileExtension)
                {
                    for (int x = 0; x < possiblePaths.Count; x++)
                    {
                        fileInfo = new FileInfo(possiblePaths[x].FullName + "\\" + executable);
                        if (fileInfo.Exists)
                        {
                            return fileInfo;
                        }
                    }
                }
                for (int x = - 1; x < possiblePaths.Count; x++)
                {
                    for (int y = 0; y < fileExtensions.Count; y++)
                    {
                        fileInfo = new FileInfo((x >= 0 ? possiblePaths[x].FullName + "\\" : "") + executable + fileExtensions[y]);
                        if (fileInfo.Exists)
                        {
                            return fileInfo;
                        }
                    }
                }
            }
            return null;
        }

        public Process CommandProcess { get; }
        public FileInfo Executable { get; }
        public string Name { get; set; }

        char[] charBuffer = new char[8192];
        private StringBuilder stringBuffer = new StringBuilder(32768);

        public CommandExecuter(string command, string arguments = null, DirectoryInfo workingDirectory = null, string name = null, bool mute = false)
        {
            Name = name;
            if (string.IsNullOrWhiteSpace(command))
            {
                throw new ArgumentNullException(nameof(command));
            }
            Executable = GetFileInfo(command);
            if (Executable == null)
            {
                throw new Exception("'" + nameof(command) + "' not found");
            }

            ProcessStartInfo processStartInfo = new ProcessStartInfo
            {
                FileName = Executable.FullName,
                Arguments = arguments,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                WorkingDirectory = workingDirectory?.FullName,
                RedirectStandardInput = true,
                WindowStyle = ProcessWindowStyle.Hidden,
                CreateNoWindow = true,
                StandardOutputEncoding = Encoding.UTF8
            };

            CommandProcess = Process.Start(processStartInfo);

            if (!mute)
            {
                Task.Factory.StartNew(async () =>
                {
                    while (!CommandProcess.HasExited)
                    {
                        int length = await CommandProcess.StandardOutput.ReadAsync(charBuffer);
                        stringBuffer.Append(charBuffer, 0, length);
                        await Task.Delay(1);
                    }
                }, TaskCreationOptions.AttachedToParent);
            }
        }
    
        public string ReadLine()
        {
            if(stringBuffer.Length > 0)
            {
                ReadOnlySpan<char> data = stringBuffer.ToString().AsSpan();
                int index = data.IndexOf('\n');
                if(index != -1)
                {
                    stringBuffer.Remove(0, index + 1);
                    return data.Slice(0, index + 1).ToString();
                }
            }
            return null;
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