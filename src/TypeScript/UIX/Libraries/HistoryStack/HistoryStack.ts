namespace UIX.Libraries.HistoryStack{
    export class HistoryStack{
        public static readonly defaultMaxEntries = 100;
        public static readonly defaultMinimumPushDeltaTime = 250;

        private history:string[] = [];
        private nextIndex = 0;
        private lastPush = 0;

        public readonly maxEntries:number;
        public readonly minimumPushDeltaTime:number;
        
        public constructor(maxEntries = HistoryStack.defaultMaxEntries, minimumPushDeltaTime = HistoryStack.defaultMinimumPushDeltaTime){
            this.maxEntries = maxEntries;
            this.minimumPushDeltaTime = minimumPushDeltaTime;
        }


        public current(){
            if(this.nextIndex){
                return this.history[this.nextIndex - 1];
            }
            return null;
        }

        public clear(){
            if(this.history.length){
                this.history.splice(0, this.history.length);
            }
            this.nextIndex = 0;
            this.lastPush = 0;
        }

        public push(state:string){
            if(this.current() !== state){
                let now = new Date().getTime();

                if(this.nextIndex === this.history.length){
                    if(!this.nextIndex || now - this.lastPush >= this.minimumPushDeltaTime){
                        if(this.nextIndex === this.maxEntries){
                            this.history.shift();
                        }else{
                            this.nextIndex++;
                        }
                        this.history.push(state);
                        this.lastPush = now;
                    }else{
                        this.history[this.nextIndex - 1] = state;
                    }
                }else{
                    this.history[this.nextIndex++] = state;
                    if(this.nextIndex !== this.history.length){
                        this.history.splice(this.nextIndex, this.history.length - this.nextIndex);
                    }
                    this.lastPush = now;
                }

                return true;
            }
            return false;
        }

        public undo(){
            if(this.nextIndex){
                this.lastPush = 0;
                this.nextIndex--;
                return this.current();
            }
            return null;
        }

        public redo(){
            if(this.nextIndex !== this.history.length){
                this.lastPush = 0;
                this.nextIndex++;
                return this.current();
            }
            return null;
        }
    }
}