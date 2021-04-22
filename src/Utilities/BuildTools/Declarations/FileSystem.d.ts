/// <reference path="DirectoryEntry.d.ts" />

interface FileSystem{
    existsSync(path:string):boolean;
    readFileSync(path:string, options?:{encoding?:string|"utf8"}):string;
    writeFileSync(file:string, data:string, options?:{encoding?:string|"utf8"}):string;
    realpathSync(path:string, options?:{encoding?:string|"utf8"}):string;
    rmSync(path:string, options?:{force?:boolean, maxRetries?:number, recursive?:boolean, retryDelay?:number}):void;
    mkdirSync(path:string, options?:{recursive?:boolean}):void;
    readdirSync(path:string, options?:{encoding?:string|"utf8", withFileTypes?:false}):string[];
    readdirSync(path:string, options?:{encoding?:string|"utf8", withFileTypes:true}):DirectoryEntry[];
    renameSync(oldPath:string, newPath:string):void;
    copyFileSync(src:string, dest:string):void;
}