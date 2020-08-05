namespace UIX.Localization.Language.DE{
    const category = Category.FormValidation;
    translations.set(CategoryType.FormValidation, new Map<number, string>([
        [category.Field_Is_Required, "Bitte füllen Sie dieses Feld aus."],
        [category.Field_Has_Minimum_Length, "Bitte geben Sie mindestens {{minimumLength}} Zeichen ein."], //{{minimumLength}} = number of minimum required length
        [category.Field_Has_Maximum_Length, "Bitte geben Sie nicht mehr als {{maximumLength}} Zeichen ein."], //{{maximumLength}} = number of maximum length
        [category.Field_Has_Pattern, "Bitte befolgen Sie das benötigte Eingabemuster."],
        [category.Field_Enter_From_Autocomplete_Values, "Bitte geben Sie einen Wert der vorgegebenen ein."],
    ]));
}