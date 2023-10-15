import { GENRE } from "./enum";
import { stringInterPolation } from "./functions";
const apiKey = '55948168d0fc4adaaa54ad122d8d368a';

export async function fetchByCategorie(categorie,page) {
    stringInterPolation("page number is: ",page,"categorie is: ",categorie)
    if(categorie === ""){return null;}
    else if(page > 2){return null}
    const genreId = GENRE[categorie];
    const apiUrlGenre = urlWithCategorieAndPage(genreId,page);
    const response = await fetch(apiUrlGenre);
    const movieData = await response.json();
    return movieData;
  }

export async function fetchById(movieID){
    const url = urlWithImdbID(movieID);
    const response = await fetch(url);
    const movieData = await response.json();
    console.log(movieData)
    return movieData;
}

function urlWithCategorieAndPage(genreId,page){
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
}

function urlWithImdbID(movieID){
    return `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`
}