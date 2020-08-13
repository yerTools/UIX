/// <reference path="../../Interface/IFormChild.ts" />

namespace UIX.Libraries.FormGenerator.Builder.Basic{
    export type MultiBuilderCallback<T extends FormBuilder> = ((this:T, factory:FormFactory, currentBuilder:T) => FormBuilder|FormBuilder[])|FormBuilder|FormBuilder[];
    export type SingleBuilderCallback<T extends FormBuilder> = ((this:T, factory:FormFactory, currentBuilder:T) => FormBuilder)|FormBuilder;

    export abstract class FormBuilder{

        protected getMany(children:MultiBuilderCallback<this>){

            if(typeof children === "function"){
                children = children.call(this, FormFactory.factory, this);
            }
            if(children){
                if(!Array.isArray(children)){
                    children = [children];
                }
                return children;
            }

            return [];
        }

        protected getOne(child:SingleBuilderCallback<this>){

            if(typeof child === "function"){
                child = child.call(this, FormFactory.factory, this);
            }
            return child;
        }

        public abstract toFormChild(parent:Interface.IFormParent):Interface.IFormChild
    }
}