/// <reference path="../../Core/Tools/EscapeTextForHTML.ts" />
/// <reference path="../../Libraries/Animation/Animation.ts" />

namespace UIX.WidgetSystem.Helper{
    export class Popup{
        private static readonly closedByBlocker = {};
        private static readonly closedByCloseButton = {};
        
        public static createMessage(message:string, title?:string, options = [Localization.get(Localization.CategoryType.PopupMessage, Localization.Category.PopupMessage.Button_Ok)], hasCloseButton = true){
            let popup = new Popup(title, hasCloseButton);
            
            let messageContainer = document.createElement("div");
            messageContainer.className = "uix popup message";
            messageContainer.innerHTML = Core.Tools.escapeTextForHTML(message);
            popup.container.appendChild(messageContainer);

            return popup;
        }

        public static createSimple(title?:string, options:string[] = [], hasCloseButton = true){
            return new Popup(title, hasCloseButton);
        }

        public readonly title?:string;
        public readonly hasCloseButton:boolean;

        public readonly blocker:HTMLDivElement;
        public readonly container:HTMLDivElement;

        private closed = false;

        private constructor(title:string|undefined, hasCloseButton:boolean){
            this.title = title;
            this.hasCloseButton = hasCloseButton;

            this.blocker = document.createElement("div");
            this.blocker.className = "uix popup blocker fading";
            this.blocker.addEventListener("click", event => {
                event.cancelBubble = true;
                event.preventDefault();
                this.close(Popup.closedByBlocker);
            });

            this.blocker.addEventListener("contextmenu", event => {
                event.cancelBubble = true;
                event.preventDefault();
                this.close(Popup.closedByBlocker);
            });

            let wrapper = document.createElement("div");
            wrapper.className = "uix popup wrapper";
            wrapper.addEventListener("click", event => event.cancelBubble = true);
            wrapper.addEventListener("contextmenu", event => event.cancelBubble = true);

            {
                let headline = document.createElement("div");
                headline.className = "uix popup headline";

                if(title){
                    let titleContainer = document.createElement("span");
                    titleContainer.className = "uix popup title";
                    titleContainer.innerHTML = Core.Tools.escapeTextForHTML(title);
                    headline.appendChild(titleContainer);
                }

                if(hasCloseButton){
                    let closeButton = document.createElement("span");
                    closeButton.className = "uix popup close-button";
                    closeButton.addEventListener("click", event => {
                        event.cancelBubble = true;
                        this.close(Popup.closedByCloseButton);
                    });
                    headline.appendChild(closeButton);
                }

                wrapper.appendChild(headline);
            }

            this.container = document.createElement("div");
            this.container.className = "uix popup container";
            wrapper.appendChild(this.container);

            this.blocker.appendChild(wrapper);
            document.body.appendChild(this.blocker);
            Libraries.Animation.fadeIn(this.blocker);
        }

        public close(result?:any){
            if(!this.closed){
                this.closed = true;
                this.blocker.style.pointerEvents = "none";

                Libraries.Animation.fadeOut(this.blocker, undefined, () => {
                    if(this.blocker.parentElement){
                        this.blocker.parentElement.removeChild(this.blocker);
                    }
                });
            }
            
        }
    }
} 