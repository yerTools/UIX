/// <reference path="../../Core/Tools/EscapeTextForHTML.ts" />
/// <reference path="ContextItem.ts" />
/// <reference path="ContextMenuBuilder.ts" />
/// <reference path="AsyncContextItems.ts" />

namespace UIX.Libraries.ContextMenu{
    export class ContextMenu{
        public static create(children:BuilderCallback){
            return new ContextMenu(ContextMenuBuilder.get(children));
        }

        public readonly items:ContextItem[]|AsyncContextItems<any>;

        private wrapper?:HTMLElement;
        private pendingPromise?:Promise<ContextItem[]>;

        public constructor(items:ContextItem[]|AsyncContextItems<any>){
            this.items = items;
        }

        private removeWrapper(event?:Event){
            if(event){
                event.preventDefault();
                event.cancelBubble = true;
            }

            if(this.wrapper && this.wrapper.parentElement){
                this.wrapper.parentElement.removeChild(this.wrapper);
                this.wrapper = undefined;
            }

            this.pendingPromise = undefined;
        }

        private createWrapper(){
            this.removeWrapper();

            this.wrapper = document.createElement("div");
            this.wrapper.className = "uix context-menu wrapper";

            this.wrapper.addEventListener("mousedown", event => this.removeWrapper(event), { once: true });
            this.wrapper.addEventListener("wheel", () => this.removeWrapper(), { once: true, passive: true });
            this.wrapper.addEventListener("contextmenu", event => this.removeWrapper(event), { once: true });
            window.addEventListener("resize", () => this.removeWrapper(), { once: true, passive: true });

            document.body.appendChild(this.wrapper);
        }

        private createContextTableRow(currentLayer:number, className:string, currentItem?:ContextItem){
            let tr = document.createElement("tr");
            tr.className = className;

            if(currentItem){
                tr.addEventListener("mouseenter", mouseEvent => {
                    if(this.wrapper){
                        for(let i = this.wrapper.children.length - 1; i > currentLayer; --i){
                            this.wrapper.removeChild(<ChildNode>this.wrapper.lastChild);
                        }

                        this.pendingPromise = undefined;
                        let loadingRows = this.wrapper.querySelectorAll("tr.loading");
                        for(let i = 0; i < loadingRows.length; i++){
                            loadingRows[i].classList.remove("loading");
                        }

                        if(currentItem.isSubMenu){
                            let children = currentItem.getChildren(this, mouseEvent);
                            if(children){
                                let boundingClientRect = tr.getBoundingClientRect();
                                if(Array.isArray(children)){
                                    this.createContextMenu(mouseEvent, children, currentLayer + 1, boundingClientRect.right, boundingClientRect.top, boundingClientRect.width);
                                }else{
                                    this.pendingPromise = children;
                                    tr.classList.add("loading");
                                    children.then(promisedChildren => {
                                        tr.classList.remove("loading");
                                        if(this.pendingPromise === children){
                                            this.createContextMenu(mouseEvent, promisedChildren, currentLayer + 1, boundingClientRect.right, boundingClientRect.top, boundingClientRect.width);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }, { passive: true });
            }
            return tr;
        }

        private createContextMenu(mouseEvent:MouseEvent, items:ContextItem[], currentLayer:number, targetX?:number, targetY?:number, offsetLeftIfNoSpace = 0){
            if(this.wrapper){
                let contextMenu = document.createElement("div");
                contextMenu.className = "uix context-menu container";

                contextMenu.addEventListener("mousedown", event => event.cancelBubble = true);
                contextMenu.addEventListener("click", event => event.cancelBubble = true);
                contextMenu.addEventListener("wheel", event => event.cancelBubble = true, { passive: true });

                let contextTable = document.createElement("table");
                contextTable.className = "uix context-menu table";

                let addGroupSpacer = false;
                let firstItemAdded = false;

                let appendItems = (items:ContextItem[]) => {
                    for(let i = 0; i < items.length; i++){
                        
                        if(items[i].isGroup){
                            let childrens = items[i].getChildren(this, mouseEvent);
                            if(childrens && Array.isArray(childrens)){
                                addGroupSpacer = true;
                                appendItems(childrens);
                                addGroupSpacer = true;
                            }
                        }else{
                            if(addGroupSpacer){
                                if(firstItemAdded){
                                    let groupSpacer = this.createContextTableRow(currentLayer, "group-spacer");
                                    
                                    let td = document.createElement("td");
                                    td.colSpan = 3;
                                    
                                    groupSpacer.appendChild(td);
                                    contextTable.appendChild(groupSpacer);
                                }
                                addGroupSpacer = false;
                            }

                            let itemRow = this.createContextTableRow(currentLayer, "item-row", items[i]);
                            
                            //icon
                            {
                                let iconColumn = document.createElement("td");
                                iconColumn.className = "uix context-menu empty-icon";
                                itemRow.appendChild(iconColumn);
                            }

                            //item name
                            {
                                let nameColumn = document.createElement("td");
                                if(items[i].name){
                                    if(items[i].greyedOut){
                                        itemRow.classList.add("greyed-out");
                                    }else if(items[i].isPlaceholder){
                                        itemRow.classList.add("placeholder");
                                    }else{
                                        itemRow.classList.add("clickable");
                                        let currentItem = items[i];

                                        if(!items[i].hasChildren && currentItem.onClick){
                                            itemRow.addEventListener("click", mouseEvent => {
                                                (<OnItemClickCallback>currentItem.onClick).call(currentItem, mouseEvent, this, currentItem);
                                                this.removeWrapper();
                                            }, { passive: true, once: true });
                                        }
                                    }
                                    nameColumn.className = "uix context-menu item-name";
                                    nameColumn.innerHTML = Core.Tools.escapeTextForHTML(<string>items[i].name);
                                }else{
                                    nameColumn.className = "uix context-menu item-empty";
                                }
                                itemRow.appendChild(nameColumn);
                            }

                            //more icon
                            {
                                let moreColumn = document.createElement("td");
                                if(items[i].hasChildren){
                                    moreColumn.className = "uix context-menu item-more";
                                }else{
                                    moreColumn.className = "uix context-menu empty-icon";
                                }
                                itemRow.appendChild(moreColumn);
                            }

                            contextTable.appendChild(itemRow);
                            firstItemAdded = true;
                        }
                    }
                };

                appendItems(items);
                contextMenu.appendChild(contextTable);
                this.wrapper.appendChild(contextMenu);

                //move context menu to the right location
                {
                    let margin = 15;
                    let distanceX = targetX === undefined ? 5 : 0;

                    let boundingClientRect = contextMenu.getBoundingClientRect();
                    let windowWidth = window.innerWidth;

                    if(targetX === undefined){
                        targetX = mouseEvent.clientX + distanceX;
                    }
                    if(targetX < margin){
                        targetX = margin;
                    }
                    if(targetX + margin + boundingClientRect.width > windowWidth){
                        targetX -= boundingClientRect.width + 2 * distanceX + offsetLeftIfNoSpace;
                        if(targetX < margin){
                            targetX = margin;
                            contextMenu.style.maxWidth = (windowWidth - 2 * margin) + "px";
                            boundingClientRect = contextMenu.getBoundingClientRect();
                        }
                    }

                    let windowHeight = window.innerHeight;

                    if(targetY === undefined){
                        targetY = mouseEvent.clientY;
                    }
                    if(targetY < margin){
                        targetY = margin;
                    }
                    if(targetY + margin + boundingClientRect.height > windowHeight){
                        targetY = windowHeight - margin - boundingClientRect.height;
                        if(targetY < margin){
                            targetY = margin;
                            contextMenu.style.maxHeight = (windowHeight - 2 * margin) + "px";
                            boundingClientRect = contextMenu.getBoundingClientRect();
                        }
                    }

                    contextMenu.style.left = targetX + "px";
                    contextMenu.style.top = targetY + "px";
                }
            }
        }

        public appendTo(htmlElement:HTMLElement){
            htmlElement.addEventListener("contextmenu", mouseEvent => {
                mouseEvent.preventDefault();
                mouseEvent.cancelBubble = true;

                this.createWrapper();

                let items = Array.isArray(this.items) ? this.items : this.items.invoke(this, undefined, mouseEvent);
                if(Array.isArray(items)){
                    this.createContextMenu(mouseEvent, items, 0);
                }else{
                    this.pendingPromise = items; 
                    items.then(promisedItems => {
                        if(this.pendingPromise === items){
                            this.createContextMenu(mouseEvent, promisedItems, 0);
                        }
                    });
                }
            });
        }
    }
}