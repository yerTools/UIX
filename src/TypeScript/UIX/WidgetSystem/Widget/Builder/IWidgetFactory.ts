/// <reference path="ListWidgetBuilder.ts" />
/// <reference path="MarkdownWidgetBuilder.ts" />
/// <reference path="ButtonWidgetBuilder.ts" />
/// <reference path="NavigationWidgetBuilder.ts" />
/// <reference path="SimpleContainerWidgetBuilder.ts" />
/// <reference path="VerticalDividerWidgetBuilder.ts" />
/// <reference path="TemplateFactory.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export interface IWidgetFactory{
        list(children?:MultiWidgetBuilderCallback<ListWidgetBuilder>):ListWidgetBuilder;
        markdown(markdown?:string):MarkdownWidgetBuilder;
        button(text?:string, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)):ButtonWidgetBuilder;
        navigation(leftAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>, rightAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>):NavigationWidgetBuilder;
        simpleContainer(child?:SingleWidgetBuilderCallback<SimpleContainerWidgetBuilder>, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)):SimpleContainerWidgetBuilder;
        verticalDivider(leftChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>, rightChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>):VerticalDividerWidgetBuilder;
        template():TemplateFactory;
    }
}
