/// <reference path="SyntaxType.ts" />

namespace UIX.Libraries.Markdown.Syntax{
    export class SyntaxDefinition{
        public static createSimpleEnclosed(syntaxType:SyntaxType, htmlOpenTag:string, htmlCloseTag:string, openAndCloseText:string|string[], closeTokenRequired = true, canBeInContainer = true, endsWithNewLine = false){
            return SyntaxDefinition.createEnclosed(syntaxType, htmlOpenTag, htmlCloseTag, openAndCloseText, openAndCloseText, closeTokenRequired, canBeInContainer, endsWithNewLine);
        }

        public static createEnclosed(syntaxType:SyntaxType, htmlOpenTag:string, htmlCloseTag:string, openText:string|string[], closeText:string|string[], closeTokenRequired = true, canBeInContainer = true, endsWithNewLine = false){
            if(!Array.isArray(openText)){
                openText = [openText];
            }else{
                openText = openText.slice();
            }

            if(!Array.isArray(closeText)){
                closeText = [closeText];
            }else{
                closeText = closeText.slice();
            }

            openText.push(htmlOpenTag);
            closeText.push(htmlCloseTag);

            return new SyntaxDefinition(syntaxType, openText, closeText, htmlOpenTag, htmlCloseTag, closeTokenRequired, canBeInContainer, true, endsWithNewLine);
        }

        public static createSpecial(syntaxType:SyntaxType, htmlTag:string, openText:string|string[], canBeInContainer = true){
            if(!Array.isArray(openText)){
                openText = [openText];
            }

            openText.push(htmlTag);

            return new SyntaxDefinition(syntaxType, openText, [], htmlTag, null, false, canBeInContainer, false, true);
        }

        public readonly syntaxType:SyntaxType;
        public readonly openTokens:string[];
        public readonly closeTokens:string[];
        public readonly closeTokenRequired:boolean;
        public readonly canBeInContainer:boolean;
        public readonly canHaveChildren:boolean;
        public readonly endsWithNewLine:boolean;
        public readonly htmlOpenTag:string;
        public readonly htmlCloseTag:string|null;

        public get hasCloseToken(){
            return this.closeTokens.length !== 0;
        }

        public constructor(syntaxType:SyntaxType, openTokens:string[], closeTokens:string[], htmlOpenTag:string, htmlCloseTag:null|string, closeTokenRequired:boolean, canBeInContainer:boolean, canHaveChildren:boolean, endsWithNewLine:boolean){
            this.syntaxType = syntaxType;
            this.openTokens = openTokens;
            this.closeTokens = closeTokens;
            this.htmlOpenTag = htmlOpenTag;
            this.htmlCloseTag = htmlCloseTag;
            this.closeTokenRequired = closeTokenRequired;
            this.canBeInContainer = canBeInContainer;
            this.canHaveChildren = canHaveChildren;
            this.endsWithNewLine = endsWithNewLine;
        }

    }

}