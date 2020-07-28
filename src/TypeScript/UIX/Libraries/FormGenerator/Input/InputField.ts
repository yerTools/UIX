/// <reference path="../Helper/IFormChild.ts" />
/// <reference path="InputType.ts" />
/// <reference path="IHTMLInputElementTagName.ts" />
/// <reference path="../../../Core/Tools/EscapeTextForHTML.ts" />

namespace UIX.Libraries.FormGenerator.Input{
    type HTMLContainerType = HTMLLabelElement;

    export abstract class InputField<InputFieldType extends InputField<InputFieldType, ValueType, InputElementType>, ValueType, InputElementType extends HTMLInputElement|HTMLTextAreaElement> implements Helper.IFormChild{
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

        protected createInput<TagName extends keyof IHTMLInputElementTagName>(tagName:TagName, setDefaultValue:boolean, namePrefix?:string):IHTMLInputElementTagName[TagName]{
            let input = document.createElement(tagName);
            input.className = "form-input";

            input.readOnly = this.isReadOnly;
            input.required = this.isRequired;
            input.name = namePrefix ? namePrefix + this.name : this.name;

            if(setDefaultValue && this.defaultValue){
                input.value = this.getValueAsInputString(this.defaultValue);
            }

            return input;
        }

        public readonly inputType:InputType;

        public readonly name:string;
        public readonly displayName?:string;
        public readonly description?:string;

        public readonly isReadOnly:boolean;
        public readonly isRequired:boolean;
        
        public readonly defaultValue?:ValueType;
        public readonly sortingPriority?:number;

        protected _htmlContainerElement?:HTMLContainerType;
        protected _htmlInputElement?:InputElementType;

        public constructor(inputType:InputType, name:string, displayName?:string, description?:string, isRequired = true, isReadOnly = false, defaultValue?:ValueType, sortingPriority?:number){
            this.inputType = inputType;

            this.name = name;
            this.displayName = displayName;
            this.description = description;

            this.isReadOnly = isReadOnly;
            this.isRequired = isRequired;

            this.defaultValue = defaultValue;
            this.sortingPriority = sortingPriority;
        }

        public getFormChildType(){ return Helper.FormChildType.InputField; }

        public abstract setValue(value:ValueType):boolean;
        public abstract getValue():ValueType|undefined;
        public abstract getValueAsInputString(value:ValueType):string;
        public abstract reset():boolean;
        public abstract getHTMLElement(namePrefix?:string):HTMLContainerType;
        public abstract clone():InputFieldType;
    }
}