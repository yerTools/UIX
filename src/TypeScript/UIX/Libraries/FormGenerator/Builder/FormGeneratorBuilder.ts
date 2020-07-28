/// <reference path="../Helper/IFormChild.ts" />

namespace UIX.Libraries.FormGenerator.Builder{
    export type MultiBuilderCallback<T extends FormGeneratorBuilder> = ((this:T, factory:FormFactory, currentBuilder:T) => FormGeneratorBuilder|FormGeneratorBuilder[])|FormGeneratorBuilder|FormGeneratorBuilder[];
    export type SingleBuilderCallback<T extends FormGeneratorBuilder> = ((this:T, factory:FormFactory, currentBuilder:T) => FormGeneratorBuilder)|FormGeneratorBuilder;

    export abstract class FormGeneratorBuilder{

        protected static getMany<T extends FormGeneratorBuilder>(currentFormBuilder:T, children:MultiBuilderCallback<T>){

            if(typeof children === "function"){
                children = children.call(currentFormBuilder, FormFactory.factory, currentFormBuilder);
            }
            if(children){
                if(!Array.isArray(children)){
                    children = [children];
                }
                return children;
            }

            return [];
        }

        protected static getOne<T extends FormGeneratorBuilder>(currentFormBuilder:T, child:SingleBuilderCallback<T>){

            if(typeof child === "function"){
                child = child.call(currentFormBuilder, FormFactory.factory, currentFormBuilder);
            }
            return child;
        }

        public abstract toFormChild():Helper.IFormChild
    }
}