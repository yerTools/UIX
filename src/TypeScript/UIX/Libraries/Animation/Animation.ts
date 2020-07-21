namespace UIX.Libraries.Animation{
    //TODO: Fix this class! It's currently just a "placeholder".

    export function fadeIn(element:HTMLElement, animationTime = 400, callback?:TimerHandler){
        element.style.animation = "animation-fade-in-keyframes " + animationTime + "ms ease-in-out forwards";
        if(callback){
            setTimeout(callback, animationTime);
        }
    }

    export function fadeOut(element:HTMLElement, animationTime = 400, callback?:TimerHandler){
        element.style.animation = "animation-fade-out-keyframes " + animationTime + "ms ease-in-out forwards";
        if(callback){
            setTimeout(callback, animationTime);
        }
    }
}