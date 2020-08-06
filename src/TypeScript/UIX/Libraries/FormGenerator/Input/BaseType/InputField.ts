
/// <reference path="InputType.ts" />
/// <reference path="../ValueType/NumberValue.ts" />
/// <reference path="../Helper/IHTMLInputElementTagName.ts" />
/// <reference path="../Helper/IHTMLInputElementTypeName.ts" />
/// <reference path="../../Interface/IFormChild.ts" />
/// <reference path="../../Interface/IFormParent.ts" />

namespace UIX.Libraries.FormGenerator.Input.BaseType{
    export type AllowedInputValueType = string|ValueType.NumberValue|boolean/*|Color|DateTime|TimeSpan*/|File;
    export type InputValueType = AllowedInputValueType|(AllowedInputValueType|InputValueType)[];

    export abstract class InputField<
                InputFieldType extends InputField<InputFieldType, ValueType, HTMLInputElementType>, 
                ValueType extends InputValueType,
                HTMLInputElementType extends HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement|HTMLButtonElement> 
            implements Interface.IFormChild{
        
        private static currentId = 0;
        protected static getId(){
            return "uix-form-generator-" + (++this.currentId);
        }

        public readonly parent:Interface.IFormParent;
        public readonly inputType:InputType;

        public readonly name:string;
        public readonly isVisible:boolean;

        public readonly defaultValue?:ValueType;
        public readonly sortingPriority?:number;

        protected _htmlInputElement?:HTMLInputElementType;
        protected _lastRawValue?:string;

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

            if(tagName === "input" && typeName === "checkbox"){
                if(this._lastRawValue !== undefined){
                    (<HTMLInputElement>input).checked = this._lastRawValue === "true";
                }else if(setDefaultValue && this.defaultValue !== undefined){
                    this._lastRawValue = this.getValueAsInputString(this.defaultValue);
                    (<HTMLInputElement>input).checked = this._lastRawValue === "true";
                }
            }else{
                if(this._lastRawValue !== undefined){
                    input.value = this._lastRawValue;
                }else if(setDefaultValue && this.defaultValue !== undefined){
                    this._lastRawValue = this.getValueAsInputString(this.defaultValue);
                    input.value = this._lastRawValue;
                }
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

        protected setInputRawValue(value:string){
            if(this._lastRawValue !== value){
                this._lastRawValue = value;
                if(this._htmlInputElement){
                    this._htmlInputElement.value = value;
                    return true;
                }
            }
            return false;
        }

        protected getInputRawValue(){
            if(this._htmlInputElement){
                 return this._htmlInputElement.value;
            }
            return undefined;
        }

        public getFormChildType(){ return Interface.FormChildType.InputField; }

        public abstract setValue(value:ValueType):boolean;
        public abstract getValue():ValueType|undefined;
        public abstract getValueAsInputString(value:ValueType):string;
        public abstract reset():boolean;
        public abstract clone():InputFieldType;

        public abstract getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType):HTMLElement;
        public abstract hasError():boolean;
        public abstract checkValidity(showError:boolean):boolean;
    }
}