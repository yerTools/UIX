/// <reference path="VisibleInputFieldBuilder.ts" />

namespace UIX.Libraries.FormGenerator.Builder.Basic{
    export abstract class TextInputFieldBuilder<
                InputFieldType extends TextInputFieldBuilder<InputFieldType>>
            extends VisibleInputFieldBuilder<InputFieldType, string>{
        
        protected _placeholder?:string;
        protected _pattern?:string;

        protected _minLength?:number;
        protected _maxLength?:number;

        public constructor(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            super(name, displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);

            this.setTextInputField(placeholder, pattern, minLength, maxLength);
        }

        public setTextInputField(placeholder?:string, pattern?:string, minLength?:number, maxLength?:number){
            this._placeholder = placeholder;
            this._pattern = pattern;

            this._minLength = minLength;
            this._maxLength = maxLength;
            return this;
        }

        public placeholder(placeholder?:string){
            this._placeholder = placeholder;
            return this;
        }

        public pattern(pattern?:string){
            this._pattern = pattern;
            return this;
        }

        public minLength(minLength?:number){
            this._minLength = minLength;
            return this;
        }
        
        public maxLength(maxLength?:number){
            this._maxLength = maxLength;
            return this;
        }
    }
}