/// <reference path="LanguageDefinition.ts" />
/// <reference path="SyntaxType.ts" />
/// <reference path="TokenFeatureDefinitionMap.ts" />

namespace UIX.Libraries.Markdown.Syntax.LanguageFeatures{

    export const defaultTextContainer = new FeatureDefinition(LanguageDefinition.defaultTextContainer, true);

    export const features:FeatureDefinition[] = new Array(LanguageDefinition.inlineDefinitions.length + LanguageDefinition.specialDefinitions.length + LanguageDefinition.containerDefinitions.length);
    export const syntaxTypeFeatureDefinitionMap = new Map<SyntaxType, FeatureDefinition>();
    export const tokenFeatureDefinitionMap = new TokenFeatureDefinitionMap();
    
    {
        let index = 0;
        for(let i = 0; i < LanguageDefinition.inlineDefinitions.length; i++){
            features[index++] = new FeatureDefinition(LanguageDefinition.inlineDefinitions[i], false);
        }
        for(let i = 0; i < LanguageDefinition.specialDefinitions.length; i++){
            features[index++] = new FeatureDefinition(LanguageDefinition.specialDefinitions[i], false);
        }
        for(let i = 0; i < LanguageDefinition.containerDefinitions.length; i++){
            features[index++] = new FeatureDefinition(LanguageDefinition.containerDefinitions[i], true);
        }

        features.push(defaultTextContainer);

        for(let i = 0; i < features.length; i++){
            syntaxTypeFeatureDefinitionMap.set(features[i].syntaxDefinition.syntaxType, features[i]);
            tokenFeatureDefinitionMap.add(features[i]);
        }
    }
}