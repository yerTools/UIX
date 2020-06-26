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
        private static char replacedirectorySlash;
        private static char replacedirectorySlashWith;


        static CommandExecuter()
        {
            char splitChar
                ;
            if (Environment.OSVersion.Platform == PlatformID.Win32NT)
            {
                splitChar = ';';
                replacedirectorySlash = '/';
                replacedirectorySlashWith = '\\';
            }
            else
            {
                splitChar = ':';
                replacedirectorySlash = '\\';
                replacedirectorySlashWith = '/';
                fileExtensions.Add("");
            }

            {
                string[] paths = (AppDomain.CurrentDomain.BaseDirectory + splitChar +
                        Environment.CurrentDirectory + splitChar +
                        Environment.GetEnvironmentVariable("PATH")).Replace(replacedirectorySlash, replacedirectorySlashWith).Split(splitChar, StringSplitOptions.RemoveEmptyEntries);


                HashSet<string> pathHashSet = new HashSet<string>();

                foreach (string path in paths)
                {
                    string trimedPath = path?.Trim().TrimEnd(replacedirectorySlashWith);
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
                    foreach (string extension in extensions.Split(splitChar, StringSplitOptions.RemoveEmptyEntries))
                    {
                        string trimedExtension = extension?.Trim().TrimStart('.').ToLower();
                        if (!string.IsNullOrEmpty(trimedExtension) && extensionHashSet.Add(trimedExtension))
                        {
                            fileExtensions.Add("." + trimedExtension);
                        }
                    }
                }
            }
        }

        public static FileInfo GetFileInfo(string executable)
        {
            executable = executable?.Trim().Replace(replacedirectorySlash, replacedirectorySlashWith);

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
                        fileInfo = new FileInfo(possiblePaths[x].FullName + replacedirectorySlashWith + executable);
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
                        fileInfo = new FileInfo((x >= 0 ? possiblePaths[x].FullName + replacedirectorySlashWith : "") + executable + fileExtensions[y]);
                        if (fileInfo.Exists)
                        {
                            return fileInfo;
                        }
                    }
                }
            }
            return null;
        }

        public enum StatusType
        {
            Running,
            SuccessfullyCompleted,
            ErrorOccurred
        }

        public Process CommandProcess { get; }
        public FileInfo Executable { get; }
        public string Name { get; set; }

        public StatusType Status
        {
            get
            {
                if (!CommandProcess.HasExited)
                {
                    return StatusType.Running;
                }
                if(CommandProcess.ExitCode == 0)
                {
                    return StatusType.SuccessfullyCompleted;
                }
                StartProcessOutputTasks();
                return StatusType.ErrorOccurred;
            }
        }

        private char[] charBuffer = new char[8192];
        private StringBuilder stringBuffer = new StringBuilder(32768);
        private bool muted = true;

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
                StartProcessOutputTasks();
            }
        }
    
        private void StartProcessOutputTasks()
        {
            if (muted)
            {
                muted = false;
                Task.Factory.StartNew(async () =>
                {
                    int runAfterExit = 2;
                    while (runAfterExit-- != 0)
                    {
                        int length = await CommandProcess.StandardOutput.ReadAsync(charBuffer);
                        stringBuffer.Append(charBuffer, 0, length);
                        await Task.Delay(2);
                        if (!CommandProcess.HasExited)
                        {
                            runAfterExit++;
                        }
                    }
                }, TaskCreationOptions.AttachedToParent);

                Task.Factory.StartNew(async () =>
                {
                    int runAfterExit = 2;
                    while (runAfterExit-- != 0)
                    {
                        int length = await CommandProcess.StandardError.ReadAsync(charBuffer);
                        stringBuffer.Append(charBuffer, 0, length);
                        await Task.Delay(2);
                        if (!CommandProcess.HasExited)
                        {
                            runAfterExit++;
                        }
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
                }else if(Status != StatusType.Running)
                {
                    stringBuffer.Clear();
                    return data.ToString();
                }
            }
            return null;
        }
    }
}