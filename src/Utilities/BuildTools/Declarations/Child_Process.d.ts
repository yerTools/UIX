/// <reference path="ChildProcess.d.ts" />

interface Child_Process{
    exec(command:string, options?:{
        cwd?:string
    }, callback?:(error:Error, stdout:string, stderr:string) => void):ChildProcess;
}