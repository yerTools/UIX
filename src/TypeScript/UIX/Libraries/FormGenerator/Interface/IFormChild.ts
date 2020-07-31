/// <reference path="FormChildType.ts" />

namespace UIX.Libraries.FormGenerator.Interface{
    export interface IFormChild{
        readonly description?:string;
        readonly displayName?:string;
        readonly sortingPriority?:number;
        
        getFormChildType():FormChildType;
        getHTMLElement(namePrefix?:string):HTMLElement;

        hasError():boolean;
        isReady():boolean;
    }
}