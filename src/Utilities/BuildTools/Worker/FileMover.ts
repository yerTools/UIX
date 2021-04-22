namespace BuildTools.Worker{
    export class FileMover{
        public runing = true;
        private stopCount = 0;
        private sourceDirectory:string;
        private targetDirectory:string;
        private searchPattern:RegExp;

        constructor(sourceDirectory:string, targetDirectory:string, searchPattern:RegExp){
            fs.mkdirSync(sourceDirectory, {recursive:true});
            fs.mkdirSync(targetDirectory, {recursive:true});

            this.sourceDirectory = fs.realpathSync(sourceDirectory, {encoding: "utf8"}) + "/";
            this.targetDirectory = fs.realpathSync(targetDirectory, {encoding: "utf8"}) + "/";

            this.searchPattern = searchPattern;

            this.loop();
        }

        private moveFilesRecursive(directory:string){
            if(directory == this.targetDirectory) return;
            const children = fs.readdirSync(directory, {encoding: "utf8", withFileTypes:true});

            for(let i = 0; i < children.length; i++){
                if(children[i].isFile()){
                    if(this.searchPattern.test(children[i].name)){
                        
                        const targetPath = this.targetDirectory + children[i].name;
                        if(fs.existsSync(targetPath)){
                            fs.rmSync(targetPath, {force: true});
                        }

                        fs.renameSync(directory + children[i].name, targetPath);
                    }
                }else if(children[i].isDirectory()){
                    this.moveFilesRecursive(fs.realpathSync(directory + children[i].name) + "/");
                }
            }
        }

        private loop(){
            this.moveFilesRecursive(this.sourceDirectory);

            if(this.stopCount){
                this.stopCount++;
            }
            if(this.stopCount <= 2){
                setTimeout(() => this.loop(), 500);
            }else{
                this.runing = false;
            }
        }

        public stop(){
            this.stopCount++;
        }

    }
}