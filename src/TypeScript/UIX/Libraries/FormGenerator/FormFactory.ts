/// <reference path="Builder/FormGeneratorBuilder.ts" />
/// <reference path="Builder/TextInputBuilder.ts" />
/// <reference path="Builder/PasswordInputBuilder.ts" />
/// <reference path="Builder/EmailInputBuilder.ts" />
/// <reference path="Builder/SearchInputBuilder.ts" />
/// <reference path="Builder/UrlInputBuilder.ts" />
/// <reference path="Builder/TextBoxInputBuilder.ts" />
/// <reference path="Builder/CheckboxInputBuilder.ts" />

namespace UIX.Libraries.FormGenerator{
    export class FormFactory{
        public static readonly factory = new FormFactory();

        public static create(children?:Builder.Basic.MultiBuilderCallback<Builder.FormGeneratorBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType){
            return this.factory.form(children, displayName, description, sortingPriority, namePrefix, autocompleteSection, autocompleteAddressType);
        }

        public form(children?:Builder.Basic.MultiBuilderCallback<Builder.FormGeneratorBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType){
            return new Builder.FormGeneratorBuilder(children, displayName, description, sortingPriority, namePrefix, autocompleteSection, autocompleteAddressType);
        }

        public text(name:string, displayName?:string, description?:string,
                autocompleteValues?:string[], requireFromAutocompleteValues?:boolean,
                autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
                placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
                isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
                defaultValue?:string, sortingPriority?:number){
            return new Builder.TextInputBuilder(name, displayName, description, autocompleteValues, requireFromAutocompleteValues, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }

        public password(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.PasswordInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        
        public email(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.EmailInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        
        public search(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.SearchInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
        
        public url(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.UrlInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }

        public textBox(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            placeholder?:string, pattern?:Input.BaseType.InputPattern, minLength?:number, maxLength?:number,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:string, sortingPriority?:number){
            return new Builder.TextBoxInputBuilder(name, displayName, description, autofocus, autocomplete, placeholder, pattern, minLength, maxLength, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }

        public checkbox(name:string, displayName?:string, description?:string, 
            autofocus?:boolean, autocomplete?:Input.BaseType.InputAutocompleteType,
            isRequired?:boolean, isReadOnly?:boolean, isDisabled?:boolean,
            defaultValue?:boolean, sortingPriority?:number){
            return new Builder.CheckboxInputBuilder(name, displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);
        }
    }
}