namespace UIX.Libraries.Random.NumberGenerator{
    export function intBetween(max:number, min?:number){
        if(min === undefined){
            min = 0;
        }
        return Math.floor(Math.random() * (1 + max - min)) + min;
    }
}