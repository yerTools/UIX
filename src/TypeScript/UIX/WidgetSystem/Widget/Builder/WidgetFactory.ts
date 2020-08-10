/// <reference path="IWidgetFactory.ts" />
/// <reference path="SiteContentWidgetBuilder.ts" />
/// <reference path="../WebpageWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class WidgetFactory implements IWidgetFactory{
        public static readonly factory = new WidgetFactory();

        public static buildWebpage(siteContent:((this:SiteContentWidgetBuilder, siteContentWidgetBuilder:SiteContentWidgetBuilder) => void), theme?:Style.Theme){
            let siteContentWidgetBuilder = new SiteContentWidgetBuilder();
            
            siteContent.call(siteContentWidgetBuilder, siteContentWidgetBuilder);

            let webpageWidget = new WebpageWidget(theme);

            webpageWidget.setBody(siteContentWidgetBuilder.toWidget(webpageWidget));
            return webpageWidget;
        }

        public list(children?:MultiWidgetBuilderCallback<ListWidgetBuilder>){
            return new ListWidgetBuilder(children);
        }

        public markdown(markdown?:string){
            return new MarkdownWidgetBuilder(markdown);
        }

        public button(text?:string, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            return new ButtonWidgetBuilder(text, href, blankTarget, onClick);
        }

        public navigation(leftAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>, rightAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>){
            return new NavigationWidgetBuilder(leftAlignedChildren, rightAlignedChildren);
        }

        public simpleContainer(child?:SingleWidgetBuilderCallback<SimpleContainerWidgetBuilder>, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            return new SimpleContainerWidgetBuilder(child, href, blankTarget, onClick);
        }

        public verticalDivider(leftChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>, rightChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>, width?:number, widthAbsolute?:boolean, widthFromLeft?:boolean, resizable?:boolean){
            return new VerticalDividerWidgetBuilder(leftChild, rightChild, width, widthAbsolute, widthFromLeft, resizable);
        }

        public template(){
            return TemplateFactory.template;
        }
    }
}
