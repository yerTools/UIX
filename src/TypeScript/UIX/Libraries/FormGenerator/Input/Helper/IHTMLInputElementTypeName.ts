namespace UIX.Libraries.FormGenerator.Input.Helper{
    
    type type_undefined = undefined;
    type type_input = "text"|"password"|"email"|"search"|"url";

    export interface IHTMLInputElementTypeName {
        "input":type_input,
        "textarea":type_undefined
    }
}