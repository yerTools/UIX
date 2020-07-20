/// <reference path="../../Core/Tools/EscapeTextForHTML.ts" />
/// <reference path="ContextItem.ts" />
/// <reference path="ContextMenuBuilder.ts" />
/// <reference path="AsyncContextItems.ts" />

namespace UIX.Libraries.ContextMenu{
    export class ContextMenu{
        public static create(children:BuilderCallback){
            return new ContextMenu(ContextMenuBuilder.get(children));
        }

        public static test(){
            return ContextMenu.create(builder => [
                builder.placeholder("Hello World!"),
                builder.item("Hello Back!", (event, menu, item) => console.log(event, menu, item)),
                builder.group([
                    builder.item("Test 1", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("Test 2", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("Test 3", (event, menu, item) => console.log(event, menu, item)),
                ]),
                builder.placeholder(),
                builder.group(builder.placeholder("Distance please!")),
                builder.subMenu("More", [
                    builder.item("More 1", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 2", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 3", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 4", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 5", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 6", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 7", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 8", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 9", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("More 10", (event, menu, item) => console.log(event, menu, item)),
                    builder.group(
                        builder.subMenu("Even more", [
                            builder.item("Even more 1", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 2", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 3", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 4", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 5", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 6", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 7", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 8", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 9", (event, menu, item) => console.log(event, menu, item)),
                            builder.item("Even more 10", (event, menu, item) => console.log(event, menu, item)),
                            builder.group(
                                builder.subMenu("Even even more", [
                                    builder.item("Even even more 1", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 2", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 3", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 4", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 5", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 6", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 7", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 8", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 9", (event, menu, item) => console.log(event, menu, item)),
                                    builder.item("Even even more 10", (event, menu, item) => console.log(event, menu, item))
                                ])
                            )
                        ])
                    )
                ]),
                builder.group([
                    builder.greyedOutItem("Greyed Out Item"),
                    builder.group([]),
                    builder.item("Item", (event, menu, item) => console.log(event, menu, item)),
                    builder.item("Item", (event, menu, item) => console.log(event, menu, item), true),
                    builder.placeholder(),
                    builder.placeholder("Placeholder"),
                    builder.placeholder(undefined, (event, menu, item) => console.log(event, menu, item)),
                    builder.placeholder("Placeholder", (event, menu, item) => console.log(event, menu, item)),
                    builder.subMenu("Sub Menu", []),
                    builder.subMenu("Sub Menu", [], true)
                ]),
                builder.group([
                    builder.group([
                        builder.group([
                            builder.group([
                                builder.group([
                                    builder.group([
                                        builder.group([
                                            builder.group([
                                                builder.group([
                                                    builder.group([
                                                        builder.group([
                                                            builder.group([
                                                                builder.group([
                                                                    builder.group([
                                                                        builder.group([
                                                                            builder.group([
                                                                                builder.item("Das", (event, menu, item) => console.log(event, menu, item))
                                                                            ])
                                                                        ])
                                                                    ]),
                                                                    builder.item("Ist", (event, menu, item) => console.log(event, menu, item))
                                                                ])
                                                            ])
                                                        ]),
                                                        builder.item("Ein", (event, menu, item) => console.log(event, menu, item))
                                                    ])
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                    builder.item("Test", (event, menu, item) => console.log(event, menu, item))
                ]),
                builder.group(() => {

                    let runRecursive = (currentLayer:number, itemsPerLayer:number) =>{
                        let result:ContextItem[] = [];

                        for(let i = Math.round(itemsPerLayer / currentLayer); i !== 0; --i){
                            if(currentLayer === 1){
                                result.push(builder.greyedOutItem("Overflow!"));
                            }else{
                                result.push(builder.subMenu("Overflow . . .", runRecursive(currentLayer - 1, itemsPerLayer)));
                            }
                        }

                        return result;
                    };

                    return runRecursive(6, 35);
                }),
                builder.group(builder.subMenu("To Infinity And Beyond", () => {
                    let asyncItems = (level:number) => new AsyncContextItems<number>((parent, mouseEvent, state) => {
                            console.log(parent, mouseEvent, state);
                            let children:ContextItem[] = [];
                            for(let i = 0; i < 50; i++){
                                children.push(builder.subMenu(state + ". To Infinity And Beyond", asyncItems((state ?? 0) + 1)));
                            }
                            return children;
                        }, level);
                    return asyncItems(1);
                }))
            ]);
        }

        public readonly items:ContextItem[]|AsyncContextItems<any>;

        private wrapper?:HTMLElement;

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
        }

        private createWrapper(){
            this.wrapper = document.createElement("div");
            this.wrapper.className = "uix context-menu wrapper";

            this.wrapper.addEventListener("mousedown", event => this.removeWrapper(event), { once: true });
            this.wrapper.addEventListener("wheel", () => this.removeWrapper(), { once: true, passive: true });
            this.wrapper.addEventListener("contextmenu", event => this.removeWrapper(event), { once: true });
            window.addEventListener("resize", () => this.removeWrapper(), { once: true, passive: true });

            document.body.appendChild(this.wrapper);
        }

        private createContextMenu(mouseEvent:MouseEvent, items:ContextItem[], currentItem?:ContextItem){
            if(this.wrapper){
                let contextMenu = document.createElement("div");
                contextMenu.className = "uix context-menu container";

                contextMenu.addEventListener("mousedown", event => event.cancelBubble = true);
                contextMenu.addEventListener("click", event => event.cancelBubble = true);
                contextMenu.addEventListener("wheel", event => event.cancelBubble = true, { passive: true });

                let contextTable = document.createElement("table");
                contextTable.className = "uix context-menu table";

                let appendItems = (items:ContextItem[]) => {
                    for(let i = 0; i < items.length; i++){
                        
                        if(items[i].isGroup){
                            let childrens = items[i].getChildren(this, mouseEvent);
                            if(childrens){
                                appendItems(childrens)
                            }
                        }else{
                            let itemRow = document.createElement("tr");

                            {
                                let nameColumn = document.createElement("td");
                                nameColumn.className = "uix context-menu item-name";
                                if(items[i].name){
                                    nameColumn.innerHTML = Core.Tools.escapeTextForHTML(<string>items[i].name);
                                }
                                itemRow.appendChild(nameColumn);
                            }

                            {
                                let moreColumn = document.createElement("td");
                                if(items[i].hasChildren){
                                    moreColumn.className = "uix context-menu item-more";
                                }
                                itemRow.appendChild(moreColumn);
                            }

                            contextTable.appendChild(itemRow);
                        }
                    }
                };

                appendItems(items);
                contextMenu.appendChild(contextTable);
                this.wrapper.appendChild(contextMenu);

                let margin = 15;

                let boundingClientRect = contextMenu.getBoundingClientRect();
                let windowWidth = window.innerWidth;

                let targetX = mouseEvent.clientX;
                if(targetX < margin){
                    targetX = margin;
                }
                if(targetX + margin + boundingClientRect.width > windowWidth){
                    targetX -= boundingClientRect.width;
                    if(targetX < margin){
                        targetX = margin;
                        contextMenu.style.maxWidth = (windowWidth - 2 * margin) + "px";
                        boundingClientRect = contextMenu.getBoundingClientRect();
                    }
                }

                let windowHeight = window.innerHeight;

                let targetY = mouseEvent.clientY;
                if(targetY < margin){
                    targetY = margin;
                }
                if(targetY + margin + boundingClientRect.height > windowHeight){
                    targetY = windowHeight - margin - boundingClientRect.height;
                    if(targetY < margin){
                        targetY = margin;
                        contextMenu.style.maxHeight = (windowHeight - 2 * margin) + "px";
                    }
                }

                contextMenu.style.left = targetX + "px";
                contextMenu.style.top = targetY + "px";
            }
        }

        public appendTo(htmlElement:HTMLElement){
            htmlElement.addEventListener("contextmenu", mouseEvent => {
                mouseEvent.preventDefault();
                mouseEvent.cancelBubble = true;

                this.createWrapper();
                this.createContextMenu(mouseEvent, Array.isArray(this.items) ? this.items : this.items.invoke(this, undefined, mouseEvent));
            });
        }
    }
}