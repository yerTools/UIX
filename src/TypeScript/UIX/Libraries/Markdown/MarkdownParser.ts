/// <reference path="IMarkdownSettings.ts" />
/// <reference path="../ObjectMerger/ObjectMerger.ts" />

namespace UIX.Libraries.Markdown{
    export class MarkdownParser{
        public settings:IMarkdownSettings = {

        };
        public markdown:string;

        public constructor(markdown:string, settings:IMarkdownSettings = {}){
            ObjectMerger.mergeSimilarObjects(this.settings, settings);
            this.markdown = markdown;
        }

        public parse(){
        }
    }
}