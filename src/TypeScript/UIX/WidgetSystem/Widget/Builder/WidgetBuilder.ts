/// <reference path="../Definition/Widget.ts" />
/// <reference path="../Definition/IWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export abstract class WidgetBuilder{

        protected static addMany<T extends WidgetBuilder>(currentWidgetBuilder:T, children:((this:T, factory:WidgetFactory, currentBuilder:T) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[]){

            if(typeof children === "function"){
                children = children.call(currentWidgetBuilder, currentWidgetBuilder.factory, currentWidgetBuilder);
            }
            if(children){
                if(!Array.isArray(children)){
                    children = [children];
                }
                return children;
            }

            return [];
        }

        protected static addOne<T extends WidgetBuilder>(currentWidgetBuilder:T, children:((this:T, factory:WidgetFactory, currentBuilder:T) => WidgetBuilder)|WidgetBuilder){

            if(typeof children === "function"){
                children = children.call(currentWidgetBuilder, currentWidgetBuilder.factory, currentWidgetBuilder);
            }
            return children;
        }

        protected readonly factory:WidgetFactory;

        public constructor(factory:WidgetFactory){
            this.factory = factory;
        }

        public abstract toWidget(parent:Definition.IWidget):Definition.Widget;
    }    
}
