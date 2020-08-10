/// <reference path="WidgetBuilder.ts" />
/// <reference path="../NavigationWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class NavigationWidgetBuilder extends WidgetBuilder{

        private readonly leftAlignedChildren:WidgetBuilder[] = [];
        private readonly rightAlignedChildren:WidgetBuilder[] = [];

        public constructor(leftAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>, rightAlignedChildren?:MultiWidgetBuilderCallback<NavigationWidgetBuilder>){
            super();
            if(leftAlignedChildren){
                this.addLeftAligned(leftAlignedChildren);
            }
            if(rightAlignedChildren){
                this.addRightAligned(rightAlignedChildren);
            }
        }

        public addLeftAligned(children:MultiWidgetBuilderCallback<NavigationWidgetBuilder>){
            children = WidgetBuilder.addMany(this, children);
            for(let i = 0; i < children.length; i++){
                this.leftAlignedChildren.push(children[i]);
            }
            return this;
        }

        public addRightAligned(children:MultiWidgetBuilderCallback<NavigationWidgetBuilder>){
            children = WidgetBuilder.addMany(this, children);
            for(let i = 0; i < children.length; i++){
                this.rightAlignedChildren.push(children[i]);
            }
            return this;
        }

        public toWidget(parent:Definition.IWidget){
            let navigationWidget = new NavigationWidget(parent);

            for(let i = 0; i < this.leftAlignedChildren.length; i++){
                navigationWidget.addLeftAlignedChild(this.leftAlignedChildren[i].toWidget(navigationWidget));
            }
            for(let i = 0; i < this.rightAlignedChildren.length; i++){
                navigationWidget.addRightAlignedChild(this.rightAlignedChildren[i].toWidget(navigationWidget));
            }

            return navigationWidget;
        }
    }

    WidgetBuilder.register(Serializer.WidgetType.Navigation, widget => {
        return new NavigationWidgetBuilder(() =>{
            let children:WidgetBuilder[] = [];

            let leftAlignedChildren = (<NavigationWidget>widget).leftAlignedChildren;

            for(let i = 0; i < leftAlignedChildren.length; i++){
                let parsed = WidgetBuilder.tryParse(leftAlignedChildren[i]);
                if(parsed){
                    children.push(parsed);
                }
            }

            return children;
        }, () => {
            let children:WidgetBuilder[] = [];

            let rightAlignedChildren = (<NavigationWidget>widget).rightAlignedChildren;

            for(let i = 0; i < rightAlignedChildren.length; i++){
                let parsed = WidgetBuilder.tryParse(rightAlignedChildren[i]);
                if(parsed){
                    children.push(parsed);
                }
            }

            return children;
        });
    });
}
