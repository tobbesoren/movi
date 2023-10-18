export function stringInterPolation(...args){
    let str = "";
    args.forEach( (arg) =>
        str += `${arg} `
    );
    console.log(str)
}

export function capitalizeFirstLetter(string) {
    if(!string){return string;}
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const setAsyncTimeoutThenExecute = (cb, timeout = 0) => new Promise(resolve => {
    setTimeout(() => {
        cb();
        resolve();
    }, timeout);
});