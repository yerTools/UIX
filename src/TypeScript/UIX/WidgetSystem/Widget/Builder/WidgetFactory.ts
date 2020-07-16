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

        public list(children?:((this:ListWidgetBuilder, factory:WidgetFactory, currentBuilder:ListWidgetBuilder) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]){
            return new ListWidgetBuilder(children);
        }

        public markdown(markdown?:string){
            return new MarkdownWidgetBuilder(markdown);
        }

        public button(text?:string, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            return new ButtonWidgetBuilder(text, href, blankTarget, onClick);
        }

        public simpleContainer(child?:((this:SimpleContainerWidgetBuilder, factory:WidgetFactory, currentBuilder:SimpleContainerWidgetBuilder) => WidgetBuilder)|WidgetBuilder, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            return new SimpleContainerWidgetBuilder(child, href, blankTarget, onClick);
        }

        public template(){
            return TemplateFactory.template;
        }
    }
}
