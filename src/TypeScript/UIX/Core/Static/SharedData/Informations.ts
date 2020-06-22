/// <reference path="../../../../UIX.Configuration.ts" />

namespace UIX.Core.Static.SharedData{
    declare var window:any;

    export const Informations = {
        isInBrowserContext: false,
        features: {
            serviceWorker: 'serviceWorker' in navigator,
            webWorker: typeof(window) === "object" && !!window.Worker
        }
    };
}