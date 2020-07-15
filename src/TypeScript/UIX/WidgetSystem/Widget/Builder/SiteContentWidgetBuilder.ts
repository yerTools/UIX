/// <reference path="WidgetBuilder.ts" />
/// <reference path="IWidgetFactory.ts" />
/// <reference path="../SiteContentWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class SiteContentWidgetBuilder extends WidgetBuilder implements IWidgetFactory{

        private children?:WidgetBuilder;

        public constructor(factory:WidgetFactory, child?:((this:SiteContentWidgetBuilder, factory:WidgetFactory, currentBuilder:SiteContentWidgetBuilder) => WidgetBuilder)|WidgetBuilder){
            super(factory);
            if(child){
                this.child(child);
            }
        }

        public child(child:((this:SiteContentWidgetBuilder, factory:WidgetFactory, currentBuilder:SiteContentWidgetBuilder) => WidgetBuilder)|WidgetBuilder){
            this.children = WidgetBuilder.addOne(this, child);
            return this;
        }

        public list(children?:((this:ListWidgetBuilder, factory:WidgetFactory, currentBuilder:ListWidgetBuilder) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]){
            this.children = this.factory.list(children);
            return <ListWidgetBuilder>this.children;
        }

        public markdown(markdown?:string){
            this.children = this.factory.markdown(markdown);
            return <MarkdownWidgetBuilder>this.children;
        }

        public button(text?:string, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            this.children = this.factory.button(text, href, blankTarget, onClick);
            return <ButtonWidgetBuilder>this.children;
        }

        public simpleContainer(child?:((this:SimpleContainerWidgetBuilder, factory:WidgetFactory, currentBuilder:SimpleContainerWidgetBuilder) => WidgetBuilder)|WidgetBuilder, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this.children = this.factory.simpleContainer(child, href, blankTarget, onClick);
            return <SimpleContainerWidgetBuilder>this.children;
        }

        public template(){
            return this.factory.template();
        }

        public toWidget(parent:Definition.IWidget){
            let siteContentWidget = new SiteContentWidget(parent);

            if(this.children){
                siteContentWidget.setChild(this.children.toWidget(siteContentWidget));
            }

            return siteContentWidget;
        }
    }    
}
