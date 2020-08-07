/// <reference path="Basic/TextInputFieldBuilder.ts" />
/// <reference path="../Input/CheckboxInput.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class CheckboxInputBuilder extends Basic.VisibleInputFieldBuilder<CheckboxInputBuilder, boolean>{

        public constructor(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:boolean, sortingPriority?:number){
            super(name, displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        public set(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:boolean, sortingPriority?:number){

            this.setInputField(name, true, defaultValue, sortingPriority);
            this.setVisibleInputField(displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled);
            
            return this;
        }

        public toCheckboxInput(parent:Interface.IFormParent){
            return new Input.CheckboxInput(parent, this._name, this._displayName, this._description, this._autofocus, this._autocomplete, this._isRequired, this._isReadOnly, this._isDisabled, this._defaultValue, this._sortingPriority);
        }

        public toFormChild(parent:Interface.IFormParent){
            return this.toCheckboxInput(parent)
        }
    }
}