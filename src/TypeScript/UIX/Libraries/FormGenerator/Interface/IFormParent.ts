/// <reference path="IFormChild.ts" />

namespace UIX.Libraries.FormGenerator.Interface{
    export interface IFormParent extends IFormChild{
        readonly children:Interface.IFormChild[];

        sortChildren():void;
        childChanged(formChild:IFormChild):void;
    }
}