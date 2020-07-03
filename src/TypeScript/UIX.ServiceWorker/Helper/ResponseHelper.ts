namespace UIX.ServiceWorker.Helper.ResponseHelper{
    export async function equals(a:Response, b:Response){
        if(a === b){
            return true;
        }
        if(a.url === b.url && a.status === b.status && a.type === b.type && a.bodyUsed === b.bodyUsed){
            let bBlobPromise = b.blob();
            let blobA = await a.blob();
            let blobB = await bBlobPromise;
            if(blobA.size === blobB.size && blobA.type === blobB.type){
                let bArrayBufferPromise = blobB.arrayBuffer();
                let arrayBufferA = await blobA.arrayBuffer();
                let arrayBufferB = await bArrayBufferPromise;

                let arrayA = new Uint32Array(arrayBufferA.slice(arrayBufferA.byteLength % 4));
                let arrayB = new Uint32Array(arrayBufferB.slice(arrayBufferA.byteLength % 4));

                for(let i = 0; i !== arrayA.length; ++i){
                    if(arrayA[i] !== arrayB[i]){
                        return false;
                    }
                }

                if(arrayBufferA.byteLength % 4 !== 0){
                    let byteArrayA = new Uint8Array(arrayBufferA.slice(0, arrayBufferA.byteLength % 4));
                    let byteArrayB = new Uint8Array(arrayBufferB.slice(0, arrayBufferA.byteLength % 4));

                    for(let i = 0; i !== byteArrayA.length; ++i){
                        if(byteArrayA[i] !== byteArrayB[i]){
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }
}