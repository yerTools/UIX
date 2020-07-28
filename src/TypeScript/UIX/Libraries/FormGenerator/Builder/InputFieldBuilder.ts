/// <reference path="FormGeneratorBuilder.ts" />
/// <reference path="../Input/InputField.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export abstract class InputFieldBuilder<InputFieldType extends InputFieldBuilder<InputFieldType, ValueType>, ValueType> extends FormGeneratorBuilder{
        protected _name:string;
        protected _displayName?:string;
        protected _description?:string;

        protected _isReadOnly?:boolean;
        protected _isRequired?:boolean;
        
        protected _defaultValue?:ValueType;
        protected _sortingPriority?:number;

        public constructor(name:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:ValueType, sortingPriority?:number){
            super();
            this._name = name;
            this.setGeneral(name, displayName, description, isRequired, isReadOnly, defaultValue, sortingPriority);
        }

        public setGeneral(name:string, displayName?:string, description?:string, isRequired?:boolean, isReadOnly?:boolean, defaultValue?:ValueType, sortingPriority?:number){
            this._name = name;
            this._displayName = displayName;
            this._description = description;

            this._isRequired = isRequired;
            this._isReadOnly = isReadOnly;

            this._defaultValue = defaultValue;
            this._sortingPriority = sortingPriority;
            return this;
        }

        public name(name:string){
            this._name = name;
            return this;
        }

        public displayName(displayName?:string){
            this._displayName = displayName;
            return this;
        }

        public description(description?:string){
            this._description = description;
            return this;
        }

        public isReadOnly(isReadOnly?:boolean){
            this._isReadOnly = isReadOnly;
            return this;
        }

        public isRequired(isRequired?:boolean){
            this._isRequired = isRequired;
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