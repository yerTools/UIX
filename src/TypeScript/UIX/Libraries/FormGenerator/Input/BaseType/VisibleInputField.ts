/// <reference path="InputField.ts" />
/// <reference path="../../../../Core/Tools/EscapeTextForHTML.ts" />

namespace UIX.Libraries.FormGenerator.Input.BaseType{
    type HTMLContainerType = HTMLLabelElement;

    export type InputAutocompleteType = "off" | "on";

    export abstract class VisibleInputField<
                InputFieldType extends VisibleInputField<InputFieldType, ValueType>,
                ValueType extends InputValueType>
            extends InputField<InputFieldType, ValueType>{

        public readonly displayName?:string;
        public readonly description?:string;

        public readonly autofocus:boolean;

        public readonly autocomplete?:InputAutocompleteType;

        public readonly isRequired:boolean;
        public readonly isReadOnly:boolean;
        public readonly isDisabled:boolean;

        protected _htmlContainerElement?:HTMLContainerType;

        public constructor(
                parent:Interface.IFormParent, inputType:InputType, name:string,
                displayName?:string, description?:string, autofocus = false, autocomplete?:InputAutocompleteType,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:ValueType, sortingPriority?:number){
            super(parent, inputType, name, true, defaultValue, sortingPriority);

            this.displayName = displayName;
            this.description = description;

            this.autofocus = autofocus;
            this.autocomplete = autocomplete;

            this.isRequired = isRequired;
            this.isReadOnly = isReadOnly;
            this.isDisabled = isDisabled;
        }

        protected getContainerHTMLElement(filedElement:HTMLElement):HTMLContainerType{
            let container = document.createElement("label");
            container.className = "input-container"
                + (this.isReadOnly ? " read-only" : "")
                + (this.isRequired ? " required" : "");

            let wrapper = document.createElement("div");
            wrapper.className = "input-wrapper";

            if(this.displayName){
                let displayName = document.createElement("span");
                displayName.className = "display-name";
                displayName.innerHTML = Core.Tools.escapeTextForHTML(this.displayName);
                wrapper.appendChild(displayName);
            }

            if(this.description){
                let description = document.createElement("div");
                description.className = "description";
                description.innerHTML = Core.Tools.escapeTextForHTML(this.description);
                wrapper.appendChild(description);
            }

            let inputFieldWrapper = document.createElement("div");
            inputFieldWrapper.className = "input-field-wrapper";
            inputFieldWrapper.appendChild(filedElement);
            wrapper.appendChild(inputFieldWrapper);

            container.appendChild(wrapper);
            return container;
        }

        protected createVisibleInput<TagName extends keyof Helper.IHTMLInputElementTagName, TypeName extends Helper.IHTMLInputElementTypeName[TagName]>(tagName:TagName, setDefaultValue:boolean, typeName?:TypeName, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType): Helper.IHTMLInputElementTagName[TagName]{
            let input = this.createInput(tagName, setDefaultValue, typeName, namePrefix);
            
            if(this.autofocus){
                input.autofocus = this.autofocus;
            }

            let autocompleteString:string|undefined;

            if(autocompleteSection){
                autocompleteString = "section-" + autocompleteSection.replaceAll(" ", "_");
            }
            if(autocompleteAddressType){
                autocompleteString = autocompleteString ? autocompleteString + " " + autocompleteAddressType : autocompleteAddressType;
            }
            if(this.autocomplete){
                autocompleteString = autocompleteString ? autocompleteString + " " + this.autocomplete : this.autocomplete;
            }

            if(autocompleteString){
                input.autocomplete = autocompleteString;
            }

            if(this.isRequired){
                input.required = this.isRequired;
            }
            if(this.isReadOnly){
                input.readOnly = this.isReadOnly;
            }
            if(this.isDisabled){
                input.disabled = this.isDisabled;
            }

            return input;
        }
    }
}