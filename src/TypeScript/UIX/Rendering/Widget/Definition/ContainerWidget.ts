/// <reference path="Widget.ts" />
/// <reference path="WidgetType.ts" />
/// <reference path="ContainerWidgetType.ts" />

namespace UIX.Rendering.Widget.Definition{
    export abstract class ContainerWidget extends Widget {
        public static isContainerWidget(widget:Widget):widget is ContainerWidget{ return widget.widgetType === WidgetType.Container; }

        public get widgetType(){ return WidgetType.Container; };

        public abstract get children():Widget[];
        public abstract get containerWidgetType():ContainerWidgetType;
    }
}