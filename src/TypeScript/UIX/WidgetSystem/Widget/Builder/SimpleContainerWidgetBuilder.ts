/// <reference path="WidgetBuilder.ts" />
/// <reference path="IWidgetFactory.ts" />
/// <reference path="../SimpleContainerWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class SimpleContainerWidgetBuilder extends WidgetBuilder implements IWidgetFactory{

        private children?:WidgetBuilder;
        private _href?:string;
        private _onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void);

        public constructor(factory:WidgetFactory, child?:((this:SimpleContainerWidgetBuilder, factory:WidgetFactory, currentBuilder:SimpleContainerWidgetBuilder) => WidgetBuilder)|WidgetBuilder, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            super(factory);
            if(child){
                this.child(child);
            }
            this._href = href;
            this._onClick = onClick;
        }

        public child(child:((this:SimpleContainerWidgetBuilder, factory:WidgetFactory, currentBuilder:SimpleContainerWidgetBuilder) => WidgetBuilder)|WidgetBuilder){
            this.children = WidgetBuilder.addOne(this, child);
            return this;
        }

        public set(href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this._href = href;
            this._onClick = onClick;
            return this;
        }

        public href(href?:string){
            this._href = href;
            return this;
        }

        public onClick(onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this._onClick = onClick;
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

        public button(text?:string, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:ButtonWidget)=>void)){
            this.children = this.factory.button(text, href, onClick);
            return <ButtonWidgetBuilder>this.children;
        }

        public simpleContainer(child?:((this:SimpleContainerWidgetBuilder, factory:WidgetFactory, currentBuilder:SimpleContainerWidgetBuilder) => WidgetBuilder)|WidgetBuilder, href?:string, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this.children = this.factory.simpleContainer(child, href, onClick);
            return <SimpleContainerWidgetBuilder>this.children;
        }

        public template(){
            return this.factory.template();
        }

        public toWidget(parent:Definition.IWidget){
            let simpleContainerWidget = new SimpleContainerWidget(parent, this._href, this._onClick);

            if(this.children){
                simpleContainerWidget.setChild(this.children.toWidget(simpleContainerWidget));
            }

            return simpleContainerWidget;
        }
    }    
}
