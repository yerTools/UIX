namespace UIX.Libraries.FormGenerator.Input{
    export abstract class InputField<T>{
        public readonly inputType:InputType;

        public name:string;
        public isReadOnly:boolean;
        public isRequired:boolean;
        public displayName?:string;
        public defaultValue?:T;

        public constructor(inputType:InputType, name:string, isRequired = true, isReadOnly = false){
            this.inputType = inputType;

            this.name = name;
            this.isReadOnly = isReadOnly;
            this.isRequired = isRequired;
        }

        public abstract getValue():T|undefined;
        public abstract getHTMLElement():HTMLElement;
    }
}