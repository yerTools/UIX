/*

type AllowedInputValueType = string|number|boolean|Color|DateTime|TimeSpan|File;
type InputValueType = AllowedInputValueType|(AllowedInputValueType|InputValueType)[];

InputField<ValueType extends InputValueType>
    parent:Interface.IFormParent;
    name:string;
    defaultValue?:ValueType;
    sortingPriority?:number;
    
    isVisible:boolean

VisibleInputField<T>:InputField<T>
    inputType:InputType;
    displayName?:string;
    description?:string;
    isReadOnly:boolean;
    isRequired:boolean;

    autofocus:boolean
    autocomplete?:string
    isDisabled:boolean

TextInputField:VisibleInputField<string>
    placeholder?:string
    pattern?:string(regex)
    minLength?:number
    maxLength?:number

SelectInputFieldValue<T>
    name:string
    value:T
    //style

SelectInputField<T>:VisibleInputField<T>
    values:(SelectInputFieldValue<T>|SelectInputFieldValue<T>[])[]

RangeInputField<T>:VisibleInputField<T>
    min?:T
    max?:T
    step?:T

FileInputField:VisibleInputField<File>
    accept?:string|string[]
    multiple:boolean
    folder:boolean

--------------------------------

TextInput:TextInputField
    multiline:boolean

SingleSelectInput<T>:SelectInputField<T>
    type:Dropdown|Radio

MultiSelectInput<T>:SelectInputField<T>
    type:List|Checkbox
    //select with multiple

CheckboxInput:VisibleInputField<boolean>

ColorInput:VisibleInputField<Color>

DateInput:RangeInputField<DateTime>

TimeInput:RangeInputField<TimeSpan>
    isAbsoluteTime:boolean //o clock or minute

DateTimeInput:RangeInputField<DateTime>
    //Date Input Field + Time Input Field
    minTime?:TimeSpan
    maxTime?:TimeSpan

EmailInput:TextInputField

FileInput:FileInputField
    
ImageInput:FileInputField

HiddenInput<T>:InputField<T>

MonthInput:RangeInputField<DateTime>

NumberInput:RangeInputField<number>
    placeholder?:string

PasswordInput:TextInputField

RangeInput:RangeInputField<number>

SearchInput:TextInputField

UrlInput:TextInputField

WeekInput:RangeInputField<DateTime>

//List input for multiple dates, emails or other things

================================

Form: use fieldset tag
Button: Submit, Reset, Clear

*/