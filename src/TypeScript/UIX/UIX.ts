/// (UIX.Configuration.ts is generated by the provided buildtools)
/// <reference path="../UIX.Configuration.ts" />

/// <reference path="Polyfill/Polyfills.ts" />
/// <reference path="Core/Static/Initialization.ts" />
/// <reference path="Localization/Index.ts" />

/// <reference path="Interface/AjaxInterface.ts" />
/// <reference path="Interface/ServiceWorkerInterface.ts" />

/// <reference path="Core/Tools/ClearCache.ts" />
/// <reference path="WidgetSystem/Render.ts" />

/// <reference path="Libraries/FormGenerator/FormFactory.ts" />

namespace UIX{
    if(!Core.Tools.ClearCache.clearCacheIfRequired()){
        const UIX_DEVELOPMENT_MODE = true;

        if(UIX_DEVELOPMENT_MODE){

            let formGenerator = Libraries.FormGenerator.FormFactory.create(factory => [

                    factory.form([
                        
                        factory.form([
                            factory.text("general", "Display name", "This is the description.\nInput fields also can also be auto focused by the browser.\nThey support all kinds of autofill capabilities provided by your browser."),
                            factory.text("default-value", "Default value").defaultValue("This input has a default value."),
                            factory.text("required", "Required", "This input is required.").isRequired(true),
                            factory.text("not-required", "Not required", "This input is not required.").isRequired(false),
                            factory.text("read-only", "Read only", "This input is read only.").isReadOnly(true).defaultValue("You can not change me."),
                            factory.text("not-required", "Disabled", "This input is disabled.").isDisabled(true),
                        ], "Basic features", "These features are available on all inputs.\nYou can also add a form to another.").namePrefix("basic-features-"),

                        factory.form([
                            factory.email("email", "Email", "This is a field for an email address.", false, "email", "Input your email address here"),
                            factory.password("password", "Password", "You can enter your password here.", false, "current-password", "This could be your password..."),
                            factory.search("search", "Search", "You can use this one for a search.").placeholder("Enter a term like 'help', 'infos', ..."),
                            factory.text("text", "Text", "This is a simple input for text."). placeholder("You can input anything you want."),
                            factory.textBox("text-box", "Text Box", "This is a box for your text.").placeholder("Write your story here and tell me about your day... :)"),
                            factory.url("url", "Url", "This input field is for entering urls.").placeholder("Enter your favorite meme right here.")
                        ], "Different Input Types", "Here are all available input types for demonstration.").namePrefix("input-types-").autocompleteSection("input-types"),
                    
                        factory.form([
                            factory.text("placeholder", "Placeholder", "Text input fields can have a placeholder.").placeholder("This is the placeholder."),
                            factory.text("pattern", "Pattern", "You can define a pattern, that has to be followed.").pattern("(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-z\\d\\s]).+", "You need at least:\n1 uppercase letter,\n1 lowercase letter,\n1 digit and\n1 special char.").placeholder("(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-z\\d\\s]).+"),
                            factory.text("min-length", "Minimum length", "You can define a minimum length of your input.").minLength(8).placeholder("The minimum length is 8"),
                            factory.text("max-length", "Maximum length", "You can also define a maximum length of your input.").maxLength(8).placeholder("The maximum length is 8"),

                            factory.form([

                            ], "Email", "Features of the email input.").namePrefix("email"),

                            factory.form([

                            ], "Password", "Features of the password input.").namePrefix("password"),

                            factory.form([

                            ], "Search", "Features of the search input.").namePrefix("search"),

                            factory.form([

                            ], "Text Box", "Features of the text box input.").namePrefix("text-box"),

                            factory.form([
                                factory.text("autocomplete", "Autocomplete", "You can add a list with values, that the user can select from.").placeholder("Enter your favorite vehicle manufacturer").autocompleteValues([
                                    "Daihatsu",
                                    "Hino",
                                    "Lexus",
                                    "Toyota",
                                    "Audi",
                                    "Bently",
                                    "Bugatti",
                                    "Ducati",
                                    "Lamborghini",
                                    "MAN",
                                    "Porsche",
                                    "Scania",
                                    "SEAT",
                                    "Škoda",
                                    "Volkswagen",
                                    "VTB",
                                    "Genesis",
                                    "Hyundai",
                                    "Kia",
                                    "Buick",
                                    "Cadillac",
                                    "Chevrolet",
                                    "GMC",
                                    "Holden",
                                    "Jiefang",
                                    "Ford",
                                    "Lincoln",
                                    "Troller Veículos Especiais",
                                    "Datsun",
                                    "Infiniti",
                                    "Nissan",
                                    "Acura",
                                    "Honda",
                                    "Abarth",
                                    "Alfa Romeo",
                                    "Chrysler",
                                    "Dodge",
                                    "Fiat",
                                    "Jeep",
                                    "Lancia",
                                    "Maserati",
                                    "RAM",
                                    "Alpine",
                                    "Dacia",
                                    "Lada",
                                    "Renault",
                                    "Citroën",
                                    "DS",
                                    "Peugeot",
                                    "Opel",
                                    "Vauxhall",
                                    "Suzuki",
                                    "SAIC",
                                    "Daimler",
                                    "Maybach",
                                    "Mercedes-Benz",
                                    "Mercedes-AMG",
                                    "Smart",
                                    "BMW",
                                    "Mini",
                                    "Rolls-Royce",
                                    "Aston Martin",
                                    "Geely",
                                    "Mitsubishi",
                                    "McLaren"
                                ]),
                                factory.text("autocomplete", "Autocomplete 2", "You can force a selection of the provided values. In this case:\nVolkswagen, Mercedes-Benz, BMW, Audi, Porsche").placeholder("Which manufacturer would you prefer?").autocompleteValues([
                                    "Volkswagen",
                                    "Mercedes-Benz",
                                    "BMW",
                                    "Audi",
                                    "Porsche"
                                ]).requireFromAutocompleteValues(true)
                            ], "Text", "Features of the text input.").namePrefix("text"),

                            factory.form([

                            ], "Url", "Features of the url input.").namePrefix("url"),

                        ], "Text input features", "Here are all features available on text inputs.\nThose are Email, Password, Search, Text Box, Text and Url input fields.").namePrefix("text-features-"),

                    ], "Feature demonstration", "Look at all the things I could do for you.").namePrefix("demo-").autocompleteSection("demo"),

                    

                    factory.form([
                        factory.text("firstName", "First Name", undefined, undefined, undefined, true, "given-name"),
                        factory.text("lastName", "Last Name", undefined, undefined, undefined, false, "family-name"),
                        factory.email("email", "E-Mail", undefined, false, "email")
                    ], "Personal Data", "This are all your personal data, we need from you.").autocompleteSection("personal-data"),
    
                    factory.form([
                        factory.text("displayName", "Display Name", undefined, undefined, undefined, false, "username", "This is the name on your profile."),
                        factory.password("password", "Password", "Choose your password", false, "new-password"),
                        factory.password("passwordConfirmation", "Password Confirmation", "Confirm your password", false, "new-password")
                    ], "Account Information", "The information you input here will be visible for everyone.\n(Yes, also your password!)").autocompleteSection("account-information"),
    
                    factory.textBox("message", "Your message here", "Message"),

                    factory.form([
                        factory.text("address", "Address", undefined, undefined, undefined, undefined, "street-address"),
                        factory.text("city", "City", undefined, undefined, undefined, undefined, "address-level2"),
                        factory.text("state", "State", undefined, undefined, undefined, undefined, "address-level1"),
                        factory.text("zip-code", "Zip Code", undefined, undefined, undefined, undefined, "postal-code"),
                        factory.text("phone", "Phone", undefined, undefined, undefined, undefined, "tel")
                    ], "Shipping Information", "We will send you a small gift.").autocompleteSection("shipping"),

            ], "Form Generator", "Powered by the form generator of UIX.").toFormGenerator();

            let formGeneratorHTML = formGenerator.getFormElement();
            document.body.appendChild(formGeneratorHTML);

            (<any>window).formGenerator = formGenerator;

            //WidgetSystem.Render.fallback();
        }else{
            let success = false;
            {
                let localStoredWebsite = localStorage.getItem("webpage");
                if(localStoredWebsite){
                    success = WidgetSystem.Render.fromJson(localStoredWebsite);
                }
            }
            if(!success){
                AjaxInterface.get("/Webpage.uix.json").then(response => {
                    if(response && response.wasSuccessfully){
                        success = WidgetSystem.Render.fromResponse(response);
                    }

                    if(!success){
                        AjaxInterface.get("https://uix.yer.tools/Webpage.uix.json").then(fallbackResponse => {
                            if(fallbackResponse && fallbackResponse.wasSuccessfully){
                                success = WidgetSystem.Render.fromResponse(fallbackResponse);
                            }
                            
                            if(!success && !WidgetSystem.Render.redirectToEditMode()){
                                WidgetSystem.Render.fallback();
                            }
                        });
                    }
                });
            }
        }
    }else{
        WidgetSystem.Render.clearingCacheMessage();
    }
}