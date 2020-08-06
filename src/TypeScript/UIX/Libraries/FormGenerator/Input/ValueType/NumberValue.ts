/// <reference path="IRangeValue.ts" />

namespace UIX.Libraries.FormGenerator.Input.ValueType{
    export class NumberValue implements IRangeValue{
        public static readonly numberRegex = new RegExp("^[+-]?(?=\\d|\\.\\d)\\d*\\.?\\d*(?:[eE][+-]?\\d+)?$");

        public readonly value:string|number;

        public constructor(value:number|string){
            let finalValue:string|number|undefined;

            if(typeof value === "string"){
                if(value){
                    let parsedValue = +value;
                    if(!isNaN(parsedValue) && parsedValue.toString() === value){
                        finalValue = parsedValue;
                    }
                    
                    if(finalValue === undefined && NumberValue.numberRegex.test(value)){
                        finalValue = value;
                    }

                    if(finalValue === undefined){
                        value = parsedValue;
                    }
                }
            }

            if(finalValue !== undefined){
                this.value = finalValue;
            }else if(typeof value === "number" && isFinite(value)){
                this.value = value;
            }else{
                this.value = NaN;
            }
        }

        public get isValid(){
            return typeof this.value === "string" || !isNaN(this.value);
        }

        public get isSimpleNumber(){
            return typeof this.value === "number" && !isNaN(this.value);
        }

        public toNumber(){
            return typeof this.value === "string" ? +this.value : this.value;
        }

        public toMinMaxString(){
            return this.toString();
        }

        public toStepString(){
            return this.toString();
        }

        public toInputString(){
            return this.toString();
        }

        public fromInputString(value:string){
            return new NumberValue(value);
        };

        public toString(){
            return typeof this.value === "number" ? this.value.toString() : this.value;
        }
    }
}