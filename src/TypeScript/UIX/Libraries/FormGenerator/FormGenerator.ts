/// <reference path="Interface/IFormParent.ts" />
/// <reference path="Input/TextInput.ts" />

namespace UIX.Libraries.FormGenerator{
    export class FormGenerator implements Interface.IFormParent{
        public readonly parent?:Interface.IFormParent;
        public readonly children:Interface.IFormChild[] = [];

        public readonly displayName?:string;
        public readonly description?:string;
        public readonly sortingPriority?:number;
        public readonly namePrefix?:string;

        public constructor(parent?:Interface.IFormParent, displayName?:string, description?:string, sortingPriority?:number, namePrefix?:string){
            this.parent = parent;
            
            this.displayName = displayName;
            this.description = description;
            this.sortingPriority = sortingPriority;
            this.namePrefix = namePrefix;
        }

        public addChildren(children:Interface.IFormChild[]){
            for(let i = 0; i < children.length; i++){
                this.children.push(children[i]);
            }
        }

        public getFormChildType(){ return Interface.FormChildType.FormGenerator; }

        public sortChildren(){
            this.children.sort((a, b) => 
                a.sortingPriority === undefined ? 
                    (b.sortingPriority === undefined ?  0 : 1) :
                    (b.sortingPriority === undefined ? -1 : b.sortingPriority - a.sortingPriority));
        }

        public childChanged(formChild:Interface.IFormChild){

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

            let childrenContainer = document.createElement("div");
            childrenContainer.className = "children-container";

            this.sortChildren();

            for(let i = 0; i < this.children.length; i++){
                childrenContainer.appendChild(this.children[i].getHTMLElement(namePrefix ? (this.namePrefix ? namePrefix + this.namePrefix : namePrefix) : this.namePrefix));
            }

            container.appendChild(childrenContainer);

            if(this.isReady()){
                container.classList.add("is-ready");
            }
            
            if(this.hasError()){
                container.classList.add("has-error");
            }

            return container;
        }

        public getFormElement(namePrefix?:string){
            let form = document.createElement("form");
            form.className = "uix form-generator";

            form.appendChild(this.getHTMLElement(namePrefix));

            return form;
        }

        public hasError(){
            for(let i = 0; i < this.children.length; i++){
                if(this.children[i].hasError()){
                    return true;
                }
            }
            return false;
        }

        public isReady(){
            for(let i = 0; i < this.children.length; i++){
                if(!this.children[i].isReady()){
                    return false;
                }
            }
            return true;
        }
    }
}