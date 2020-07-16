/// <reference path="WidgetBuilder.ts" />
/// <reference path="../MarkdownWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class MarkdownWidgetBuilder extends WidgetBuilder{

        private markdown = "";

        public constructor(markdown?:string){
            super();
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

    WidgetBuilder.register(Serializer.WidgetType.Markdown, widget => {
        return new MarkdownWidgetBuilder((<MarkdownWidget>widget).markdown);
    });
}
