/// <reference path="Localization.ts" />
/// <reference path="Language/EN/Index.ts" />
/// <reference path="Language/DE/Index.ts" />

namespace UIX.Localization{
    if(typeof navigator === "object"){
        console.log(changeDefaultLanguage(navigator.language));
        console.log(getCurrentLanguage());
    }
}