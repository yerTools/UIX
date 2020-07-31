/// <reference path="BaseType/InputField.ts" />

namespace UIX.Libraries.FormGenerator.Input{
    export class TextInput extends BaseType.InputField<TextInput, string, HTMLInputElement|HTMLTextAreaElement>{

        public readonly multiline:boolean;
        public readonly placeholder?:string;

        public constructor(parent:Interface.IFormParent, name:string, multiline = false, placeholder?:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:string, sortingPriority?:number){
            super(parent, BaseType.InputType.Text, name, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
            this.multiline = multiline;
            this.placeholder = placeholder;
        }

        public reset(){
            return false;
        }

        public setValue(value:string){
            return false;
        }

        public getValue(){
            return undefined;
        }

        public getValueAsInputString(value:string){
            return value;
        }

        public getHTMLElement(namePrefix?:string){
            if(!this._htmlContainerElement){
                this._htmlInputElement = this.createInput(this.multiline ? "textarea" : "input", true, undefined, namePrefix);

                if(this.placeholder){
                    this._htmlInputElement.placeholder = this.placeholder;
                }

                this._htmlContainerElement = this.getContainerHTMLElement(this._htmlInputElement);
            }
            return this._htmlContainerElement;
        }

        public clone(){
            return new TextInput(this.parent, this.name, this.multiline, this.placeholder, this.displayName, this.description, this.isRequired, this.isReadOnly, this.defaultValue, this.sortingPriority);
        }

        public hasError(){
            return false;
        }

        public isReady(){
            return true;
        }
    }
}