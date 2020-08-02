/// <reference path="Basic/TextInputFieldBuilder.ts" />
/// <reference path="../Input/TextInput.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class TextInputBuilder extends Basic.TextInputFieldBuilder<TextInputBuilder>{

        protected _autocompleteValues?:string[];
        protected _requireFromAutocompleteValues?:boolean;

        public constructor(name:string, displayName?:string, description?:string,
            autocompleteValues?:string[], requireFromAutocompleteValues?:boolean,
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            super(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);

            this._autocompleteValues = autocompleteValues;
            this._requireFromAutocompleteValues = requireFromAutocompleteValues;
        }
        public set(name:string, displayName?:string, description?:string,
            autocompleteValues?:string[], requireFromAutocompleteValues?:boolean,
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            this.setInputField(name, true, defaultValue, sortingPriority);
            this.setVisibleInputField(displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled);
            this.setTextInputField(placeholder, pattern, minLength, maxLength);

            this._autocompleteValues = autocompleteValues;
            this._requireFromAutocompleteValues = requireFromAutocompleteValues;

            return this;
        }

        public toTextInput(parent:Interface.IFormParent){
            return new Input.TextInput(parent, this._name, this._displayName, this._description, this._autocompleteValues, this._requireFromAutocompleteValues, this._autofocus, this._autocomplete, this._placeholder, this._pattern, this._minLength, this._maxLength, this._isRequired, this._isReadOnly, this._isDisabled, this._defaultValue, this._sortingPriority);
        }

        public toFormChild(parent:Interface.IFormParent){
            return this.toTextInput(parent)
        }
    }
}