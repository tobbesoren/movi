/*
clear(): This technique is used to delete all instances of localStorage.
key(): When you supply a number, it aids in the retrieval of a localStorage key.

*/

import { currentDatePlus, stringInterPolation } from "./functions";
import { MOVIE_STATUS } from "./enum";


export async function fetchMovieFromLocalStorageById(movieId){
    return new Promise((resolve,reject) =>{
        const movie = JSON.parse(localStorage.getItem(movieId));
        if(movie){resolve(movie);}
        reject("Storage holds no information about this movie. But if calling function is [removeMovieFromLocalStorageById] thats what we want.");
    });
}

export async function storeMovieToLocalStorageById(movieId){
    return new Promise((resolve,reject) =>{
        const movieToStore = {
            id:movieId,
            price:50.0,
            date:currentDatePlus(0),
            status:MOVIE_STATUS.IN_CART
        }
        localStorage.setItem(movieId,JSON.stringify(movieToStore));
        resolve(fetchMovieFromLocalStorageById(movieId));
    });
}

export async function removeMovieFromLocalStorageById(movieId){
    return new Promise((resolve,reject) =>{
        localStorage.removeItem(movieId);
        resolve(fetchMovieFromLocalStorageById(movieId));
    });
}
