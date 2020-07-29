/// <reference path="FormChildType.ts" />

namespace UIX.Libraries.FormGenerator.Helper{
    export interface IFormChild{
        description?:string;
        displayName?:string;
        sortingPriority?:number;
        
        getFormChildType():FormChildType;
        getHTMLElement(namePrefix?:string):HTMLElement;

        hasError():boolean;
        isReady():boolean;
    }
}