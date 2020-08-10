namespace UIX.Libraries.FormGenerator.Input{
    export class TextInput extends InputField<string>{

        public constructor(name:string){
            super(InputType.Text, name);
        }

        public getValue(){
            return undefined;
        }

        public getHTMLElement(): HTMLElement {
            throw new Error("Method not implemented.");
        }
    }
}