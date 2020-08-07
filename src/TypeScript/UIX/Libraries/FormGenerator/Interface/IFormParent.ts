/// <reference path="IFormChild.ts" />

namespace UIX.Libraries.FormGenerator.Interface{
    export interface IFormParent extends IFormChild{
        readonly children:Interface.IFormChild[];

        sortChildren():void;
        childChanged(formChild:IFormChild, rawValue:string, visibleInputField?:Input.BaseType.VisibleInputField<any, any, any>):void|undefined|null|string;
    }
}