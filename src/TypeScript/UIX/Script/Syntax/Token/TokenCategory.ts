namespace UIX.Script.Syntax.Token{
    export enum TokenCategory{
        Unknown,
        EndOfFile,
        Whitespace,
        Brace,
        Symbol,

        Value,
        Number,
        Text,

        Keyword,
        Type,
        ControlFlow,

        Operator,
        Assignment,
        Comparison,
        Arithmetic,
        Bitwise,
        Logical
    }
}