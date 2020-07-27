/// <reference path="WidgetBuilder.ts" />
/// <reference path="../ListWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class ListWidgetBuilder extends WidgetBuilder{

        private readonly children:WidgetBuilder[] = [];

        public constructor(children?:MultiWidgetBuilderCallback<ListWidgetBuilder>){
            super();
            if(children){
                this.add(children);
            }
        }

        public add(children:MultiWidgetBuilderCallback<ListWidgetBuilder>){
            children = WidgetBuilder.addMany(this, children);
            for(let i = 0; i < children.length; i++){
                this.children.push(children[i]);
            }
            return this;
        }

        public toWidget(parent:Definition.IWidget){
            let listWidget = new ListWidget(parent);

            for(let i = 0; i < this.children.length; i++){
                listWidget.addChild(this.children[i].toWidget(listWidget));
            }

            return listWidget;
        }
    }

    WidgetBuilder.register(Serializer.WidgetType.List, widget => {
        return new ListWidgetBuilder(() =>{
            let children:WidgetBuilder[] = [];

            let widgets = (<ListWidget>widget).children;

            for(let i = 0; i < widgets.length; i++){
                let parsed = WidgetBuilder.tryParse(widgets[i]);
                if(parsed){
                    children.push(parsed);
                }
            }

            return children;
        });
    });
}
