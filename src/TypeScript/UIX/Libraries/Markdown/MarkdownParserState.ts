/// <reference path="Node/NodeType.ts" />

namespace UIX.Libraries.Markdown{
    export class MarkdownParserState{
        public currentContainerType:Node.NodeType;

        public get isInRawBlock(){
            return this.currentContainerType === Node.NodeType.SourceCode;
        }

        public constructor(){
            this.currentContainerType = Node.NodeType.Markdown;
        }

        public reset(){
            this.currentContainerType = Node.NodeType.Markdown;
        }
    }
}