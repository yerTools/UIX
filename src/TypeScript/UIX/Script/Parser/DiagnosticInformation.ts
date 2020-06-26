namespace UIX.Script.Parser{
    export class DiagnosticInformation{
        public static error(message:string, index?:number, length?:number){
            return new DiagnosticInformation(index === undefined ? null : index, "ERROR: " + message, length === undefined ? null : length);
        }

        public readonly index:number|null;
        public readonly message:string;
        public readonly length:number|null;

        public constructor(index:number|null, message:string, length:number|null){
            this.index = index;
            this.message = message;
            this.length = length;
        }

        public toString(){
            return this.message + (this.index === null ? "" : " @" + this.index + (this.length === null ? "" : "+" + this.length))
        }
    }
}