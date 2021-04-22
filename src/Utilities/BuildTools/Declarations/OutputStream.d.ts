interface OutputStream{
    setEncoding(encoding:string|"utf8"):this;
    on(eventName:string|"data", callback:(data:string|any)=>void):void;
}