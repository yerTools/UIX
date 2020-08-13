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

    export function get(categoryType:CategoryType, message:number, replacePlaceholder?:Object){
        return getInLanguage(defaultLanguage, categoryType, message, replacePlaceholder) ?? getInLanguage(fallbackLanguage, categoryType, message, replacePlaceholder);
    }

    export function getInLanguage(language:string, categoryType:CategoryType, message:number, replacePlaceholder?:Object){
        let categories = languages.get(language);
        if(categories){
            let messages = categories.get(categoryType);
            if(messages){
                let messageText = messages.get(message)

                if(messageText && replacePlaceholder && typeof replacePlaceholder === "object"){
                    for(let placeholder in replacePlaceholder){
                        if(typeof (<any>replacePlaceholder)[placeholder] === "string"){
                            messageText = messageText.split("{{" + placeholder + "}}").join((<any>replacePlaceholder)[placeholder]);
                        }
                    }
                }

                return messageText;
            }
        }
        return undefined;
    }
}