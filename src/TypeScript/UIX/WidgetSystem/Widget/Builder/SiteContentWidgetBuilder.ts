/// <reference path="WidgetBuilder.ts" />
/// <reference path="IWidgetFactory.ts" />
/// <reference path="../SiteContentWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class SiteContentWidgetBuilder extends WidgetBuilder implements IWidgetFactory{

        private children?:WidgetBuilder;

        public constructor(child?:((this:SiteContentWidgetBuilder, factory:WidgetFactory, currentBuilder:SiteContentWidgetBuilder) => WidgetBuilder)|WidgetBuilder){
            super();

            if(child){
                this.child(child);
            }
        }

        public child(child:((this:SiteContentWidgetBuilder, factory:WidgetFactory, currentBuilder:SiteContentWidgetBuilder) => WidgetBuilder)|WidgetBuilder){
            this.children = WidgetBuilder.addOne(this, child);
            return this;
        }

        public list(children?:((this:ListWidgetBuilder, factory:WidgetFactory, currentBuilder:ListWidgetBuilder) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]){
            this.children = WidgetFactory.factory.list(children);
            return <ListWidgetBuilder>this.children;
        }

        public markdown(markdown?:string){
            this.children = WidgetFactory.factory.markdown(markdown);
            return <MarkdownWidgetBuilder>this.children;
        }

        public button(text?:string, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            this.children = WidgetFactory.factory.button(text, href, blankTarget, onClick);
            return <ButtonWidgetBuilder>this.children;
        }

        public simpleContainer(child?:((this:SimpleContainerWidgetBuilder, factory:WidgetFactory, currentBuilder:SimpleContainerWidgetBuilder) => WidgetBuilder)|WidgetBuilder, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this.children = WidgetFactory.factory.simpleContainer(child, href, blankTarget, onClick);
            return <SimpleContainerWidgetBuilder>this.children;
        }

        public template(){
            return WidgetFactory.factory.template();
        }

        public toWidget(parent:Definition.IWidget){
            let siteContentWidget = new SiteContentWidget(parent);

            if(this.children){
                siteContentWidget.setChild(this.children.toWidget(siteContentWidget));
            }

            return siteContentWidget;
        }
    }

    WidgetBuilder.register(Serializer.WidgetType.SiteContent, widget => {
        let child:WidgetBuilder|undefined;

        let widgetChild = (<SiteContentWidget>widget).getChild();
        if(widgetChild){
            child = WidgetBuilder.tryParse(widgetChild) ?? undefined;
        }
        
        return new SiteContentWidgetBuilder(child);
    });
}
