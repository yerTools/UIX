/// <reference path="../../../Core/Tools/Color.ts" />

namespace UIX.WidgetSystem.Widget.Style{
    export class Theme{
        public static tryParseJSON(json:string){
            return this.tryParse(JSON.parse(json));
        }

        public static tryParse(value:any){
            if(value && typeof value === "object"){
                let theme = new Theme();
                for(let property in value){
                    if(property in theme){
                        let color = Core.Tools.Color.tryParse(value[property]);
                        if(color){
                            (<any>theme)[property] = color;
                        }else{
                            (<any>theme)[property] = value[property];
                        }
                    }
                }
                return theme;
            }
            return null;
        }

        public backgroundColor = Core.Tools.Color.rgb(234, 236, 239); //also for manifest file
        public accentColor = Core.Tools.Color.rgb(64, 131, 202); //also for manifest file

        public fontFamily:string|undefined;

        public headerFooterColor:Core.Tools.Color|undefined;
        
        public textColor:Core.Tools.Color|undefined;
        public lightTextColor:Core.Tools.Color|undefined;

        public underlineHyperlinks?:boolean;
        public boldHyperlinks?:boolean;

        public asCSS(parentCssSelector:string){
            let style = parentCssSelector + "{background-color:" + this.backgroundColor.rgb + ";";
            
            if(this.textColor){
                style += "color:" + this.textColor.rgb + ";";
            }
            if(this.fontFamily){
                style += "font-family:" + this.fontFamily + ";";
            }
            style += "}";

            style += parentCssSelector +  " .accentColor{color:" + this.accentColor.rgb + ";}";

            {
                style += parentCssSelector +  " a{";
                if(this.underlineHyperlinks !== undefined){
                    style += "text-decoration:" + (this.underlineHyperlinks ? "underline" : "none") + ";";
                }
                if(this.boldHyperlinks !== undefined){
                    style += "font-weight:" + (this.boldHyperlinks ? "bold" : "normal") + ";";
                }
                if(this.textColor){
                    style += "color:" + this.textColor.rgb + ";";
                }
                style += "}";
            }

            if(this.headerFooterColor){
                style += parentCssSelector +  " header{background-color:" + this.headerFooterColor.rgb + ";}";
                style += parentCssSelector +  " footer{background-color:" + this.headerFooterColor.rgb + ";}";
            }

            if(this.lightTextColor){
                style += parentCssSelector +  " .lightText{color:" + this.lightTextColor.rgb + ";}";
            }

            return style;
        }

        public serialize(){
            return JSON.stringify(this);
        }
    }
}