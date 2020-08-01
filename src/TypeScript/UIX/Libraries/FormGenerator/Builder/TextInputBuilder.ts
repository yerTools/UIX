/// <reference path="Basic/TextInputFieldBuilder.ts" />
/// <reference path="../Input/TextInput.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class TextInputBuilder extends Basic.TextInputFieldBuilder<TextInputBuilder>{

        protected _multiline?:boolean;

        public constructor(name:string, multiline?:boolean, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            super(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
            
            this._multiline = multiline;
        }
        public set(name:string, multiline?:boolean, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            this.setInputField(name, true, defaultValue, sortingPriority);
            this.setVisibleInputField(displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled);
            this.setTextInputField(placeholder, pattern, minLength, maxLength);

            this._multiline = multiline;

            return this;
        }

        public multiline(multiline?:boolean){
            this._multiline = multiline;
            return this;
        }

        public toTextInput(parent:Interface.IFormParent){
            return new Input.TextInput(parent, this._name, this._multiline, this._displayName, this._description, this._autofocus, this._autocomplete, this._placeholder, this._pattern, this._minLength, this._maxLength, this._isRequired, this._isReadOnly, this._isDisabled, this._defaultValue, this._sortingPriority);
        }

        public toFormChild(parent:Interface.IFormParent){
            return this.toTextInput(parent)
        }
    }
}