/// <reference path="InputFieldBuilder.ts" />
/// <reference path="../../Input/BaseType/VisibleInputField.ts" />

namespace UIX.Libraries.FormGenerator.Builder.Basic{
    export abstract class VisibleInputFieldBuilder<
                InputFieldType extends VisibleInputFieldBuilder<InputFieldType, ValueType>, 
                ValueType extends Input.BaseType.InputValueType> 
            extends InputFieldBuilder<InputFieldType, ValueType>{
        
        protected _displayName?:string;
        protected _description?:string;

        protected _autofocus?:boolean;

        protected _autocomplete?:Input.BaseType.InputAutocompleteType;

        protected _isRequired?:boolean;
        protected _isReadOnly?:boolean;
        protected _isDisabled?:boolean;

        public constructor(name:string, displayName?:string, description?:string,
                autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
                isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
                defaultValue?:ValueType, sortingPriority?:number){
            super(name, true, defaultValue, sortingPriority);

            this.setVisibleInputField(displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled);
        }

        public setVisibleInputField(displayName?:string, description?:string,
                autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
                isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean){
            this._displayName = displayName;
            this._description = description;

            this._autofocus = autofocus;
            this._autocomplete = autocomplete;

            this._isRequired = isRequired;
            this._isReadOnly = isReadOnly;
            this._isDisabled = isDisabled;
            return this;
        }

        public description(description?:string){
            this._description = description;
            return this;
        }

        public displayName(displayName?:string){
            this._displayName = displayName;
            return this;
        }

        public autofocus(autofocus?:boolean){
            this._autofocus = autofocus;
            return this;
        }

        public autocomplete(autocomplete?:Input.BaseType.InputAutocompleteType){
            this._autocomplete = autocomplete;
            return this;
        }
        
        public isRequired(isRequired?:boolean){
            this._isRequired = isRequired;
            return this;
        }
        
        public isReadOnly(isReadOnly?:boolean){
            this._isReadOnly = isReadOnly;
            return this;
        }
        
        public isDisabled(isDisabled?:boolean){
            this._isDisabled = isDisabled;
            return this;
        }
    }
}