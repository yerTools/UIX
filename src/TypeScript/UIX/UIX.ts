/// <reference path="Core/Static/Initialization.ts" />
/// <reference path="Interface/AjaxInterface.ts" />
/// <reference path="Libraries/Uri/Uri.ts" />
/// <reference path="Libraries/Markdown/MarkdownParser.ts" />

namespace UIX{
    AjaxInterface.get("/MarkdownBenchmark.md").then(result =>{
        if(result?.response){

            let textarea = document.createElement("textarea");
            textarea.value = result.response;
            //textarea.value = "This is\nParagraph No.1  \nevent this text is part of it\n\nNext Paragraph\n(No. 2)";
            textarea.style.width = "100%";
            textarea.style.height = "50vh";
            textarea.style.position = "fixed";
            textarea.style.left = "0";
            textarea.style.top = "0";
            textarea.style.padding = "8px";
            textarea.style.resize = "vertical";

            document.body.appendChild(textarea);

            let markdownWrapper = document.createElement("div");
            markdownWrapper.style.height = "calc(100vh - " + textarea.style.height+ ")";
            markdownWrapper.style.width = "100%";
            markdownWrapper.style.boxSizing = "border-box";
            markdownWrapper.style.position = "fixed";
            markdownWrapper.style.left = "0";
            markdownWrapper.style.padding = "8px";
            markdownWrapper.style.top = textarea.style.height;
            markdownWrapper.style.overflow = "auto";
            document.body.appendChild(markdownWrapper);

            let lastTextareaHight = textarea.style.height

            setInterval(function(){
                if(lastTextareaHight != textarea.style.height){
                    lastTextareaHight = textarea.style.height;
                    markdownWrapper.style.top = lastTextareaHight;
                    markdownWrapper.style.height = "calc(100vh - " + lastTextareaHight + ")";
                }
            }, 50);

            let parseTimeDiv = document.createElement("div");
            parseTimeDiv.style.width = "200px";
            parseTimeDiv.style.textAlign = "right";
            parseTimeDiv.style.height = "22px";
            parseTimeDiv.style.right = "22px";
            parseTimeDiv.style.bottom = "2px";
            parseTimeDiv.style.position = "fixed";
            parseTimeDiv.style.zIndex = "10";
            document.body.appendChild(parseTimeDiv);

            let lastTimeout:number|undefined = undefined;
            textarea.oninput = function(){
                clearTimeout(lastTimeout);
                lastTimeout = setTimeout(function(){
                    let startTime = performance.now();
                    let html =  new Libraries.Markdown.MarkdownParser(textarea.value).parseToHTML();
                    let endTime = performance.now();
                    parseTimeDiv.innerText = "Parsed in " + Math.round((endTime - startTime) * 100)/100 + " ms";
                    markdownWrapper.innerHTML = html;
                }, 10);
            };

            textarea.oninput(<any>undefined);
        }
    });
}