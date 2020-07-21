namespace UIX.Libraries{
    export class Uri{
        private static protocolRegex = new RegExp("^[A-Za-z0-9+\\.-]+$");

        public static current = new Uri(location.href);

        public static fromRelative(relativeUrl:string, baseUri?:Uri){
            if(!baseUri){
                baseUri = Uri.current;
            }
            return baseUri.withRelative(new Uri(relativeUrl));
        }

        public readonly isAbsolute:boolean;

        public readonly relativePath:boolean;
        public readonly isFile:boolean;

        public readonly protocol:string|null;
        public readonly host:string|null;
        public readonly port:number|null;
        public readonly path:string[]|null;
        public readonly query:string|null;
        public readonly hash:string|null;
        public readonly completePath:string;

        public constructor(url:string){
            this.completePath = url.trim();
            let containsProtocol = false;

            let protocolIndex = url.indexOf("://");
            if(protocolIndex !== -1){
                containsProtocol = Uri.protocolRegex.test(url.substring(0, protocolIndex));
            }

            if(containsProtocol){
                this.protocol = url.substring(0, protocolIndex);
                url = url.substring(protocolIndex + 3);
            }else{
                this.protocol = null;
                this.host = null;
                this.port = null;
            }

            let hashIndex = url.indexOf("#");
            if(hashIndex === -1){
                this.hash = null; 
            }else{
                this.hash = url.substring(hashIndex + 1).trim();
                if(this.hash === ""){
                    this.hash = null;
                }
                url = url.substring(0, hashIndex);
            }

            let queryIndex = url.indexOf("?");
            if(queryIndex === -1){
                this.query = null; 
            }else{
                this.query = url.substring(queryIndex + 1).trim();
                if(this.query === ""){
                    this.query = null;
                }
                url = url.substring(0, queryIndex);
            }

            let slashIndex = url.indexOf("/");
            if(slashIndex === -1){
                this.path = null; 
                this.relativePath = true;
                this.isFile = true;
            }else{
                while(slashIndex > 0){
                    if(url[slashIndex - 1] === "."){
                        slashIndex--;
                    }else{
                        break;
                    }
                }
                let path = url.substring(slashIndex).split('/');

                this.relativePath = path.length > 0 && path[0].length !== 0;
                this.isFile = path.length > 0 && path[path.length - 1].length !== 0;

                for(let i = 0; i < path.length; i++){
                    let part = path[i].trim();
                    if(part === "" || path[i] === "."){
                        path.splice(i, 1);
                        i--;
                    }else if(i > 0 && path[i] === ".." && path[i - 1] !== ".."){
                        path.splice(i - 1, 2);
                        i -= 2;
                    }
                }

                if(path.length === 0){
                    this.path = null;
                }else{
                    this.path = path;
                }

                url = url.substring(0, slashIndex);
            }

            if(url !== ""){
                let colonIndex = url.indexOf(":");
                if(colonIndex === -1){
                    this.host = url;
                    this.port = null;
                }else{
                    this.host = url.substring(0, colonIndex).trim();
                    if(this.host === ""){
                        this.host = null;
                    }
                    let port = parseInt(url.substring(colonIndex + 1));
                    if(!isNaN(port)){
                        this.port = port;
                    }else{
                        this.port = null;
                    }
                }
            }else{
                this.host = null;
                this.port = null;
            }

            if(!this.protocol && !this.path && this.host){
                this.path = [this.host];
                this.host = null;
            }

            this.isAbsolute = this.host !== null;
        }

        public makeAbsolute(baseUri?:Uri){
            if(this.isAbsolute){
                return this;
            }
            return Uri.fromRelative(this.completePath, baseUri);
        }

        public getRoot(){
            return (this.protocol ? this.protocol + "://" : "") +
            (this.host ? this.host + (this.port !== null ? ":" + this.port : "") : "");
        }

        public getRelativePath(){
            let path = this.host ? "/" : "./";

            if(this.path){
                for(let i = 0; i < this.path.length; i++){
                    path += i === 0 ? this.path[i] : "/" + this.path[i];
                }
            }

            return path;
        }

        public getFullPath(){
            return this.getRoot() + this.getRelativePath();
        }

        public withRelative(relativeUri:Uri){
            let newUrl = this.getRoot() + "/";

            let path:string[];

            if(relativeUri.isAbsolute || relativeUri.path && !relativeUri.relativePath){
                path = relativeUri.path ?? [];
            }else{
                path = this.path ?? [];

                if(path.length && this.isFile){
                    path.pop();
                }

                if(relativeUri.path){
                    for(let i = 0; i < relativeUri.path.length; i++){
                        if(relativeUri.path[i] === ".."){
                            if(path.length > 0){
                                path.pop();
                            }else{
                                path.push("..");
                            }
                        }else{
                            path.push(relativeUri.path[i]);
                        }
                    }
                }
            }

            for(let i = 0; i < path.length; i++){
                newUrl += i === 0 ? path[i] : "/" + path[i];
            }

            if(relativeUri.query){
                newUrl += "?" + relativeUri.query;
            }
            if(relativeUri.hash){
                newUrl += "#" + relativeUri.hash;
            }
            return new Uri(newUrl);
        }

        public addQuery(key:string, value:string){
            return this.addQueries([key], [value]);
        }

        public addQueries(keys:string[], values:string[]){
            if(keys.length === values.length && keys.length){
                let query = this.query ? "?" + this.query : "";
                
                for(let i = 0; i < keys.length; i++){
                    query += (query ? "&" : "?") + encodeURIComponent(keys[i]) + "=" + encodeURIComponent(values[i]);
                }

                return new Uri(this.getFullPath() + query);
            }
            return this;
        }

        public isSameRoot(anotherUri:Uri){
            return this.isAbsolute && anotherUri.isAbsolute &&
                this.protocol === anotherUri.protocol &&
                this.host === anotherUri.host &&
                this.port === anotherUri.port
        }

        public toString(){
            return this.completePath;
        }
    }
}