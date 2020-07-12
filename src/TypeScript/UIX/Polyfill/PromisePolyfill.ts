const __PROMISE_POLYFILL_THIS__ = this;
namespace UIX.Polyfill{
    declare var window:any;

    (function (global){
        if(typeof global.Promise === "undefined"){
    
            enum PromiseState{
                Pending,
                Fulfilled,
                Rejected
            }
    
            const resolvePromise = function resolvePromise<T>(promise:PromisePolyfill<T>, result:T|PromisePolyfill<T>|void, resolve:(value:T|PromisePolyfill<T>|undefined) => void, reject:(reason:any) => void, resolveResult:boolean){
                if(promise === result){
                    throw new Error("Can't resolve promise with itself.");
                }
                if(result instanceof PromisePolyfill){
                    result.then(resolve, reject);
                    return;
                }else if(result && (typeof result === "object" || typeof result === "function")){
                    try{
                        let then = (<any>result).then;
                        if(typeof then === "function"){
                            then.call(result, resolve, reject);
                            return;
                        }
                    }catch(error){
                        reject(error);
                        return;
                    }
                }
                if(resolveResult){
                    resolve(<any>result);
                }else{
                    reject(result);
                }
            };
    
            class PromisePolyfill<T>{
                public static all<T>(promises?:PromisePolyfill<T>[]){
                    return new PromisePolyfill<T[]>((resolve, reject) => {
                        if(!promises){
                            resolve([]);
                            return;
                        }
    
                        let pendingCount = promises.length;
                        let results:T[] = new Array(pendingCount);
    
                        for(let i = 0; i < promises.length; i++){
                            let index = i;
                            let promise = promises[i];
    
                            if(!(promise instanceof PromisePolyfill)){
                                promise = PromisePolyfill.resolve<T>(promise);
                            }
    
                            promise.then((value) => {
                                results[index] = value;
                                if(--pendingCount === 0){
                                    resolve(results);
                                }
                            }, reject);
                        }
                    });
                }
    
                public static any<T>(promises:PromisePolyfill<T>[]){
                    return new PromisePolyfill<T>((resolve, reject) => {
                        if(!promises || !promises.length){
                            reject("no promises provided");
                            return;
                        }
    
                        let pendingCount = promises.length;
    
                        for(let i = 0; i < promises.length; i++){
                            let promise = promises[i];
    
                            if(!(promise instanceof PromisePolyfill)){
                                promise = PromisePolyfill.resolve<T>(promise);
                            }
    
                            let rejectReasons:any[] = [];
    
                            promise.then(resolve, reason => {
                                rejectReasons.push(reason);
                                if(--pendingCount === 0){
                                    reject(rejectReasons);
                                }
                            });
                        }
                    });
                }
    
                public static race<T>(promises:PromisePolyfill<T>[]){
                    return new PromisePolyfill<T>((resolve, reject) => {
                        if(!promises || !promises.length){
                            return;
                        }
    
                        for(let i = 0; i < promises.length; i++){
                            let promise = promises[i];
    
                            if(!(promise instanceof PromisePolyfill)){
                                promise = PromisePolyfill.resolve<T>(promise);
                            }
    
                            promise.then(resolve, reject);
                        }
                    });
                }
    
                public static resolve<T>(value:T){
                    return new PromisePolyfill<T>((resolve => {
                        resolve(value);
                    }));
                }
    
                public static reject<T>(value:T){
                    return new PromisePolyfill<T>(((_resolve, reject) => {
                        reject(value);
                    }));
                }
    
                public static allSettled<T>(promises?:PromisePolyfill<T>[]){
                    return new PromisePolyfill<{status:string,value?:T,reason?:any}[]>((resolve, reject) => {
                        if(!promises){
                            resolve([]);
                            return;
                        }
    
                        let pendingCount = promises.length;
                        let results:{status:string,value?:T,reason?:any}[] = new Array(pendingCount);
    
                        for(let i = 0; i < promises.length; i++){
                            let index = i;
                            let promise = promises[i];
    
                            if(!(promise instanceof PromisePolyfill)){
                                promise = PromisePolyfill.resolve<T>(promise);
                            }
    
                            promise.then(value => {
                                results[index] = {status: "fulfilled", value: value};
                                if(--pendingCount === 0){
                                    resolve(results);
                                }
                            }, reason => {
                                results[index] = {status: "fulfilled", reason: reason};
                                if(--pendingCount === 0){
                                    resolve(results);
                                }
                            });
                        }
                    });
                }
    
                private state = PromiseState.Pending;
                private result:any;
                private readonly thens:((value:T) => T|PromisePolyfill<T>|void)[] = [];
                private readonly catches:((reason:any) => PromisePolyfill<T>|void)[] = [];
    
                public constructor(executor: (resolve:(value:T|PromisePolyfill<T>|undefined) => void, reject:(reason:any) => void) => void){
                    try{
                        executor(value => {
                            if(this.state === PromiseState.Pending){
                                this.state = PromiseState.Fulfilled;
                                this.result = value;
                                this.resolveIfReady();
                            }
                        }, reason =>{
                            if(this.state === PromiseState.Pending){
                                this.state = PromiseState.Rejected;
                                this.result = reason;
                                this.resolveIfReady();
                            }
                        }); 
                    }catch(error){
                        console.error(error);
                    }          
                }
    
                private resolveIfReady(){
                    if(this.state === PromiseState.Pending){
                        return;
                    }
    
                    setTimeout(() => {
                        if(this.state === PromiseState.Fulfilled){
                            for(let i = 0; i < this.thens.length; i++){
                                try{
                                    this.thens[i].call(this, this.result);
                                }catch(error){
                                    console.error(error);
                                }
                            }
                        }else if(this.state === PromiseState.Rejected){
                            for(let i = 0; i < this.catches.length; i++){
                                try{
                                    this.catches[i].call(this, this.result);
                                }catch(error){
                                    console.error(error);
                                }
                            }
                        }
        
                        this.thens.splice(0, this.thens.length);
                        this.catches.splice(0, this.catches.length);
                    }, 0);
                }
    
                public then(onfulfilled?:((value: T) => T|PromisePolyfill<T>|void), onrejected?:((reason:any) => PromisePolyfill<T>|void)){
                    let newPromise = new PromisePolyfill<T>((resolve, reject) =>{
                        this.thens.push((result) => {
                            try{
                                resolvePromise<T>(newPromise, result, value => {
                                    if(typeof onfulfilled === "function"){
                                        try{
                                            onfulfilled(<T>value);
                                        }catch(error){
                                            reject(error);
                                        }
                                    }
                                    resolve(value);
                                }, value => {
                                    if(typeof onrejected === "function"){
                                        try{
                                            onrejected(<T>value);
                                        }catch(error){
                                            reject(error);
                                        }
                                    }
                                    reject(value);
                                }, true);
                            }catch(error){
                                reject(error);
                            }
                        });
    
                        this.catches.push((result) => {
                            try{
                                resolvePromise<T>(newPromise, result, value => {
                                    if(typeof onfulfilled === "function"){
                                        try{
                                            onfulfilled(<T>value);
                                        }catch(error){
                                            reject(error);
                                        }
                                    }
                                    resolve(value);
                                }, value => {
                                    if(typeof onrejected === "function"){
                                        try{
                                            onrejected(<T>value);
                                        }catch(error){
                                            reject(error);
                                        }
                                    }
                                    reject(value);
                                }, false);
                            }catch(error){
                                reject(error);
                            }
                        });
    
                        this.resolveIfReady();
                    });
                    return newPromise;
                }
    
                public catch(onrejected?:((reason:any) => PromisePolyfill<T>|void)){
                    return this.then(undefined, onrejected);
                }
            }
    
            global.Promise = <any>PromisePolyfill;
        }
    })(typeof window !== "undefined" ? window : __PROMISE_POLYFILL_THIS__);
}