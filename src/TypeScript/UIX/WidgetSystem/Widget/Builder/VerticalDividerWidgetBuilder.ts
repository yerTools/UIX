
/// <reference path="WidgetBuilder.ts" />
/// <reference path="../VerticalDividerWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class VerticalDividerWidgetBuilder extends WidgetBuilder{

        private leftChildren?:WidgetBuilder;
        private rightChildren?:WidgetBuilder;

        public constructor(leftChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>, rightChild?:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>){
            super();

            if(leftChild){
                this.leftChild(leftChild);
            }
            if(rightChild){
                this.rightChild(rightChild);
            }
        }

        public leftChild(child:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>){
            this.leftChildren = WidgetBuilder.addOne(this, child);
            return this;
        }

        public rightChild(child:SingleWidgetBuilderCallback<VerticalDividerWidgetBuilder>){
            this.rightChildren = WidgetBuilder.addOne(this, child);
            return this;
        }

        public toWidget(parent:Definition.IWidget){
            let verticalDividerWidget = new VerticalDividerWidget(parent);

            if(this.leftChildren){
                verticalDividerWidget.setLeftChild(this.leftChildren.toWidget(verticalDividerWidget));
            }

            if(this.rightChildren){
                verticalDividerWidget.setRightChild(this.rightChildren.toWidget(verticalDividerWidget));
            }

            return verticalDividerWidget;
        }
    }

    WidgetBuilder.register(Serializer.WidgetType.VerticalDivider, widget => {
        let leftChild:WidgetBuilder|undefined;
        let rightChild:WidgetBuilder|undefined;

        let child = (<VerticalDividerWidget>widget).getLeftChild();
        if(child){
            leftChild = WidgetBuilder.tryParse(child) ?? undefined;
        }

        child = (<VerticalDividerWidget>widget).getRightChild();
        if(child){
            rightChild = WidgetBuilder.tryParse(child) ?? undefined;
        }

        return new VerticalDividerWidgetBuilder(leftChild, rightChild);
    });
}
