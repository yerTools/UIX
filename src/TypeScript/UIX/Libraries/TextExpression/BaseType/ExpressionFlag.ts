namespace UIX.Libraries.TextExpression.BaseType{
    export enum ExpressionFlag{
        None =                     0,
        IgnoreCase =               1 << 0,
        FromBeginning =            1 << 1,
        FromEnding =               1 << 2,
        FromBeginningToEnding = 0b11 << 1
    }
}