namespace UIX.Core.Tools{
    export class Color{
        public static readonly precision = 100000;
        
        public static white = new Color(1, 1, 1);
        public static black = new Color(0, 0, 0);

        public static add(a:Color, b:Color){
            return new Color(a.r + b.r, a.g + b.g, a.b + b.b);
        }

        public static subtract(a:Color, b:Color){
            return new Color(a.r - b.r, a.g - b.g, a.b - b.b);
        }

        public static gray(percentage:number){
            return new Color(percentage, percentage, percentage);
        }

        public static rgb(red:number, green:number, blue:number){
            return new Color(red / 255, green / 255, blue / 255);
        }

        public static tryParse(value:any){
            if(value && typeof value === "object" && 
                typeof value.r === "number" && typeof value.g === "number" && typeof value.b === "number"){
                    return new Color(value.r, value.g, value.b);
                } 
            return null;
        }

        private static toByte(value:number){
            let nearestByte = Math.round(value * 255);
            return nearestByte < 0 ? 0 : (nearestByte > 255 ? 255 : nearestByte);
        }

        public readonly r:number;
        public readonly g:number;
        public readonly b:number;

        public get rByte(){
            return Color.toByte(this.r);
        }

        public get gByte(){
            return Color.toByte(this.g);
        }

        public get bByte(){
            return Color.toByte(this.b);
        }

        public get hex(){
            let r = this.rByte.toString(16);
            let g = this.gByte.toString(16);
            let b = this.bByte.toString(16);

            if(r.length === 1){
                r = "0" + r;
            }
            if(g.length === 1){
                g = "0" + g;
            }
            if(b.length === 1){
                b = "0" + b;
            }

            return "#" + r + g + b;
        }

        public get rgb(){
            return "rgb(" + this.rByte + "," + this.gByte + "," + this.bByte + ")";
        }

        public constructor(redFloat:number, greenFloat:number, blueFloat:number){
            this.r = Math.round(redFloat * Color.precision)/Color.precision;
            this.g = Math.round(greenFloat * Color.precision)/Color.precision;
            this.b = Math.round(blueFloat * Color.precision)/Color.precision;
        }

        public add(secondColor:Color){
            return Color.add(this, secondColor);
        }

        public subtract(secondColor:Color){
            return Color.subtract(this, secondColor);
        }
    }
}