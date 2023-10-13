export function stringInterPolation(...args){
    let str = "";
    args.forEach( (arg) =>
        str += `${arg} `
    );
    console.log(str)
}