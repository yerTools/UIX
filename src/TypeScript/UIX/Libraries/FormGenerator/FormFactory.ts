/// <reference path="Builder/FormGeneratorBuilder.ts" />
/// <reference path="Builder/TextInputBuilder.ts" />
/// <reference path="Builder/PasswordInputBuilder.ts" />
/// <reference path="Builder/EmailInputBuilder.ts" />
/// <reference path="Builder/SearchInputBuilder.ts" />
/// <reference path="Builder/UrlInputBuilder.ts" />

namespace UIX.Libraries.FormGenerator{
    export class FormFactory{
        public static readonly factory = new FormFactory();

        public static create(children?:Builder.Basic.MultiBuilderCallback<Builder.FormGeneratorBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType){
            return this.factory.form(children, displayName, description, sortingPriority, namePrefix, autocompleteSection, autocompleteAddressType);
        }

        public form(children?:Builder.Basic.MultiBuilderCallback<Builder.FormGeneratorBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType){
            return new Builder.FormGeneratorBuilder(children, displayName, description, sortingPriority, namePrefix, autocompleteSection, autocompleteAddressType);
        }

        public textInput(name:string, multiline?:boolean, displayName?:string, description?:string, 
                autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
                placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
                isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
                defaultValue?:string, sortingPriority?:number){
            return new Builder.TextInputBuilder(name, multiline, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }

        public passwordInput(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.PasswordInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        
        public emailInput(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.EmailInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        
        public searchInput(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.SearchInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        
        public urlInput(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:string, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.UrlInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
    }
}