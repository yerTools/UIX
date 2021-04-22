/// <reference path="../Declarations/Child_Process.d.ts" />

namespace BuildTools.Worker{
    const child_process = <Child_Process>require("child_process"); 

    export class CommandExecuter{
        public name?:string;
        public running = true;
        public exitCode?:number;
        private childProcess:ChildProcess;
        private outputBuffer = "";

        constructor(command:string, args?:string, workingDirectory?:string, name?:string, mute = false){
            this.name = name;

            if(args){
                command += " " + args;
            }

            this.childProcess = child_process.exec(command, {
                cwd: workingDirectory
            }, (error, stdout, stderr) => {
                this.running = false;
                this.exitCode = this.childProcess.exitCode !== null ? this.childProcess.exitCode : undefined;

                if(error !== null){
                    console.log();
                    console.log("Error running CommandExecuter!" + (name ? " (" + name + ")" : ""));
                    console.error(error);
                    if(stdout){
                        console.warn("Stdout:");
                        console.error(stdout);
                    }
                    if(stderr){
                        console.warn("Stderr:");
                        console.error(stderr);
                    }
                }
            });

            if(!mute){
                this.childProcess.stdout.setEncoding("utf8");
                this.childProcess.stdout.on("data", data => this.outputBuffer += data);
    
                this.childProcess.stderr.setEncoding("utf8");
                this.childProcess.stderr.on("data", data => this.outputBuffer += data);
            }
        }

        public readLine(){
            if(this.outputBuffer){
                if(this.running){
                    let index = this.outputBuffer.indexOf("\n");
                    if(index !== -1){
                        const result = this.outputBuffer.substring(0, index);
                        this.outputBuffer = this.outputBuffer.substring(index + 1);
                        return result;
                    }
                }else{
                    const result = this.outputBuffer;
                    this.outputBuffer = "";
                    return result;
                }
            }
            return "";
        }
    }
}