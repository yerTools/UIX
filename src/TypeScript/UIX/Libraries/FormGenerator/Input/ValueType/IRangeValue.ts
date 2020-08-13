namespace UIX.Libraries.FormGenerator.Input.ValueType{
    export interface IRangeValue {
        toMinMaxString():string;
        toStepString():string;
        toInputString():string;
        fromInputString(value:string):IRangeValue;
        toString():string;
    }
}