/// <reference path="BaseType/TextInputField.ts" />
/// <reference path="../../../Core/Tools/EscapeTextForHTML.ts" />

namespace UIX.Libraries.FormGenerator.Input{
    export class TextInput extends BaseType.TextInputField<TextInput, HTMLInputElement, "input">{

        public readonly autocompleteValues?:string[];
        public readonly requireFromAutocompleteValues:boolean;

        protected readonly _autocompleteValuesSet?:Set<string>;

        public constructor(
                parent:Interface.IFormParent, name:string, displayName?:string, description?:string,
                autocompleteValues?:string[], requireFromAutocompleteValues = false,
                autofocus = false, autocomplete?:BaseType.InputAutocompleteType,
                placeholder?:string, pattern?:BaseType.InputPattern, minLength?:number, maxLength?:number,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:string, sortingPriority?:number){
            super(parent, BaseType.InputType.Text, name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
            
            this.autocompleteValues = autocompleteValues;
            this.requireFromAutocompleteValues = requireFromAutocompleteValues;

            if(requireFromAutocompleteValues && autocompleteValues){
                this._autocompleteValuesSet = new Set(autocompleteValues);
            }
        }

        protected valueChanged(rawValue:string){
            let message = this.checkTextInputField(rawValue);
            if(message || !rawValue){
                if(!message){
                    return null;
                }
                return message;
            }
            if(this._autocompleteValuesSet && !this._autocompleteValuesSet.has(rawValue)){
                return Localization.get(Localization.CategoryType.FormValidation, Localization.Category.FormValidation.Field_Enter_From_Autocomplete_Values);
            }
            return this.checkHTMLInputElementValidity();
        }

        protected createDatalist(id:string){
            let datalist = document.createElement("datalist");
            datalist.id = id;

            if(this.autocompleteValues){
                for(let i = 0; i < this.autocompleteValues.length; i++){
                    let option = document.createElement("option");
                    option.innerHTML = Core.Tools.escapeTextForHTML(this.autocompleteValues[i]);
                    datalist.appendChild(option);
                }
            }

            return datalist;
        }

        public getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType){
            if(!this._htmlContainerElement){
                this._htmlInputElement = this.createTextInput("input", true, undefined, namePrefix, autocompleteSection, autocompleteAddressType);
                
                if(this.autocompleteValues && this.autocompleteValues.length){
                    let id = BaseType.InputField.getId();
                    this._htmlInputElement.setAttribute("list", id);

                    let datalist = this.createDatalist(id);
                    this._htmlContainerElement = this.getContainerHTMLElement([this._htmlInputElement, datalist]);
                }else{
                    this._htmlContainerElement = this.getContainerHTMLElement(this._htmlInputElement);
                }
                
            }
            return this._htmlContainerElement;
        }

        public clone(){
            return new TextInput(this.parent, this.name, this.displayName, this.description, this.autocompleteValues, this.requireFromAutocompleteValues, this.autofocus, this.autocomplete, this.placeholder, this.pattern, this.minLength, this.maxLength, this.isRequired, this.isReadOnly, this.isDisabled, this.defaultValue, this.sortingPriority);
        }
    }
}