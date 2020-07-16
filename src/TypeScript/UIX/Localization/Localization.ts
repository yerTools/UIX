/// <reference path="CategoryType.ts" />

namespace UIX.Localization{
    const languages = new Map<string, Map<CategoryType, Map<number, string>>>();
    const registeredLanguages = new Map<string, string>();
    const fallbackLanguage = "en";
    let defaultLanguage = fallbackLanguage;

    export function getCurrentLanguage(){
        return defaultLanguage;
    }

    export function registerLanguage(shortName:string, name:string, translation:Map<CategoryType, Map<number, string>>){
        shortName = shortName.trim().toLowerCase();

        registeredLanguages.set(shortName, name);
        languages.set(shortName, translation);
    }

    export function changeDefaultLanguage(shortName:string){
        
        shortName = shortName.trim().toLowerCase();

        if(registeredLanguages.has(shortName)){
            defaultLanguage = shortName;
            return true;
        }

        let minusIndex = shortName.indexOf("-");
        if(minusIndex !== -1){
            shortName = shortName.substr(0, minusIndex);

            if(registeredLanguages.has(shortName)){
                defaultLanguage = shortName;
                return true;
            }
        }

        defaultLanguage = fallbackLanguage;
        return false;
    }

    export function get(categoryType:CategoryType, message:number){
        return getInLanguage(defaultLanguage, categoryType, message) ?? getInLanguage(fallbackLanguage, categoryType, message);
    }

    export function getInLanguage(language:string, categoryType:CategoryType, message:number){
        let categories = languages.get(language);
        if(categories){
            let messages = categories.get(categoryType);
            if(messages){
                return messages.get(message)
            }
        }
        return undefined;
    }
}