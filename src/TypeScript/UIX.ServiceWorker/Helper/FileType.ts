/// <reference path="../../UIX/Libraries/Uri/Uri.ts" />

namespace UIX.ServiceWorker.Helper.FileType{
    export enum FileType{
        UIXFramework,
        UIXWebpage,
        Manifest,
        Font,
        Favicon,
        StartPage,
        Image,
        Document,
        Archive,
        Unknown
    }

    export function isPartOfUIX(fileType:FileType){
        switch(fileType){
            case FileType.Manifest:
            case FileType.UIXWebpage:
            case FileType.UIXFramework:
            case FileType.Font:
            case FileType.Favicon:
            case FileType.StartPage:
                return true;
        }
        return false;
    }

    export function get(uri:Libraries.Uri){

        if(uri.path && uri.path.length){
            let fileName = uri.path[uri.path.length - 1].toLowerCase();

            let fileTypeIndex = fileName.lastIndexOf(".");
            let fileType = fileTypeIndex === -1 ? "" : fileName.substring(fileTypeIndex + 1);
            
            switch(fileType){
                case "json":
                    if(fileName === "manifest.json"){
                        return FileType.Manifest;
                    }
                    if(fileName.endsWith(".uix.json")){
                        return FileType.UIXWebpage;
                    }
                    break;
                case "js":
                case "css":
                    if(fileName.startsWith("uix.")){
                        return FileType.UIXFramework;
                    }
                    break;
                case "ico":
                    if(fileName === "favicon.ico"){
                        return FileType.Favicon;
                    }
                    return FileType.Image;
                case "jpg":
                case "jpeg":
                case "gif":
                case "png":
                case "bmp":
                case "tiff":
                case "tif":
                case "svg":
                case "webp":
                    return FileType.Image;
                case "pdf":
                case "psd":
                case "txt":
                case "doc":
                case "docx":
                case "xls":
                case "xlsx":
                case "ppt":
                case "pptx":
                case "xml":
                case "html":
                    return FileType.Document;
                case "zip":
                case "rar":
                case "7z":
                case "tar":
                    return FileType.Archive;
                case "otf":
                case "ttf":
                case "woff":
                case "woff2":
                case "eot":
                    return FileType.Font;
            }

        }else{
            if(Libraries.Uri.current.isSameRoot(uri) && (uri.path === null || uri.path.length === 0)){
                return FileType.StartPage;
            }
        }

        return FileType.Unknown;
    }
}