/// <reference path="HintStyle.ts" />
/// <reference path="HintPosition.ts" />
/// <reference path="../../Core/Tools/EscapeTextForHTML.ts" />

namespace UIX.Libraries.Hint{
    export class Hint{
        public static create(message:string, appendToElement?:HTMLElement, position = HintPosition.Auto, style = HintStyle.Info){
            let hint = new Hint(position, style);
            if(appendToElement){
                hint.setAppendToElement(appendToElement);
            }

            return hint;
        }

        public static scrollTo(element:HTMLElement, smoothScroll = true, focus = true){
            if(focus){
                let scrollPositions:[HTMLElement, number, number][] = [];

                if(smoothScroll){
                    let parent = element.parentElement;
                    while(parent){
                        scrollPositions.push([parent, parent.scrollLeft, parent.scrollTop]);
                        parent = parent.parentElement;
                    }
                }

                element.focus();

                for(let i = 0; i < scrollPositions.length; i++){
                    if(scrollPositions[i][0].scrollLeft !== scrollPositions[i][1]){
                        scrollPositions[i][0].scrollLeft = scrollPositions[i][1];
                    }
                    if(scrollPositions[i][0].scrollTop !== scrollPositions[i][2]){
                        scrollPositions[i][0].scrollTop = scrollPositions[i][2];
                    }
                }
            }

            element.scrollIntoView({ behavior: smoothScroll ? "smooth" : "auto", block: "center", inline: "center" });
        }

        private _visible = false;

        public position:HintPosition;
        public style:HintStyle;
        public appendToElement?:HTMLElement;

        public constructor(position:HintPosition, style:HintStyle){
            this.position = position;
            this.style = style;
        }

        public setPosition(position:HintPosition){
            this.position = position;
            return this;
        }

        public setStyle(style:HintStyle){
            this.style = style;
            return this;
        }

        public setAppendToElement(appendToElement?:HTMLElement){
            this.appendToElement = appendToElement;
            return this;
        }

        public show(overrideAppendToElement?:HTMLElement){
            this.hide();
            let appendToElement = overrideAppendToElement ?? this.appendToElement;
            if(appendToElement){

            }
        }

        public scrollTo(smoothScroll = true, focus = true){
            if(this.appendToElement){
                Hint.scrollTo(this.appendToElement, smoothScroll, focus);
            }
        }

        public hide(){
            if(this._visible){
                this._visible = false;
            }
        }
    }
}