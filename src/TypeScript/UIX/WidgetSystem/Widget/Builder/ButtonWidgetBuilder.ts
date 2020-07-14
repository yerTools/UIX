/// <reference path="WidgetBuilder.ts" />
/// <reference path="../ButtonWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class ButtonWidgetBuilder extends WidgetBuilder{

        private _text = "";
        private _href?:string;
        private _onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void);

        public constructor(factory:WidgetFactory, text?:string, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            super(factory);
            if(text){
                this.set(text, href, onClick);
            }
        }

        public set(text:string, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            this._text = text;
            this._href = href;
            this._onClick = onClick;
            return this;
        }

        public text(text:string){
            this._text = text;
            return this;
        }

        public href(href?:string){
            this._href = href;
            return this;
        }

        public onClick(onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            this._onClick = onClick;
            return this;
        }

        public toWidget(parent:Definition.IWidget){
            return new ButtonWidget(parent, this._text, this._href, this._onClick);
        }
    }    
}
