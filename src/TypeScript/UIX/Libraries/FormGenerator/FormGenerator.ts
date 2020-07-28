/// <reference path="Helper/IFormChild.ts" />
/// <reference path="Input/TextInput.ts" />

namespace UIX.Libraries.FormGenerator{
    export class FormGenerator implements Helper.IFormChild{
        public readonly children:Helper.IFormChild[] = [];

        public displayName?:string;
        public description?:string;
        public sortingPriority?:number;
        public namePrefix?:string;

        public constructor(displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string){
            this.displayName = displayName;
            this.description = description;
            this.sortingPriority = sortingPriority;
            this.namePrefix = namePrefix;
        }

        public addChildren(children:Helper.IFormChild[]){
            for(let i = 0; i < children.length; i++){
                this.children.push(children[i]);
            }
        }

        public getFormChildType(){ return Helper.FormChildType.FormGenerator; }

        public sortChildren(){
            this.children.sort((a, b) => 
                a.sortingPriority === undefined ? 
                    (b.sortingPriority === undefined ?  0 : 1) :
                    (b.sortingPriority === undefined ? -1 : b.sortingPriority - a.sortingPriority));
        }

        public getHTMLElement(namePrefix?:string):HTMLElement{
            let container = document.createElement("div");
            container.className = "form-container";

            if(this.displayName){
                let displayName = document.createElement("span");
                displayName.className = "display-name";
                displayName.innerHTML = Core.Tools.escapeTextForHTML(this.displayName);
                container.appendChild(displayName);
            }

            if(this.description){
                let description = document.createElement("div");
                description.className = "description";
                description.innerHTML = Core.Tools.escapeTextForHTML(this.description);
                container.appendChild(description);
            }

            this.sortChildren();
            for(let i = 0; i < this.children.length; i++){
                container.appendChild(this.children[i].getHTMLElement(namePrefix ? (this.namePrefix ? namePrefix + this.namePrefix : namePrefix) : this.namePrefix));
            }

            return container;
        }

        public getFormElement(namePrefix?:string){
            let form = document.createElement("form");
            form.className = "uix form";

            form.appendChild(this.getHTMLElement(namePrefix));

            return form;
        }
    }
}