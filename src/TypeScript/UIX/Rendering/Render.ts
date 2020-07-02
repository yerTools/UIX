/// <reference path="Widget/WebpageWidget.ts" />
/// <reference path="Widget/VerticalDividerWidget.ts" />
/// <reference path="Widget/MarkdownWidget.ts" />

namespace UIX.Rendering.Render{
    export function test(){
        let webpageWidget = new Widget.WebpageWidget();
        let verticalDividerWidget = new Widget.VerticalDividerWidget(webpageWidget);
        webpageWidget.setBody(verticalDividerWidget);
        let leftMarkdownWidget = new Widget.MarkdownWidget(verticalDividerWidget, "# Hello World!\nWelcome to the *first* UIX Webpage! **I realy hope *you* like it!**");
        verticalDividerWidget.setLeftChild(leftMarkdownWidget);
        let rightMarkdownWidget = new Widget.MarkdownWidget(verticalDividerWidget);
        verticalDividerWidget.setRightChild(rightMarkdownWidget);
        document.body.appendChild(webpageWidget.render());

        setInterval(()=>{
            let time = "Current time: **" + new Date().toLocaleTimeString() + "**";
            rightMarkdownWidget.setMarkdown(time);
        }, 1000);
    }
}