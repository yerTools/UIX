/// <reference path="OutputStream.d.ts" />

interface ChildProcess{
    exitCode:number|null,
    kill():boolean,
    killed:boolean,
    stderr:OutputStream,
    stdout:OutputStream
}