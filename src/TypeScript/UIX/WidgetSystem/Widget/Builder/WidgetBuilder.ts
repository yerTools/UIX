/// <reference path="../Definition/Widget.ts" />
/// <reference path="../Definition/IWidget.ts" />

namespace UIX.WidgetSystem.Widget.Builder{
    export type MultiWidgetBuilderCallback<T extends WidgetBuilder> = ((this:T, factory:WidgetFactory, currentBuilder:T) => WidgetBuilder|WidgetBuilder[])|WidgetBuilder|WidgetBuilder[];
    export type SingleWidgetBuilderCallback<T extends WidgetBuilder> = ((this:T, factory:WidgetFactory, currentBuilder:T) => WidgetBuilder)|WidgetBuilder;

    export abstract class WidgetBuilder{

        private static registeredParser = new Map<Serializer.WidgetType, (widget:Definition.Widget)=>null|WidgetBuilder>();

        public static register(widgetType:Serializer.WidgetType,tryParseCallback:(widget:Definition.Widget)=>null|WidgetBuilder){
            WidgetBuilder.registeredParser.set(widgetType, tryParseCallback);
        }

        public static tryParse(widget:Definition.Widget){
            try{
                let parser = this.registeredParser.get(widget.serializableWidgetType);
                if(parser){
                    return parser(widget);
                }
            }catch(error){}
            return null;
        }

        protected static addMany<T extends WidgetBuilder>(currentWidgetBuilder:T, children:MultiWidgetBuilderCallback<T>){

            if(typeof children === "function"){
                children = children.call(currentWidgetBuilder, WidgetFactory.factory, currentWidgetBuilder);
            }
            if(children){
                if(!Array.isArray(children)){
                    children = [children];
                }
                return children;
            }

            return [];
        }

        protected static addOne<T extends WidgetBuilder>(currentWidgetBuilder:T, children:SingleWidgetBuilderCallback<T>){

            if(typeof children === "function"){
                children = children.call(currentWidgetBuilder, WidgetFactory.factory, currentWidgetBuilder);
            }
            return children;
        }

        public abstract toWidget(parent:Definition.IWidget):Definition.Widget;
    }    
}
