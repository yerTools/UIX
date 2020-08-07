/// <reference path="InputField.ts" />
/// <reference path="../../../../Core/Tools/EscapeTextForHTML.ts" />
/// <reference path="../../../Hint/Hint.ts" />


namespace UIX.Libraries.FormGenerator.Input.BaseType{
    const MAX_INPUT_EVENT_SPEED = 125;

    type HTMLContainerType = HTMLLabelElement;

    export type InputAutocompleteType = 
        "off"|"on"| 
        "name"| 
            "honorific-prefix"|"given-name"|"additional-name"|"family-name"|"honorific-suffix"|"nickname"|
        "email"|"username"|"new-password"|"current-password"|"one-time-code"|"organization-title"|"organization"|
        "street-address"|
            "address-line1"|"address-line2"|"address-line3"|
            "address-level4"|"address-level3"|"address-level2"|"address-level1"|
        "country"|"country-name"|"postal-code"|
        "cc-name"|"cc-given-name"|"cc-additional-name"|"cc-family-name"|"cc-number"|"cc-exp"|"cc-exp-month"|"cc-exp-year"|"cc-csc"|"cc-type"|
        "transaction-currency"|"transaction-amount"|"language"|"bday"|"bday-day"|"bday-month"|"bday-year"|"sex"|
        "tel"|
            "tel-country-code"|"tel-national"|"tel-area-code"|"tel-local"|"tel-extension"|
        "impp"|"url"|"photo";

    export abstract class VisibleInputField<
                InputFieldType extends VisibleInputField<InputFieldType, ValueType, HTMLInputElementType>,
                ValueType extends InputValueType,
                HTMLInputElementType extends HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement|HTMLButtonElement>
            extends InputField<InputFieldType, ValueType, HTMLInputElementType>{

        public readonly displayName?:string;
        public readonly description?:string;

        public readonly autofocus:boolean;

        public readonly autocomplete?:InputAutocompleteType;

        public readonly isRequired:boolean;
        public readonly isReadOnly:boolean;
        public readonly isDisabled:boolean;

        protected _htmlContainerElement?:HTMLContainerType;

        private _lastErrorMessage?:string|null;
        private _lastInputTime = 0;
        private _lastInputTimeout:number|null = null;

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

        protected setInputValidStatus(showOnEmpty = false, updateLastErrorMessage?:string){
            if(updateLastErrorMessage){
                this._lastErrorMessage = updateLastErrorMessage;
            }
            if(this._htmlContainerElement){
                if(this._lastErrorMessage && (this._lastRawValue || showOnEmpty)){
                    this._htmlContainerElement.classList.add("invalid");
                }else{
                    this._htmlContainerElement.classList.remove("invalid");
                }
            }
            if(this._htmlInputElement){
                this._htmlInputElement.title = this._lastErrorMessage ? this._lastErrorMessage : "";
            }
        }

        protected getContainerHTMLElement(filedElements:HTMLElement|HTMLElement[]):HTMLContainerType{
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
            if(Array.isArray(filedElements)){
                for(let i = 0; i < filedElements.length; i++){
                    inputFieldWrapper.appendChild(filedElements[i]);
                }
            }else{
                inputFieldWrapper.appendChild(filedElements);
            }
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
                autocompleteString = "section-" + autocompleteSection.split(" ").join("_");
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

            if(this.isRequired && !this.isReadOnly && !this.isDisabled){
                input.required = this.isRequired;
            }
            if(this.isReadOnly){
                input.readOnly = this.isReadOnly;
            }
            if(this.isDisabled){
                input.disabled = this.isDisabled;
            }

            if(!this.isDisabled && !this.isReadOnly){
                let handleInput = (force:boolean) => {
                    if(this._lastInputTimeout !== null){
                        clearTimeout(this._lastInputTimeout);
                        this._lastInputTimeout = null;
                    }

                    let now = new Date().getTime();
                    if(force || now >= this._lastInputTime + MAX_INPUT_EVENT_SPEED){
                        this._lastInputTime = now;
                        this.triggerInputValueChanged(force);
                    }else{
                        this._lastInputTimeout = setTimeout(() => {
                            this._lastInputTimeout = null;
                            this._lastInputTime = new Date().getTime();
                            this.triggerInputValueChanged(force);
                        }, this._lastInputTime + MAX_INPUT_EVENT_SPEED - now);
                    }
                };

                input.addEventListener("input", () => handleInput(false) , { passive: true });
                input.addEventListener("change", () => handleInput(true) , { passive: true });
            }

            return input;
        }

        protected checkVisibleInputField(rawValue:string){
            if(this.isRequired && rawValue === ""){
                return Localization.get(Localization.CategoryType.FormValidation, Localization.Category.FormValidation.Field_Is_Required);
            }
            return undefined;
        }

        protected checkHTMLInputElementValidity(){
            if(this._htmlInputElement){
                let validationMessage:string|undefined;

                this._htmlInputElement.setCustomValidity("");

                if(!this._htmlInputElement.checkValidity()){
                    validationMessage = this._htmlInputElement.validationMessage;
                }

                if(this._lastErrorMessage){
                    this._htmlInputElement.setCustomValidity(this._lastErrorMessage); 
                }

                if(validationMessage){
                    return validationMessage;
                }
            }
            return null;
        }

        protected triggerInputValueChanged(showErrorMessage:boolean){
            let currentValue = this.getInputRawValue();
            if(currentValue !== undefined && currentValue !== this._lastRawValue){
                this._lastRawValue = currentValue;

                let errorMessage = this.valueChanged(currentValue);
                let parentErrorMessage = this.parent.childChanged(this, currentValue, this);

                if(parentErrorMessage !== undefined){
                    errorMessage = parentErrorMessage;
                }

                if(errorMessage !== undefined){
                    this._lastErrorMessage = errorMessage;

                    if(errorMessage && showErrorMessage && currentValue){
                        this.showErrorMessage(errorMessage);
                    }else{
                        this.hideErrorMessage();
                    }
                }else{
                    this._lastErrorMessage = undefined;
                }
                this.setInputValidStatus();
            }else if(showErrorMessage && currentValue && this._lastErrorMessage){
                this.showErrorMessage(this._lastErrorMessage);
            }
        }

        public showErrorMessage(message:string, focus = true){
            if(message){
                console.error(message, this._htmlInputElement);
                if(this._htmlInputElement){
                    this._htmlInputElement.setCustomValidity(message);
                }
                if(focus){
                    this.focus();
                }
            }else{
                this.hideErrorMessage();
            }
        }

        public hideErrorMessage(){
            if(this._htmlInputElement){
                this._htmlInputElement.setCustomValidity("");
            }
            console.warn("hideErrorMessage");
        }

        public hasError(): boolean {
            if(this._lastRawValue){
                return !this.checkValidity(false);
            }
            return false;
        }

        public checkValidity(showError: boolean, focusOnError = true){
            if(!this.isDisabled && !this.isReadOnly){
                let currentValue = this.getInputRawValue();
                if(currentValue !== undefined){
                    let message = this.valueChanged(currentValue);
                    if(message){
                        if(showError){
                            this.showErrorMessage(message, focusOnError);
                        }
                        this.setInputValidStatus(showError, message);
                        return false;
                    }
                }
            }
            this.hideErrorMessage();
            return true;
        }

        public focus(smoothScroll = true){
            if(this._htmlInputElement){
                Hint.Hint.scrollTo(this._htmlInputElement, smoothScroll, true);
            }
        }

        protected abstract valueChanged(rawValue:string):void|undefined|null|string;
    }
}