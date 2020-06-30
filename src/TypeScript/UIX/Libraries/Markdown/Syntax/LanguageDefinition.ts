/// <reference path="SyntaxDefinition.ts" />
/// <reference path="SyntaxType.ts" />

namespace UIX.Libraries.Markdown.Syntax.LanguageDefinition{
    const possibleSpecialChars = "°^!\"²§³$%&/{([)]=}?\\`´@€*+~'#;,:.-_><|";

    export const defaultTextContainer = SyntaxDefinition.createEnclosed(SyntaxType.Paragraph, "<p>", "</p>", [], "\n\n", false, false);

    export const inlineDefinitions = [
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.Italic, "<em>", "</em>", ["*", "_"]),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.Bold, "<b>", "</b>", ["**", "__"]),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.Strikethrough, "<s>", "</s>", "~~"),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.InlineCode, "<code>", "</code>", "`")
    ];

    export const specialDefinitions = [
        SyntaxDefinition.createSpecial(SyntaxType.InlineLineBreak, "<br/>", "  \n"),
        SyntaxDefinition.createSpecial(SyntaxType.InlineLineBreak, "<hr/>", "---\n"),
        SyntaxDefinition.createSpecial(SyntaxType.CopyrightSign, "©", ["(c)", "(C)"]),
        SyntaxDefinition.createSpecial(SyntaxType.RegisteredSign, "®", ["(r)", "(R)"]),
        SyntaxDefinition.createSpecial(SyntaxType.TrademarkSign, "™", ["(tm)", "(TM)"]),
        SyntaxDefinition.createSpecial(SyntaxType.ParagraphSign, "§", ["(p)", "(P)"]),
        SyntaxDefinition.createSpecial(SyntaxType.EuroSign, "€", ["(e)", "(E)"]),
        SyntaxDefinition.createSpecial(SyntaxType.PlusMinusSign, "±", "+-")
    ];

    export const containerDefinitions = [
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.HeadingH1, "<h1>", "</h1>", "#", false, false),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.HeadingH2, "<h2>", "</h2>", "##", false, false),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.HeadingH3, "<h3>", "</h3>", "###", false, false),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.HeadingH4, "<h4>", "</h4>", "####", false, false),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.HeadingH5, "<h5>", "</h5>", "#####", false, false),
        SyntaxDefinition.createSimpleEnclosed(SyntaxType.HeadingH6, "<h6>", "</h6>", "######", false, false)
    ];

    export const tokenStrings = new Set<string>();
    export const usedSpecialChars = new Set<string>();

    {
        for(let i = 0; i < inlineDefinitions.length; i++){
            for(let x = 0; x < inlineDefinitions[i].openTokens.length; x++){
                tokenStrings.add(inlineDefinitions[i].openTokens[x]);
            }
            for(let x = 0; x < inlineDefinitions[i].closeTokens.length; x++){
                tokenStrings.add(inlineDefinitions[i].closeTokens[x]);
            }
        }

        for(let i = 0; i < specialDefinitions.length; i++){
            for(let x = 0; x < specialDefinitions[i].openTokens.length; x++){
                tokenStrings.add(specialDefinitions[i].openTokens[x]);
            }
            for(let x = 0; x < specialDefinitions[i].closeTokens.length; x++){
                tokenStrings.add(specialDefinitions[i].closeTokens[x]);
            }
        }

        for(let i = 0; i < containerDefinitions.length; i++){
            for(let x = 0; x < containerDefinitions[i].openTokens.length; x++){
                tokenStrings.add(containerDefinitions[i].openTokens[x]);
            }
            for(let x = 0; x < containerDefinitions[i].closeTokens.length; x++){
                tokenStrings.add(containerDefinitions[i].closeTokens[x]);
            }
        }

        tokenStrings.forEach(tokenString => {
            for(let i = 0; i < tokenString.length; i++){
                if(!usedSpecialChars.has(tokenString[i]) && possibleSpecialChars.indexOf(tokenString[i]) !== -1){
                    usedSpecialChars.add(tokenString[i]);
                }
            }
        });
    }
}