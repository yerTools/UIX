/// <reference path="BaseType/TextInputField.ts" />

namespace UIX.Libraries.FormGenerator.Input{
    export class TextInput extends BaseType.TextInputField<TextInput, HTMLInputElement|HTMLTextAreaElement, "input"|"textarea">{

        public readonly multiline:boolean;

        public constructor(
                parent:Interface.IFormParent, name:string, multiline = false,
                displayName?:string, description?:string, autofocus = false, autocomplete?:BaseType.InputAutocompleteType,
                placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:string, sortingPriority?:number){
            super(parent, BaseType.InputType.Text, name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
            
            this.multiline = multiline;
        }

        public getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType){
            if(!this._htmlContainerElement){
                this._htmlInputElement = this.createTextInput(this.multiline ? "textarea" : "input", true, undefined, namePrefix, autocompleteSection, autocompleteAddressType);
                this._htmlContainerElement = this.getContainerHTMLElement(this._htmlInputElement);
            }
            return this._htmlContainerElement;
        }

        public clone(){
            return new TextInput(this.parent, this.name, this.multiline, this.displayName, this.description, this.autofocus, this.autocomplete, this.placeholder, this.pattern, this.minLength, this.maxLength, this.isRequired, this.isReadOnly, this.isDisabled, this.defaultValue, this.sortingPriority);
        }

    }
}