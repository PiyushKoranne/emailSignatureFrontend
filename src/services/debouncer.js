function debouncer(fn, timer=500){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this, args);
        }, timer)
    }
}
