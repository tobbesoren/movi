import { GENRE } from "./enum";
import { stringInterPolation } from "./functions";
const apiKey = '55948168d0fc4adaaa54ad122d8d368a';
const MAX_PAGES = 5;

export let lastRequest = { 
    genreId: null,
    page:0,
    totalPages:0,
    totalMoviesAvailable:0,
    maxPagesByDeveloper:MAX_PAGES
};


export async function fetchByCategorie(categorie,page) {
    if(!legalSearch(categorie,page)){return null}
    const genreId = GENRE[categorie];
    const apiUrlGenre = urlWithCategorieAndPage(genreId,page);
    const response = await fetch(apiUrlGenre);
    const movieData = await response.json();
    setLastRequest(genreId,movieData.page,movieData.total_pages,movieData.total_results);
    return movieData.results;
}

export async function fetchByPopularity(page) {
    // if(!legalSearch(page)){return null}
    const apiUrlPopular = urlMostPopularWithPage(page);
    const response = await fetch(apiUrlPopular);
    const movieData = await response.json();
    // setLastRequest(genreId,movieData.page,movieData.total_pages,movieData.total_results);
    return movieData.results;
}

export async function fetchById(movieID){
    const url = urlWithImdbID(movieID);
    const response = await fetch(url);
    const movieData = await response.json();
    
    return movieData;
}


function setLastRequest(genreId,currentPage,totalPages,totalResults){
    lastRequest.genreId = genreId;
    lastRequest.page = currentPage;
    lastRequest.totalPages = totalPages;
    lastRequest.totalMoviesAvailable = totalResults;
}

function legalSearch(categorie,page){
    if(categorie === ""){return false;}
    if(GENRE[categorie] === lastRequest.genreId){
        return page <= lastRequest.totalMoviesAvailable && page <= MAX_PAGES;
    }
    return page === 1
}

function urlWithCategorieAndPage(genreId,page){
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
}

function urlMostPopularWithPage(page){
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`
}

function urlWithImdbID(movieID){
    return `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`
}

function urlVideoWithImdbID(movieID){
    return `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}&language=en-US`
}

//https://www.youtube.com/watch?v=h6hZkvrFIj0