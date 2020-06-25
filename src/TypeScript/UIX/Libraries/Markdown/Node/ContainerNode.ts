/// <reference path="Node.ts" />

namespace UIX.Libraries.Markdown.Node{
    export abstract class ContainerNode extends Node{
        public static isContainerNode(node:Node):node is ContainerNode{
            return !!(<ContainerNode>node).children;
        }

        public abstract readonly children:Node[] = [];

        public isEmptyOrWhitespace(){
            for(let i = 0; i < this.children.length; i++){
                if(!this.children[i].isEmptyOrWhitespace()){
                    return false;
                }
            }
            return true;
        }
    }
}