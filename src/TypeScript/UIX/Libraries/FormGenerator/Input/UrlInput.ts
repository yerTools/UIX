/// <reference path="BaseType/TextInputField.ts" />

namespace UIX.Libraries.FormGenerator.Input{
    export class UrlInput extends BaseType.TextInputField<UrlInput, HTMLInputElement, "input">{

        public constructor(
                parent:Interface.IFormParent, name:string,
                displayName?:string, description?:string, autofocus = false, autocomplete?:BaseType.InputAutocompleteType,
                placeholder?:string, pattern?:BaseType.InputPattern, minLength?:number, maxLength?:number,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:string, sortingPriority?:number){
            super(parent, BaseType.InputType.Url, name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }

        protected valueChanged(rawValue:string){
            let message = this.checkTextInputField(rawValue);
            if(message || !rawValue){
                if(!message){
                    return null;
                }
                return message;
            }
            return this.checkHTMLInputElementValidity();
        }

        public getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType){
            if(!this._htmlContainerElement){
                this._htmlInputElement = this.createTextInput("input", true, "url", namePrefix, autocompleteSection, autocompleteAddressType);
                this._htmlContainerElement = this.getContainerHTMLElement(this._htmlInputElement);
            }
            return this._htmlContainerElement;
        }

        public clone(){
            return new UrlInput(this.parent, this.name, this.displayName, this.description, this.autofocus, this.autocomplete, this.placeholder, this.pattern, this.minLength, this.maxLength, this.isRequired, this.isReadOnly, this.isDisabled, this.defaultValue, this.sortingPriority);
        }

    }
}