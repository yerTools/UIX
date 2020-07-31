/// <reference path="Builder/FormBuilder.ts" />
/// <reference path="Builder/TextInputBuilder.ts" />
/// <reference path="Builder/PasswordInputBuilder.ts" />

namespace UIX.Libraries.FormGenerator{
    export class FormFactory{
        public static readonly factory = new FormFactory();

        public static create(children?:Builder.MultiBuilderCallback<Builder.FormBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string){
            return this.factory.form(children, displayName, description, sortingPriority, namePrefix);
        }

        public form(children?:Builder.MultiBuilderCallback<Builder.FormBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string){
            return new Builder.FormBuilder(children, displayName, description, sortingPriority, namePrefix);
        }

        public textInput(name:string, multiline?:boolean, placeholder?:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:string, sortingPriority?:number){
            return new Builder.TextInputBuilder(name, multiline, placeholder, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
        }

        public passwordInput(name:string, placeholder?:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:string, sortingPriority?:number){
            return new Builder.PasswordInputBuilder(name, placeholder, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
        }
    }
}