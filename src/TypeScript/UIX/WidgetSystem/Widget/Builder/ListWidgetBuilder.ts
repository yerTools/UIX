/// <reference path="WidgetBuilder.ts" />
/// <reference path="../ListWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export class ListWidgetBuilder extends WidgetBuilder{

        private readonly children:WidgetBuilder[] = [];

        public constructor(factory:WidgetFactory, children?:((this:ListWidgetBuilder, factory:WidgetFactory, currentBuilder:ListWidgetBuilder) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]){
            super(factory);
            if(children){
                this.add(children);
            }
        }

        public add(children:((this:ListWidgetBuilder, factory:WidgetFactory, currentBuilder:ListWidgetBuilder) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]){

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
}
