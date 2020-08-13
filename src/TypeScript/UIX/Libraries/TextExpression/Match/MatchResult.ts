namespace UIX.Libraries.TextExpression.Match{
    export class MatchResult{
        public readonly index:number;
        public readonly length:number;


        public constructor(index:number, length:number){
            this.index = index;
            this.length = length;
        }
    }
}