/*

type AllowedInputValueType = string|number|boolean|Color|DateTime|TimeSpan|File;
type InputValueType = AllowedInputValueType|(AllowedInputValueType|InputValueType)[];

InputField<ValueType extends InputValueType>
    parent:Interface.IFormParent;
    inputType:InputType;
	name:string;
	isVisible:boolean
    defaultValue?:ValueType;
    sortingPriority?:number;
    

VisibleInputField<T>:InputField<T>
    displayName?:string;
    description?:string;
	autofocus:boolean
    autocomplete?:string
    isRequired:boolean;
    isReadOnly:boolean;
    isDisabled:boolean

TextInputField:VisibleInputField<string>
    placeholder?:string
    pattern?:string(regex)
    minLength?:number
    maxLength?:number

RangeInputField<T>:VisibleInputField<T>
    min?:T
    max?:T
    step?:T

SelectInputFieldValue<T>
    name:string
    value:T
    //style

SelectInputField<T>:VisibleInputField<T>
    values:(SelectInputFieldValue<T>|SelectInputFieldValue<T>[])[]


FileInputField:VisibleInputField<File>
    accept?:string|string[]
    multiple:boolean
    folder:boolean

--------------------------------

HiddenInput<T>:InputField<T>

TextInput:TextInputField
    multiline:boolean

EmailInput:TextInputField

PasswordInput:TextInputField

SearchInput:TextInputField

UrlInput:TextInputField

CheckboxInput:VisibleInputField<boolean>

NumberInput:RangeInputField<number>
    placeholder?:string

RangeInput:RangeInputField<number>

ColorInput:VisibleInputField<Color>

SingleSelectInput<T>:SelectInputField<T>
    type:Dropdown|Radio

MultiSelectInput<T>:SelectInputField<T>
    type:List|Checkbox
    //select with multiple

DateInput:RangeInputField<DateTime>

TimeInput:RangeInputField<TimeSpan>
    isAbsoluteTime:boolean //o clock or minute

DateTimeInput:RangeInputField<DateTime>
    //Date Input Field + Time Input Field
    minTime?:TimeSpan
    maxTime?:TimeSpan

MonthInput:RangeInputField<DateTime>

WeekInput:RangeInputField<DateTime>

FileInput:FileInputField
    
ImageInput:FileInputField

//List input for multiple dates, emails or other things

================================

Form: use fieldset tag
Button: Submit, Reset, Clear

//store form  data in session cache if there is an accidentally navigation

*/