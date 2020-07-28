/// <reference path="FormGeneratorBuilder.ts" />
/// <reference path="../FormGenerator.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export class FormBuilder extends FormGeneratorBuilder{
        private _children?:FormGeneratorBuilder[];
        private _displayName?:string;
        private _description?:string;
        private _sortingPriority?:number;
        private _namePrefix?:string;

        public constructor(children?:MultiBuilderCallback<FormBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string){
            super();
            this.set(children, displayName, description, sortingPriority, namePrefix);
        }

        public set(children?:MultiBuilderCallback<FormBuilder>, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string){
            if(children){
                this.children(children);
            }
            this._displayName = displayName;
            this._description = description;
            this._sortingPriority = sortingPriority;
            this._namePrefix = namePrefix;
            return this;
        }

        public children(children:MultiBuilderCallback<FormBuilder>){
            this._children = FormGeneratorBuilder.getMany(this, children);
            return this;
        }

        public add(children:MultiBuilderCallback<FormBuilder>){
            if(!this._children){
                return this.children(children);

            }
            this._children = this._children.concat(FormGeneratorBuilder.getMany(this, children));
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

        public toFormGenerator(){
            let formGenerator = new FormGenerator(this._displayName, this._description, this._sortingPriority, this._namePrefix);
            if(this._children){
                for(let i = 0; i < this._children.length; i++){
                    formGenerator.children.push(this._children[i].toFormChild());
                }
            }
            return formGenerator;
        }

        public toFormChild(){
            return this.toFormGenerator()
        }
    }
}