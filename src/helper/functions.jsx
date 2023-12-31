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

export const currentDatePlus = (days)=>{
    var date = new Date();
    date.setDate(date.getDate() + days);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    const newDate = mm + '/' + dd + '/' + yyyy;
    return newDate;
}

export function setNewDate(days){
    var date = new Date();
    date.setDate(date.getDate() + days);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    const newDate = yyyy + '-' + mm + '-' + dd;
    return newDate;
}

export function getMoviePrice(movie){
    let oneMonthAgo = setNewDate(-30);
    let halfYearAgo = setNewDate(-183);
    let oneYearAgo = setNewDate(-365);
    let price = 2;
    if (oneMonthAgo < movie.release_date ){
        price = 10;
    }else if (halfYearAgo < movie.release_date ){
        price = 6;
    }else if (oneYearAgo < movie.release_date ){
        price = 4;
    }else{
        price = 2;
    }
    return price;
}