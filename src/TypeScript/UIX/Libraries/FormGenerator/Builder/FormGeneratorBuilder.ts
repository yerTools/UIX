/// <reference path="Basic/FormBuilder.ts" />
/// <reference path="../FormGenerator.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class FormGeneratorBuilder extends Basic.FormBuilder{
        
        private _children?:Basic.FormBuilder[];
        
        private _displayName?:string;
        private _description?:string;
        private _sortingPriority?:number;

        private _namePrefix?:string;
        private _autocompleteSection?:string;
        private _autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType;

        public constructor(children?:Basic.MultiBuilderCallback<FormGeneratorBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType){
            super();
            this.set(children, displayName, description, sortingPriority, namePrefix, autocompleteSection, autocompleteAddressType);
        }

        public set(children?:Basic.MultiBuilderCallback<FormGeneratorBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType){
            if(children){
                this.children(children);
            }

            this._displayName = displayName;
            this._description = description;
            this._sortingPriority = sortingPriority;

            this._namePrefix = namePrefix;
            this._autocompleteSection = autocompleteSection;
            this._autocompleteAddressType = autocompleteAddressType;
            return this;
        }

        public children(children:Basic.MultiBuilderCallback<FormGeneratorBuilder>){
            this._children = this.getMany(children);
            return this;
        }

        public add(children:Basic.MultiBuilderCallback<FormGeneratorBuilder>){
            if(!this._children){
                return this.children(children);

            }
            this._children = this._children.concat(this.getMany(children));
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

        public sortingPriority(sortingPriority?:number){
            this._sortingPriority = sortingPriority;
            return this;
        }

        public namePrefix(namePrefix?:string){
            this._namePrefix = namePrefix;
            return this;
        }

        public autocompleteSection(autocompleteSection?:string){
            this._autocompleteSection = autocompleteSection;
            return this;
        }

        public autocompleteAddressType(autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType){
            this._autocompleteAddressType = autocompleteAddressType;
            return this;
        }

        public toFormGenerator(parent?:Interface.IFormParent){
            let formGenerator = new FormGenerator(parent, this._displayName, this._description, this._sortingPriority, this._namePrefix, this._autocompleteSection, this._autocompleteAddressType);
            if(this._children){
                for(let i = 0; i < this._children.length; i++){
                    formGenerator.children.push(this._children[i].toFormChild(formGenerator));
                }
            }
            return formGenerator;
        }

        public toFormChild(parent?:Interface.IFormParent){
            return this.toFormGenerator(parent)
        }
    }
}