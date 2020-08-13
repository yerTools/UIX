namespace UIX.Libraries.FormGenerator.Input.BaseType{
    export class InputPattern{
        public readonly expression:string;
        public readonly description?:string;
        public readonly regex?:RegExp;

        public constructor(expression:string, description?:string){
            this.expression = expression;
            this.description = description;

            if(expression){
                try{
                    this.regex = new RegExp("^(?:" + expression + ")$", "u");
                }catch(error){}
            }
        }
    }
}