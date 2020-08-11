/// <reference path="Parser/Parser.ts" />
/// <reference path="Parser/Evaluable/Evaluator.ts" />

namespace UIX.Script{

    export function test(){
        function createSection(name:string){
            let header = document.createElement("h2");
            header.innerText = name + ":";
            header.style.marginBottom = "5px";
            header.style.marginLeft = "2px";
            header.style.color = "#999";
            document.body.appendChild(header);
        }
    
        function createDiv(){
            let div = document.createElement("div");
            div.style.padding = "2px";
            div.style.margin = "2px";
            div.style.fontSize = "16px";
            div.style.outline = "1px solid #444";
            div.style.fontFamily = "Consolas, monospace";
    
            document.body.appendChild(div);
            return div;
        }
    
        function escapeCharForHTML(char:string){
            switch(char){
                case '&':
                    return "&amp;";
                case '"':
                    return "&quot;";
                case '<':
                    return "&lt;";
                case '>':
                    return "&gt;";
                case '\'':
                    return "&#39;";
                case '\n':
                    return "<br/>";
                case ' ':
                    return "&nbsp;";
                default:
                    return char;
            }
        }
    
    
        function escapeTextForHTML(text:string){
            let result = "";
            for(let i = 0; i < text.length; i++){
                result += escapeCharForHTML(text[i]);
            }
            return result;
        }
    
        function escapeAndHighlightHTML(text:string, syntaxTree:Parser.Syntax.SyntaxTree){
            let errorOpenTag = "<span style=\"display:inline-block;border-bottom: 2px solid #f00;\">";
            let errorCloseTag = "</span>";
    
            let errorAtIndex:boolean[] = new Array(text.length +1);
            for(let i = 0; i < errorAtIndex.length; i++){
                errorAtIndex[i] = false;
            }
    
            for(let i = 0; i < syntaxTree.diagnostics.length; i++){
                let index = syntaxTree.diagnostics[i].index;
                if(index !== null){
                    errorAtIndex[index] = true;
                    let length = syntaxTree.diagnostics[i].length;
                    if(length !== null){
                        for(let x = 1; x < length; x++){
                            errorAtIndex[index + x] = true;
                        }
                    }
                }
            }
    
            let colorAtIndex:string[] = new Array(text.length);
            for(let i = 0; i < colorAtIndex.length; i++){
                colorAtIndex[i] = "";
            }

            function goTroughEvaluationRecursive(evaluation:Parser.Evaluable.Evaluation){
                switch(evaluation.evaluationType){
                    case Parser.Evaluable.EvaluationType.Expression:
                        let expression = <Parser.Evaluable.Expression>evaluation;
                        switch(expression.expressionType){
                            case Parser.Evaluable.ExpressionType.Literal:
                                let literalExpression = <Parser.Evaluable.LiteralExpression>expression;
                                for(let i = 0; i < literalExpression.literalToken.rawValue.length; i++){
                                    colorAtIndex[i + literalExpression.literalToken.index] = "#ff0";
                                }
                                break;
                            case Parser.Evaluable.ExpressionType.Parenthesized:
                                let parenthesizedExpression = <Parser.Evaluable.ParenthesizedExpression>expression;
                                colorAtIndex[parenthesizedExpression.openParenthesis.literalToken.index] = "#00f";
                                colorAtIndex[parenthesizedExpression.closeParenthesis.literalToken.index] = "#00f";
                                break;
                            case Parser.Evaluable.ExpressionType.Binary:
                                let binaryExpression = <Parser.Evaluable.BinaryExpression>expression;
                                colorAtIndex[binaryExpression.operation.literalToken.index] = "#0f0";
                                break;
                        }
                        break;
                }

                let children = evaluation.getChildren();
                for(let i = 0; i < children.length; i++){
                    goTroughEvaluationRecursive(children[i]);
                }
            }
            goTroughEvaluationRecursive(syntaxTree.root);
            
            let colorCloseTag = "</span>";
            function getColorOpenTag(color:string){
                return "<span style=\"color:" + color + ";\">";
            }

            let result = "";

            let currentColor = "";
            let errorOpen = false;
    
            for(let i = 0; i < text.length; i++){
                if(errorOpen !== errorAtIndex[i]){
                    result += errorOpen ? errorCloseTag : errorOpenTag;
                    errorOpen = !errorOpen;
                }
                if(currentColor !== colorAtIndex[i]){
                    result += colorAtIndex[i] === "" ? colorCloseTag : ((currentColor === "" ? "" : colorCloseTag) + getColorOpenTag(colorAtIndex[i]));
                    currentColor = colorAtIndex[i];
                }
                result += escapeCharForHTML(text[i]);
            }
    
            if(errorAtIndex[text.length]){
                if(!errorOpen){
                    result += errorOpenTag;
                    errorOpen = true;
                }
                result += escapeCharForHTML(" ");
            }
    
            if(errorOpen){
                result += errorCloseTag;
            }

            if(currentColor !== ""){
                result += colorCloseTag;
            }
    
            return result;
        }

        document.body.style.backgroundColor = "#222";
        document.body.style.color = "#ccc";

        let input = localStorage.getItem("uixScriptInput") ?? "";

        //input = "12 + 34 * 56 / ( 78 - 90) + 5%3";
        //input = "1 + 2 - 3 + 4 - 5 + 6";

        createSection("Input");
        let textarea = document.createElement("textarea");
        textarea.style.width = "calc(100% - 4px)";
        textarea.style.backgroundColor = document.body.style.backgroundColor;
        textarea.style.color = document.body.style.color;
        textarea.style.margin = "2px";
        textarea.style.padding = "4px";
        textarea.style.resize = "vertical";
        textarea.style.height = "100px";
        textarea.style.fontSize = "16px";
        textarea.style.fontFamily = "Consolas, monospace";

        textarea.value = input;
        document.body.appendChild(textarea);

        createSection("Highlighted Input");
        let highlightedInput = createDiv();

        createSection("Output");
        let outputDiv = createDiv();

        createSection("Diagnostics");
        let diagnosticsDiv = createDiv();

        createSection("Tree");
        let treeDiv = createDiv();

        let lastTimeoutHandle:number|undefined;
        textarea.oninput = function(){
            clearTimeout(lastTimeoutHandle);
            lastTimeoutHandle = self.setTimeout(function(){
                let input = textarea.value;

                localStorage.setItem("uixScriptInput", input);
                let parser = new Parser.Parser(input);
                let syntaxTree = parser.parse();

                highlightedInput.innerHTML = escapeAndHighlightHTML(input, syntaxTree);

                console.log(parser, syntaxTree, parser.diagnostics);
                treeDiv.innerHTML = escapeTextForHTML(syntaxTree.root.toString());

                if(parser.diagnostics.length !== 0){
                    diagnosticsDiv.innerText = parser.diagnostics.join("\n");
                    outputDiv.innerText = "ERROR IN PARSER";
                }else{
                    let evaluator = new Parser.Evaluable.Evaluator(syntaxTree.root);

                    outputDiv.innerText = evaluator.evalueate() + "";
                    diagnosticsDiv.innerText = evaluator.diagnostics.join("\n");
                }

            }, 10);
        };
        textarea.oninput(<any>undefined);
    }
}