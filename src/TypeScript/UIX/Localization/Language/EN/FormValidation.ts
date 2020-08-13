namespace UIX.Localization.Language.EN{
    const category = Category.FormValidation;
    translations.set(CategoryType.FormValidation, new Map<number, string>([
        [category.Field_Is_Required, "Please fill in this field."],
        [category.Field_Has_Minimum_Length, "Please enter at least {{minimumLength}} characters."], //{{minimumLength}} = number of minimum required length
        [category.Field_Has_Maximum_Length, "Please enter no more than {{maximumLength}} characters."], //{{maximumLength}} = number of maximum length
        [category.Field_Has_Pattern, "Please match the required input pattern."],
        [category.Field_Enter_From_Autocomplete_Values, "Please enter a value of the given."],

    ]));
}