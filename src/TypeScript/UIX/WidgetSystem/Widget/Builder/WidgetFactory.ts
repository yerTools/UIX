/// <reference path="IWidgetFactory.ts" />
/// <reference path="SiteContentWidgetBuilder.ts" />
/// <reference path="../WebpageWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class WidgetFactory implements IWidgetFactory{
        

        public static buildWebpage(siteContent:((this:SiteContentWidgetBuilder, siteContentWidgetBuilder:SiteContentWidgetBuilder) => void), theme?:Style.Theme){
            let siteContentWidgetBuilder = new SiteContentWidgetBuilder(new WidgetFactory());
            
            siteContent.call(siteContentWidgetBuilder, siteContentWidgetBuilder);

            let webpageWidget = new WebpageWidget(theme);

            webpageWidget.setBody(siteContentWidgetBuilder.toWidget(webpageWidget));
            return webpageWidget;
        }

        public list(children?:((this:ListWidgetBuilder, factory:WidgetFactory, currentBuilder:ListWidgetBuilder) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]){
            return new ListWidgetBuilder(this, children);
        }

        public markdown(markdown?:string){
            return new MarkdownWidgetBuilder(this, markdown);
        }

        public button(text?:string, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            return new ButtonWidgetBuilder(this, text, href, onClick);
        }

        public simpleContainer(child?:((this:SimpleContainerWidgetBuilder, factory:WidgetFactory, currentBuilder:SimpleContainerWidgetBuilder) => WidgetBuilder)|WidgetBuilder, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            return new SimpleContainerWidgetBuilder(this, child, href, onClick);
        }

        public template(){
            return new TemplateFactory(this);
        }
    }
}
