namespace UIX.Script.LowLevelLanguage.ByteCode{
    export enum InstructionType{
        Exit        = 0x00,
        Exception   = 0x01,
        NoOperation = 0x02,
        Constant    = 0x03,
        Load        = 0x04,
        Store       = 0x05
    }
}