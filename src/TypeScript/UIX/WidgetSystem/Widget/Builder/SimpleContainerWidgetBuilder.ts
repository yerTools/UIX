/// <reference path="WidgetBuilder.ts" />
/// <reference path="IWidgetFactory.ts" />
/// <reference path="../SimpleContainerWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class SimpleContainerWidgetBuilder extends WidgetBuilder implements IWidgetFactory{

        private children?:WidgetBuilder;
        private _href?:string;
        private _blankTarget?:boolean;
        private _onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void);

        public constructor(child?:SingleWidgetBuilderCallback<SimpleContainerWidgetBuilder>, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            super();

            if(child){
                this.child(child);
            }
            this._href = href;
            this._blankTarget = blankTarget;
            this._onClick = onClick;
        }

        public child(child:SingleWidgetBuilderCallback<SimpleContainerWidgetBuilder>){
            this.children = WidgetBuilder.addOne(this, child);
            return this;
        }

        public set(href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this._href = href;
            this._blankTarget = blankTarget;
            this._onClick = onClick;
            return this;
        }

        public href(href?:string){
            this._href = href;
            return this;
        }

        public blankTarget(blankTarget?:boolean){
            this._blankTarget = blankTarget;
            return this;
        }

        public onClick(onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this._onClick = onClick;
            return this;
        }

        public list(children?:MultiWidgetBuilderCallback<ListWidgetBuilder>){
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

        public navigation(leftAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>, rightAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>){
            this.children = WidgetFactory.factory.navigation(leftAlignedChildren, rightAlignedChildren);
            return <NavigationWidgetBuilder>this.children;
        }

        public simpleContainer(child?:SingleWidgetBuilderCallback<SimpleContainerWidgetBuilder>, href?:string, blankTarget?:boolean, onClick?:((mouseEvent:MouseEvent, buttonWidget:SimpleContainerWidget)=>void)){
            this.children = WidgetFactory.factory.simpleContainer(child, href, blankTarget, onClick);
            return <SimpleContainerWidgetBuilder>this.children;
        }

        public verticalDivider(leftChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>, rightChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>, width?:number, widthAbsolute?:boolean, widthFromLeft?:boolean, resizable?:boolean){
            this.children = WidgetFactory.factory.verticalDivider(leftChild, rightChild, width, widthAbsolute, widthFromLeft, resizable);
            return <VerticalDividerWidgetBuilder>this.children;
        }

        public template(){
            return WidgetFactory.factory.template();
        }

        public toWidget(parent:Definition.IWidget){
            let simpleContainerWidget = new SimpleContainerWidget(parent, this._href, this._blankTarget, this._onClick);

            if(this.children){
                simpleContainerWidget.setChild(this.children.toWidget(simpleContainerWidget));
            }

            return simpleContainerWidget;
        }
    }

    WidgetBuilder.register(Serializer.WidgetType.SimpleContainer, widget => {
        let child:WidgetBuilder|undefined;

        let widgetChild = (<SimpleContainerWidget>widget).getChild();
        if(widgetChild){
            child = WidgetBuilder.tryParse(widgetChild) ?? undefined;
        }
        
        return new SimpleContainerWidgetBuilder(child, (<SimpleContainerWidget>widget).href, (<SimpleContainerWidget>widget).blankTarget, (<SimpleContainerWidget>widget).onClick);
    });
}
