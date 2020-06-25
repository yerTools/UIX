/// <reference path="IMarkdownSettings.ts" />
/// <reference path="MarkdownParserState.ts" />
/// <reference path="../ObjectMerger/ObjectMerger.ts" />
/// <reference path="Tokenizer/Tokenizer.ts" />
/// <reference path="ContainerStack.ts" />
/// <reference path="Node/ContainerNode.ts" />
/// <reference path="Node/TextNode.ts" />
/// <reference path="Node/HorizontalLineNode.ts" />

namespace UIX.Libraries.Markdown{
    export class MarkdownParser{
        public settings:IMarkdownSettings = {

        };
        public markdown:string;
        private readonly tokenizer:Tokenizer.Tokenizer;
        private readonly state:MarkdownParserState = new MarkdownParserState();

        public constructor(markdown:string, settings:IMarkdownSettings = {}){
            ObjectMerger.mergeSimilarObjects(this.settings, settings);
            this.markdown = markdown;
            this.tokenizer = new Tokenizer.Tokenizer(this);
        }

        public parse(){
            this.state.reset();
            let containerStack = new ContainerStack(this.state);

            let tokens = this.tokenizer.getAllTokens(true);

            console.log(tokens);

            let count:number;

            for(let i = 0; i < tokens.length; i++){
                switch(tokens[i].type){
                    case Tokenizer.TokenType.Text:
                    case Tokenizer.TokenType.Number:
                        containerStack.pushText(tokens[i].value);
                        break;
                    case Tokenizer.TokenType.Whitespace:
                        if(i + 1 < tokens.length && tokens[i + 1].type !== Tokenizer.TokenType.EndOfLine){
                            containerStack.pushText(" ");
                        }
                        break;
                    case Tokenizer.TokenType.EndOfLine:
                        count = tokens[i].count;
                        if(containerStack.isIn(Node.NodeType.Header)){
                            containerStack.clear();
                            if(count > 2){
                                count--;
                            }else{
                                break;
                            }
                        }
                        if(count > 1){
                            let firstPop = true;
                            do{
                                if(firstPop){
                                    firstPop = false;
                                }else{
                                    containerStack.add(Node.NodeType.Paragraph);
                                }
                                containerStack.popUntil(Node.NodeType.Paragraph);
                                
                                count -= 2;
                            }while(count > 1);
                        }else if(i !== 0 && tokens[i - 1].type === Tokenizer.TokenType.Whitespace && tokens[i - 1].value.length > 1){
                            containerStack.pushText("\n");
                        }else if(containerStack.containerStack.length !== 0){
                            containerStack.pushText(" ");
                        }
                        break;
                    case Tokenizer.TokenType.SpecialChar:
                        let addAsText = true;
                        if(this.state.isInRawBlock){
                        }else{
                            if(addAsText && (i === 0 || tokens[i-1].type === Tokenizer.TokenType.EndOfLine)){
                                switch(tokens[i].value){
                                    case '-':
                                        if(containerStack.containerStack.length === 0){
                                            if(tokens[i].count >= 3){
                                                containerStack.pushNodeIntoTop(new Node.HorizontalLineNode());
                                                addAsText = false;
                                            }
                                        }
                                        break;
                                    case '#':
                                        if(containerStack.containerStack.length === 0){
                                            containerStack.addContainerNode(new Node.HeaderNode(tokens[i].count > 6 ? 6 : tokens[i].count));
                                            addAsText = false;
                                        }
                                }
                            }
                        }
                        
                        if(addAsText){
                            containerStack.pushText(tokens[i].getText());
                        }
                        break;
                }
            }

            return containerStack.markdownNode;
        }

        public parseToHTML(){
            return this.parse().getHTML();
        }
    }
}