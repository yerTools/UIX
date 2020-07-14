/// <reference path="ListWidgetBuilder.ts" />
/// <reference path="MarkdownWidgetBuilder.ts" />
/// <reference path="ButtonWidgetBuilder.ts" />
/// <reference path="TemplateFactory.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export interface IWidgetFactory{
        list(children?:((this:ListWidgetBuilder, factory:WidgetFactory, currentBuilder:ListWidgetBuilder) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]):ListWidgetBuilder;
        markdown(markdown?:string):MarkdownWidgetBuilder;
        button(text?:string, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)):ButtonWidgetBuilder;
        template():TemplateFactory;
    }
}
