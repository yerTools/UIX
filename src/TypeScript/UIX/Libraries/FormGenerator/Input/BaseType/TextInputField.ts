/// <reference path="VisibleInputField.ts" />
/// <reference path="InputPattern.ts" />

namespace UIX.Libraries.FormGenerator.Input.BaseType{

    export abstract class TextInputField<
                InputFieldType extends TextInputField<InputFieldType, HTMLInputElementType, HTMLInputElementTagName>,
                HTMLInputElementType extends HTMLInputElement|HTMLTextAreaElement,
                HTMLInputElementTagName extends "input"|"textarea">
            extends VisibleInputField<InputFieldType, string, HTMLInputElementType>{

        public readonly placeholder?:string;
        public readonly pattern?:InputPattern;
        public readonly minLength?:number;
        public readonly maxLength?:number;


        public constructor(
                parent:Interface.IFormParent, inputType:InputType, name:string,
                displayName?:string, description?:string, autofocus = false, autocomplete?:InputAutocompleteType,
                placeholder?:string, pattern?:InputPattern, minLength?:number, maxLength?:number,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:string, sortingPriority?:number){
            super(parent, inputType, name, displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);

            this.placeholder = placeholder;
            this.pattern = pattern;
            this.minLength = minLength;
            this.maxLength = maxLength;
        }

        protected createTextInput<TagName extends HTMLInputElementTagName, TypeName extends Helper.IHTMLInputElementTypeName[TagName]>(tagName:TagName, setDefaultValue:boolean, typeName?:TypeName, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType): Helper.IHTMLInputElementTagName[TagName]{
            let input = this.createVisibleInput(tagName, setDefaultValue, typeName, namePrefix, autocompleteSection, autocompleteAddressType);
            
            if(this.placeholder){
                input.placeholder = this.placeholder;
            }

            if(this.pattern && tagName === "input"){
                (<HTMLInputElement>input).pattern = this.pattern.expression;
            }
            if(this.minLength){
                input.minLength = this.minLength;
            }
            if(this.maxLength){
                input.maxLength = this.maxLength;
            }

            return input;
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

        public hasError(){
            return false;
        }

        public isReady(){
            return true;
        }
    }
}