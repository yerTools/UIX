/// <reference path="FormChildType.ts" />
/// <reference path="../Input/Helper/InputAutocompleteAddressType.ts" />

namespace UIX.Libraries.FormGenerator.Interface{
    export interface IFormChild{
        readonly description?:string;
        readonly displayName?:string;
        readonly sortingPriority?:number;
        
        getFormChildType():FormChildType;
        getHTMLElement(namePrefix?:string, autocompleteSection?:string, autocompleteAddressType?:Input.Helper.InputAutocompleteAddressType):HTMLElement;

        hasError():boolean;
        checkValidity(showError:boolean):boolean;
    }
}