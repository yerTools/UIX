/// <reference path="IMarkdownSettings.ts" />
/// <reference path="../ObjectMerger/ObjectMerger.ts" />
/// <reference path="Tokenizer/Tokenizer.ts" />
/// <reference path="Syntax/LanguageDefinition.ts" />
/// <reference path="Syntax/SyntaxParser.ts" />

namespace UIX.Libraries.Markdown{
    export class MarkdownParser{
        public settings:IMarkdownSettings = {

        };
        public markdown:string;
        private readonly tokenizer:Tokenizer.Tokenizer;

        public constructor(markdown:string, settings:IMarkdownSettings = {}){
            ObjectMerger.mergeSimilarObjects(this.settings, settings);
            this.markdown = markdown;
            this.tokenizer = new Tokenizer.Tokenizer(markdown);
        }

        public parse(){
            return new Syntax.SyntaxParser(this.tokenizer).parse();
        }

        public parseToHTML(){
            return this.parse().markdownContainer.getHTML();
        }
    }
}