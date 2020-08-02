/// <reference path="BaseType/TextInputField.ts" />

namespace UIX.Libraries.FormGenerator.Input{
    export class TextBoxInput extends BaseType.TextInputField<TextBoxInput, HTMLTextAreaElement, "textarea">{

        public constructor(
                parent:Interface.IFormParent, name:string,
                displayName?:string, description?:string, autofocus = false, autocomplete?:BaseType.InputAutocompleteType,
                placeholder?:string, pattern?:BaseType.InputPattern, minLength?:number, maxLength?:number,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:string, sortingPriority?:number){
            super(parent, BaseType.InputType.Email, name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }

        protected valueChanged(rawValue:string){

        }

        public getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType){
            if(!this._htmlContainerElement){
                this._htmlInputElement = this.createTextInput("textarea", true, undefined, namePrefix, autocompleteSection, autocompleteAddressType);
                this._htmlContainerElement = this.getContainerHTMLElement(this._htmlInputElement);
            }
            return this._htmlContainerElement;
        }

        public clone(){
            return new TextBoxInput(this.parent, this.name, this.displayName, this.description, this.autofocus, this.autocomplete, this.placeholder, this.pattern, this.minLength, this.maxLength, this.isRequired, this.isReadOnly, this.isDisabled, this.defaultValue, this.sortingPriority);
        }

    }
}