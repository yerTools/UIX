/// <reference path="InputFieldBuilder.ts" />
/// <reference path="../Input/PasswordInput.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class PasswordInputBuilder extends InputFieldBuilder<PasswordInputBuilder, string>{

        private _placeholder?:string; 

        public constructor(name:string, placeholder?:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:string, sortingPriority?:number){
            super(name, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
            this.setSpecific(placeholder);
        }

        public setSpecific(placeholder?:string){
            this._placeholder = placeholder;
            return this;
        }

        public set(name:string, placeholder?:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:string, sortingPriority?:number){
            this.setGeneral(name, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
            this.setSpecific(placeholder);
            return this;
        }

        public placeholder(placeholder?:string){
            this._placeholder = placeholder;
            return this;
        }

        public toPasswordInput(parent:Interface.IFormParent){
            return new Input.PasswordInput(parent, this._name, this._placeholder, this._displayName, this._description, this._isRequired, this._isReadOnly, this._defaultValue, this._sortingPriority);
        }

        public toFormChild(parent:Interface.IFormParent){
            return this.toPasswordInput(parent)
        }
    }
}