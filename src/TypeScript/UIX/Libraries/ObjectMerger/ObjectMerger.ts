namespace UIX.Libraries.ObjectMerger{
    export function mergeSimilarObjects<T extends Object>(obj1:T, obj2:T, mergeIntoFirstObject = true){
        return <T>mergeObjects(obj1, obj2, mergeIntoFirstObject);
    }

    export function mergeObjects(obj1:Object, obj2:Object, mergeIntoFirstObject = true){
        let mergeInto:Object;
        if(!mergeIntoFirstObject){
            mergeInto = mergeObjects({}, obj1, true);
        }else{
            mergeInto = obj1;
        }

        mergeRecursive(obj1, obj2);

        return mergeInto;
    }

    function mergeArrayRecursive(obj1:any[], obj2:any[]){
        for(let i = 0; i < obj2.length; ++i){
            if(typeof obj2[i] === "object" && obj2[i]){
                if(Array.isArray(obj2[i])){
                    mergeArrayRecursive(obj1[i] = new Array(obj2[i].length), obj2[i]);
                }else{
                    mergeRecursive(obj1[i] = {}, obj2[i]);
                }
            }else{
                obj1[i] = obj2[i];
            }
        }
    }

    function mergeRecursive(obj1:any, obj2:any){
        if(obj1 && obj2){
            for(let propertyName in obj2){
                if(typeof obj2[propertyName] === "object" && obj2[propertyName]){
                    if(Array.isArray(obj2[propertyName])){
                        mergeArrayRecursive(obj1[propertyName] = new Array(obj2[propertyName].length), obj2[propertyName]);
                    }else{
                        mergeRecursive(obj1[propertyName] = {}, obj2[propertyName]);
                    }
                }else{
                    obj1[propertyName] = obj2[propertyName];
                }
            }
        }
    }
}