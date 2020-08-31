/// <reference path="InstructionType.ts" />

namespace UIX.Script.LowLevelLanguage.ByteCode{
    export enum OperationCode{
        EndOfFile   = 0x00 & (InstructionType.Exit << 8),
        NoOperation = 0x01 & (InstructionType.NoOperation << 8),
    }
}