/// <reference path="FormBuilder.ts" />
/// <reference path="../../Input/BaseType/InputField.ts" />

namespace UIX.Libraries.FormGenerator.Builder.Basic{
    export abstract class InputFieldBuilder<
                InputFieldType extends InputFieldBuilder<InputFieldType, ValueType>, 
                ValueType extends Input.BaseType.InputValueType> 
            extends FormBuilder{
        
        protected _name:string;
        protected _isVisible?:boolean;
        
        protected _defaultValue?:ValueType;
        protected _sortingPriority?:number;

        public constructor(name:string, isVisible?:boolean, defaultValue?:ValueType, sortingPriority?:number){
            super();
            this._name = name;
            this.setInputField(name, isVisible, defaultValue, sortingPriority);
        }

        public setInputField(name:string, isVisible?:boolean, defaultValue?:ValueType, sortingPriority?:number){
            this._name = name;
            this._isVisible = isVisible;

            this._defaultValue = defaultValue;
            this._sortingPriority = sortingPriority;
            return this;
        }

        public name(name:string){
            this._name = name;
            return this;
        }

        public isVisible(isVisible?:boolean){
            this._isVisible = isVisible;
            return this;
        }

        public defaultValue(defaultValue?:ValueType){
            this._defaultValue = defaultValue;
            return this;
        }

        public sortingPriority(sortingPriority?:number){
            this._sortingPriority = sortingPriority;
            return this;
        }
    }
}