namespace BuildTools.Helper.ISODateFormat{
    function toTwoDigitString(number:number){
        return number < 10 ? "0" + number : number + "";
    }

    export function format(date:Date){
        return date.getFullYear() + "-" +
            toTwoDigitString(date.getMonth() + 1) + "-" +
            toTwoDigitString(date.getDate()) + " " +
            toTwoDigitString(date.getHours()) + ":" +
            toTwoDigitString(date.getMinutes()) + ":" +
            toTwoDigitString(date.getSeconds());
    }
}