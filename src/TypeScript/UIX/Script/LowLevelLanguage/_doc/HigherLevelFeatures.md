# Keywords:

## `mut`:
This keyword is used before the type of a variable declaration.
It indicates that the declared variable is mutable and can be changed at a later point.  
Examples can be found in the section [**Values**](#values).

## `empty`:
This keyword fills the allocated storage of an object with zeros.  
Examples can be found in the section [**Values**](#values).

## `if`:
The keyword `if` is used for simple branching.  
Examples can be found in the section [**Conditional Branching**](#conditional-branching).

## `else`:
The keyword `else` is used for simple branching. The program will execute the code of the *else-block* if the previous if block 'fails'.  
Examples can be found in the section [**Conditional Branching**](#conditional-branching).

## `switch`:
This keyword is used if you have multiple options and want to choose the matching one.
The type of the switch statement and the one in the cases has to be ths same.  
Examples can be found in the section [**Conditional Branching**](#conditional-branching).

## `case`:
This keyword is exclusively used inside the *switch* block and represents a possible option.  
Examples can be found in the section [**Conditional Branching**](#conditional-branching).

## `break`:
This keyword can be used inside a *switch* or a *while* block and breaks/leaves it.  
Examples can be found in the sections [**Conditional Branching**](#conditional-branching) and [**Loops**](#loops).

## `return`:
If this keyword is used inside a function body, it will leave it and return optionally a value.  
Examples can be found in the sections [**Conditional Branching**](#conditional-branching), [**Loops**](#loops) and [**Functions**](#functions).

## `goto`:
This is a jump instruction to a specified target. This target is of the type label which must be inside the current function scope.  
Examples can be found in the section [**Loops**](#loops).

---

# Values:
**mutable prefix:** `mut`

## Numbers:
**(*signed*) integers:** `i8`, `i16`, `i32`, `i64`, `i128`  
**unsigned integers:** `u8`, `u16`, `u32`, `u64`, `u128`  
**floating points:** `f16`, `f32`, `f64`, `f128`

*(You can parse between those number types if you write the target type in* `(`*target type*`)` *followed by the wanted value.)*

### Examples:
````
i8 signedByte = 12;
u8 unsignedByte = i8; //implicit parsing

u32 hexadecimalNotation = 0x0f12;
u32 octalNotation = 0o765;
u32 binaryNotation = 0b101;

i32 = 13.37; //converts it to an valid i32
u32 = (u32) i32; //explicit parsing 

f32 test1 = (f64) 13.37;
f32 test2 = test1;

mut f128 counter;
counter = 2;
````

## Tuples:
`(`*value types with a known length separated by commas*`) `*name*` = (`*values of said types separated by commas*`);`  
Those values can by accessed using `[`*index of element*`]`.   
*(Tuples can't be empty and the size has to be known at compile time.)*

**If you want the storage of the tuple to be filled with zeros, you can use the '*empty*' keyword.**  

### Examples:
````
(i8, i8, i8) test1 = (1, 2, 3);
(u8, u16, u32, u64, u128) test2 = (8, 16, 32, 64, 128);

mut (u8, u64) state = empty;
state[0] = 1;
state[1] = 2;

(u8, u8, u8) maybeRandomData; //the data previously on the stack isn't cleared, so it might not be filled with zeros
````


## Arrays:
*value type with a known length*`[`*number of entries*`]`  
Those values can by accessed using `[`*index of element*`]`.   
*(If the* **number of entries** *is a known number at compile time, than arrays can be used in tuples.)*

**If you want the storage of the array to be filled with zeros, you can use the '*empty*' keyword.**  
**If you want to initialize it with values, you can write them as a comma separated list inside of** `[` `]` **.**

### Examples:
````
mut u8[64] buffer; //the data previously on the stack isn't cleared, so it might not be filled with zeros
buffer[0] = 4;

buffer = empty; //fills the buffer with zeros


i8 length = 32;
mut i32[length] numbers = empty;

numbers[0] = 1337;

i32[] config = [1, 3, 3, 7]; //you don't need to specific the length here, the compiler can figure that out
````

---

# Conditional Branching:
`if(`*expression*`){`**code**`}`  
`if(`*expression*`){`**code**`}else{`**code**`}`

`switch(`*statement*`){case `*statement*`: `**code**` break;|return;}`

## Examples:

````
if(true){
    //if expression is true:

    //code here
}
````

````
if(true){
    //if expression is true:

    //code here
}else{
    //if expression is false:

    //other code here
}
````

````
i32 value = 2;

switch(value){
    case 1:
        //if value == 1:

        //code here

        break; //leaves the 'switch' statement (is required)
    case 2:
        //if value == 2:

        //code here

        return 1; //must be in function body to be able to return
    case 3:
        //if value == 3:

        //code here

        break; //leaves the 'switch' statement (is required)
    default:
        //if no case matches:

        //code here

        break; //leaves the 'switch' statement (is required)
}
````


---

# Loops:
`while(`*expression*`){`**block**` ` *break;*` `*continue;*` `*return;*`}`  
`goto `*label*`;`

## Examples:

````
mut i32 i = 0;
while(i < 10){
    //if i < 10:

    //code here

    if(i < 3){
        continue; //jumps back to the 'while' statement an executes it again
    }

    //code here

    if(i == 100){
        return 100; //must be in function body to be able to return
    }


    if(i > 10){
        break; //leaves the 'while' statement
    }

    //jumps back to the 'while' statement an executes it again
}
````

````
mut i32 i = 0;
:topOfCode;

//code here

if(i < 10){
    goto topOfCode;
}

````

---

## Functions:



---

