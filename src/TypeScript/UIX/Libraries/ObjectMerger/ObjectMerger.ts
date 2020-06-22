/* Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools */

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

/*
 * Copyright (c) 2020 Felix Mayer (FelixM@yer.tools), yerTools
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */