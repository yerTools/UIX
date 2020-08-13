/// <reference path="BaseType/VisibleInputField.ts" />

namespace UIX.Libraries.FormGenerator.Input{

    export class CheckboxInput extends BaseType.VisibleInputField<CheckboxInput, boolean, HTMLInputElement>{

        public static getBooleanAsText(value:boolean){
            return value ? "true" : "";
        }

        public constructor(
                parent:Interface.IFormParent, name:string,
                displayName?:string, description?:string, autofocus = false, autocomplete?:BaseType.InputAutocompleteType,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:boolean, sortingPriority?:number){
            super(parent, BaseType.InputType.Checkbox, name, displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }

        protected valueChanged(rawValue: string){
            let message = this.checkVisibleInputField(rawValue);
            if(message || !rawValue){
                if(!message){
                    return null;
                }
                return message;
            }
            return this.checkHTMLInputElementValidity();
        }

        public reset(){
            return this.setValue(this.defaultValue ? this.defaultValue : false);
        }

        public setValue(value:boolean){
            if(this._htmlInputElement){
                this._htmlInputElement.checked = value;
                this.triggerInputValueChanged(false);
                return true;
            }
            return false;
        }

        public getValue(){
            if(this._htmlInputElement){
                return this._htmlInputElement.checked;
            }
            return undefined;
        }

        public getValueAsInputString(value:boolean){
            return CheckboxInput.getBooleanAsText(value);
        }

        public getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType){
            if(!this._htmlContainerElement){
                this._htmlInputElement = this.createVisibleInput("input", true, "checkbox", namePrefix, autocompleteSection, autocompleteAddressType);
                this._htmlContainerElement = this.getContainerHTMLElement(this._htmlInputElement);
            }
            return this._htmlContainerElement;
        }

        public clone(){
            return new CheckboxInput(this.parent, this.name, this.displayName, this.description, this.autofocus, this.autocomplete, this.isRequired, this.isReadOnly, this.isDisabled, this.defaultValue, this.sortingPriority);
        }
    }
}