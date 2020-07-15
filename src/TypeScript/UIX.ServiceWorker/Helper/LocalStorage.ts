namespace UIX.ServiceWorker.Helper{

    async function openResponse(response:Response|undefined){
        if(response){
            return await response.text();
        } 
        return "";
    }

    export class LocalStorage{
        public readonly dataCacheName:string;

        public constructor(dataCacheName:string){
            this.dataCacheName = dataCacheName;
        }

        public async get(key:string){
            try{
                let cache = await caches.open(this.dataCacheName);
                return await openResponse(await cache.match(key));
            }catch(error){
                return "";
            }
        }
    
        public async has(key:string){
            try{
                let cache = await caches.open(this.dataCacheName);
                return (await cache.match(key)) !== undefined;
            }catch(error){
                return false;
            }
        }
    
        public async remove(key:string){
            try{
                let cache = await caches.open(this.dataCacheName);
                return await cache.delete(key);
            }catch(error){
                return false;
            }
        }
    
        public async clear(){
            try{
                return await caches.delete(this.dataCacheName);
            }catch(error){
                return false;
            }
        }
    
        public async set(key:string, data:string){
            try{
                let cache = await caches.open(this.dataCacheName);
                await cache.put(key, new Response(data));
                return true;
            }catch(error){
                return false;
            }
        }
    }
}