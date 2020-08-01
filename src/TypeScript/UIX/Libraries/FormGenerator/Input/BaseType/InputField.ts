
/// <reference path="InputType.ts" />
/// <reference path="../Helper/IHTMLInputElementTagName.ts" />
/// <reference path="../Helper/IHTMLInputElementTypeName.ts" />
/// <reference path="../../Interface/IFormChild.ts" />
/// <reference path="../../Interface/IFormParent.ts" />

namespace UIX.Libraries.FormGenerator.Input.BaseType{
    export type AllowedInputValueType = string|number|boolean/*|Color|DateTime|TimeSpan*/|File;
    export type InputValueType = AllowedInputValueType|(AllowedInputValueType|InputValueType)[];

    export abstract class InputField<
                InputFieldType extends InputField<InputFieldType, ValueType>, 
                ValueType extends InputValueType> 
            implements Interface.IFormChild{
        
        public readonly parent:Interface.IFormParent;
        public readonly inputType:InputType;

        public readonly name:string;
        public readonly isVisible:boolean;

        public readonly defaultValue?:ValueType;
        public readonly sortingPriority?:number;

        public constructor(parent:Interface.IFormParent, inputType:InputType, name:string, isVisible = true, defaultValue?:ValueType, sortingPriority?:number){
            this.parent = parent;
            this.inputType = inputType;

            this.name = name;
            this.isVisible = isVisible;

            this.defaultValue = defaultValue;
            this.sortingPriority = sortingPriority;
        }

        protected createInput<TagName extends keyof Helper.IHTMLInputElementTagName, TypeName extends Helper.IHTMLInputElementTypeName[TagName]>(tagName:TagName, setDefaultValue:boolean, typeName?:TypeName, namePrefix?:string): Helper.IHTMLInputElementTagName[TagName]{
            let input = document.createElement(tagName);
            input.className = "form-input";

            input.name = namePrefix ? namePrefix + this.name : this.name;

            if(setDefaultValue && this.defaultValue){
                input.value = this.getValueAsInputString(this.defaultValue);
            }

            if(typeName){
                switch(tagName){
                    case "input":
                        (<HTMLInputElement>input).type = <string>typeName;
                        break;
                }
            }
            
            return input;
        }

        public getFormChildType(){ return Interface.FormChildType.InputField; }

        public abstract setValue(value:ValueType):boolean;
        public abstract getValue():ValueType|undefined;
        public abstract getValueAsInputString(value:ValueType):string;
        public abstract reset():boolean;
        public abstract clone():InputFieldType;

        public abstract getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType):HTMLElement;
        public abstract hasError():boolean;
        public abstract isReady():boolean;
    }
}