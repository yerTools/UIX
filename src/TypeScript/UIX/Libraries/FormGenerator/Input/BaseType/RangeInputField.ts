/// <reference path="VisibleInputField.ts" />

namespace UIX.Libraries.FormGenerator.Input.BaseType{

    export abstract class RangeInputField<
                InputFieldType extends RangeInputField<InputFieldType, ValueType, HTMLInputElementTypeName>,
                ValueType extends ValueType.NumberValue/*|DateTime|TimeSpan*/,
                HTMLInputElementTypeName extends "range"|"number">
            extends VisibleInputField<InputFieldType, ValueType, HTMLInputElement>{

        public readonly min?:ValueType;
        public readonly max?:ValueType;
        public readonly step?:ValueType;


        public constructor(
                parent:Interface.IFormParent, inputType:InputType, name:string,
                displayName?:string, description?:string, autofocus = false, autocomplete?:InputAutocompleteType,
                min?:ValueType, max?:ValueType, step?:ValueType,
                isRequired = true, isReadOnly = false, isDisabled = false,
                defaultValue?:ValueType, sortingPriority?:number){
            super(parent, inputType, name, displayName, description, autofocus, autocomplete, isRequired, isReadOnly, isDisabled, defaultValue, sortingPriority);

            this.min = min;
            this.max = max;
            this.step = step;
        }

        protected createRangeInput(setDefaultValue:boolean, typeName?:HTMLInputElementTypeName, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Helper.InputAutocompleteAddressType):HTMLInputElement{
            let input = this.createVisibleInput("input", setDefaultValue, typeName, namePrefix, autocompleteSection, autocompleteAddressType);
            
            if(this.min){
                input.min = this.min.toMinMaxString();
            }
            if(this.max){
                input.max = this.max.toMinMaxString();
            }
            if(this.step){
                input.step = this.step.toStepString();
            }

            return input;
        }

        protected checkTextInputField(rawValue:string){
            let message = this.checkVisibleInputField(rawValue);
            if(message || !rawValue){
                return message;
            }
            /*
            if(this.minLength !== undefined && rawValue.length < this.minLength){
                return Localization.get(Localization.CategoryType.FormValidation, Localization.Category.FormValidation.Field_Has_Minimum_Length, { minimumLength: this.minLength.toString() });
            }
            if(this.maxLength !== undefined && rawValue.length > this.maxLength){
                return Localization.get(Localization.CategoryType.FormValidation, Localization.Category.FormValidation.Field_Has_Maximum_Length, { maximumLength: this.maxLength.toString() });
            }
            if(this.pattern && this.pattern.regex && !this.pattern.regex.test(rawValue)){
                if(this.pattern.description){
                    return this.pattern.description;
                }
                return Localization.get(Localization.CategoryType.FormValidation, Localization.Category.FormValidation.Field_Has_Pattern);
            }*/
            return undefined;
        }

    }
}