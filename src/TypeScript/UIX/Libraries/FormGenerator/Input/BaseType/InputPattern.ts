namespace UIX.Libraries.FormGenerator.Input.BaseType{
    export class InputPattern{
        public readonly expression:string;
        public readonly description?:string;

        public constructor(expression:string, description?:string){
            this.expression = expression;
            this.description = description;
        }
    }
}