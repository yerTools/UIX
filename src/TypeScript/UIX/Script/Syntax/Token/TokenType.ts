namespace UIX.Script.Syntax.Token{
    export enum TokenType{
        //EndOfFile
        EndOfFile,

        //Whitespace
        Space,
        Tabulator,
        NewLine,

        //Brace
        CurlyBraceOpen,
        CurlyBraceClose,
        ParenthesisOpen,
        ParenthesisClose,
        SquareBracketOpen,
        SquareBracketClose,

        //Symbol
        Label, //#label
        Name,

        //Value
        //Number
        Integer,
        BinaryNumber,
        OctalNumber,
        HexNumber,
        FloatingPoint,
        ScientificNotation,
        //Text
        Char,
        String,

        //Keyword
        //Type
        Float,
        Double,
        Int,
        Long,
        //ControlFlow
        If,
        Else,
        While,


        //Operator
        Conditional,
        Increment,
        Decrement,
        Dot,
        Comma,
        Colon,
        Semicolon,
        //Assignment
        Assignment,
        OperationAssignment,
        //Comparison
        Equal,
        NotEqual,
        GreaterThan,
        GreaterThanOrEqual,
        LessThan,
        LessThanOrEqual,
        //Arithmetic
        Addition,
        Subtraction,
        Multiplication,
        Division,
        Remainder,
        Exponentiation,
        //Bitwise
        BitwiseAnd,
        BitwiseOr,
        BitwiseXor,
        BitwiseNot,
        LeftShift,
        RightShift,
        //Logical,
        LogicalAnd,
        LogicalOr,
        LogicalNot
    }
}