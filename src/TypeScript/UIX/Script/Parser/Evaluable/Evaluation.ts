/// <reference path="EvaluationType.ts" />

namespace UIX.Script.Parser.Evaluable{
    export abstract class Evaluation{
        public abstract get evaluationType():EvaluationType;
        public abstract getChildren():Evaluation[];

        public toString(indent = "", isTopLevel = true, isLast = true){
            let result = isTopLevel ? "" : indent + (isLast ? "└───" : "├───");
            result += "[" + EvaluationType[this.evaluationType] + "]";

            let evaluation = <Evaluation>this;

            switch(this.evaluationType){
                case EvaluationType.Expression:
                    result += Expression.getText(<Expression>evaluation);
                    break;
            }

            result += "\n";

            if(!isTopLevel){
                indent += isLast ? "    " : "│   ";
            }
            
            let children = this.getChildren();

            for(let i = 0; i < children.length; i++){
                result += children[i].toString(indent, false, i + 1 === children.length);
            }

            return result;
        };
    }
}