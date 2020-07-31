/// <reference path="InputFieldBuilder.ts" />
/// <reference path="../Input/TextInput.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class TextInputBuilder extends InputFieldBuilder<TextInputBuilder, string>{

        private _multiline?:boolean;
        private _placeholder?:string; 

        public constructor(name:string, multiline?:boolean, placeholder?:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:string, sortingPriority?:number){
            super(name, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
            this.setSpecific(multiline, placeholder);
        }

        public setSpecific(multiline?:boolean, placeholder?:string){
            this._multiline = multiline;
            this._placeholder = placeholder;
            return this;
        }

        public set(name:string, multiline?:boolean, placeholder?:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:string, sortingPriority?:number){
            this.setGeneral(name, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
            this.setSpecific(multiline, placeholder);
            return this;
        }

        public multiline(multiline?:boolean){
            this._multiline = multiline;
            return this;
        }

        public placeholder(placeholder?:string){
            this._placeholder = placeholder;
            return this;
        }

        public toTextInput(parent:Interface.IFormParent){
            return new Input.TextInput(parent, this._name, this._multiline, this._placeholder, this._displayName, this._description, this._isRequired, this._isReadOnly, this._defaultValue, this._sortingPriority);
        }

        public toFormChild(parent:Interface.IFormParent){
            return this.toTextInput(parent)
        }
    }
}