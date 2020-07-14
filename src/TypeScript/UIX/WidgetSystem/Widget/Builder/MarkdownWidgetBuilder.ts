/// <reference path="WidgetBuilder.ts" />
/// <reference path="../MarkdownWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class MarkdownWidgetBuilder extends WidgetBuilder{

        private markdown = "";

        public constructor(factory:WidgetFactory, markdown?:string){
            super(factory);
            if(markdown){
                this.markdown = markdown;
            }
        }

        public set(markdown:string){
            this.markdown = markdown;
            return this;
        }

        public add(markdown:string){
            this.markdown += markdown;
            return this;
        }

        public addLine(markdown?:string){
            if(markdown){
                return this.add(markdown + "\n");
            }
            this.markdown += "\n";
            return this;
        }

        public toWidget(parent:Definition.IWidget){
            return new MarkdownWidget(parent, this.markdown);
        }
    }    
}
