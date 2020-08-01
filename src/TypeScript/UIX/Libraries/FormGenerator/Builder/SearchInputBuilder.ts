/// <reference path="Basic/TextInputFieldBuilder.ts" />
/// <reference path="../Input/SearchInput.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class SearchInputBuilder extends Basic.TextInputFieldBuilder<SearchInputBuilder>{

        public constructor(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            super(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        public set(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            
            this.setInputField(name, true, defaultValue, sortingPriority);
            this.setVisibleInputField(displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled);
            this.setTextInputField(placeholder, pattern, minLength, maxLength);
            
            return this;
        }

        public toSearchInput(parent:Interface.IFormParent){
            return new Input.SearchInput(parent, this._name, this._displayName, this._description, this._autofocus, this._autocomplete, this._placeholder, this._pattern, this._minLength, this._maxLength, this._isRequired, this._isReadOnly, this._isDisabled, this._defaultValue, this._sortingPriority);
        }

        public toFormChild(parent:Interface.IFormParent){
            return this.toSearchInput(parent)
        }
    }
}