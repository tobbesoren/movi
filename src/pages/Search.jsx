import '../styles/search.css';
import { CoorTransition } from "../components/CoorTransition";
import { routeTransitionEase} from "../helper/transitiontypes";
import { useContext, useEffect, useState } from "react";
import fallback from "../images/Yoyo_Cinema_Logo.png";
import { stringInterPolation } from '../helper/functions';
import { AppContext } from '../components/AppContext';
import MovieCard from "../components/MovieCard";


let lastFetch ={
    currentPage:1,
    totalPages:1,
    isLoading:false,
    searchString:''
}


const Search = () => {
    const [searchRequest,setSearchRequest] = useContext(AppContext).api;
    const [resultList, setResultList] = useState([]);
    const fetchData = async () => {
        
            
       // Token not used at the moment. Needed for v4 of API, I think. (Now we are using v3.)
        // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTk0ODE2OGQwZmM0YWRhYWE1NGFkMTIyZDhkMzY4YSIsInN1YiI6IjY1MjdiNzljODEzODMxMDBjNDhhMmQ4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpXnKgQM6TMS9lewqhi-56rX2PwAYM_6ASAsWgUK4g4'

        const apiKey = '55948168d0fc4adaaa54ad122d8d368a';
        const apiURL = 'https://api.themoviedb.org/3/search/movie?query=' + lastFetch.searchString + '&api_key=' + apiKey + '&page=' + lastFetch.currentPage;

        const response = await fetch(apiURL);
        const movieData = await response.json();
        console.log(movieData);

        const movies = movieData.results;

        lastFetch.totalPages = movieData.total_pages;

        const movieList = createMovieList(movies);

        return movieList
    }


    const loadPage = async () => {
       
        if (lastFetch.currentPage <= lastFetch.totalPages) {
            lastFetch.isLoading = true;
            const movieList = await fetchData(lastFetch.searchString);
            setResultList(resultList => [...resultList, movieList]);
            lastFetch.isLoading = false;
        }
    }


    const nextPage = async () => {
        lastFetch.currentPage ++;
        loadPage();
    }


    const clearPage = () => {
        setResultList([]);
        lastFetch.searchString = '';
        lastFetch.totalPages = 1;
        lastFetch.currentPage = 1;
    }
    

    const createMovieList = (movies) => {
        let movieList = [];
        const path = "/movie/";
        movies.forEach(movie => {
                const newMovie = MovieCard({movie,path});
                movieList.push(newMovie);
            }
        )
        return movieList;
    }


    // const Movie = (movie) => {
    //     const movieTitle = movie.title;
    //     const movieImgURL = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
    //     const releaseDate = movie.release_date;
    //     const key = movie.id;
    //     return (
    //         <div key={key} className="preview">
    //             <img className="previewImage" src={movieImgURL} onError={(e) => (e.currentTarget.src = fallback)} />
    //             <h3 className="previewTitle">{movieTitle}</h3>
    //             <p className="previewReleaseDate">{releaseDate}</p>
    //         </div>
    //     )
    // }

    const searchDataBase = () => {
        if(searchRequest != '') {
            clearPage();
            lastFetch.searchString = createSearchString();
            loadPage();
        }
    }


    const createSearchString = () => {
        return searchRequest?.split(' ').join('+');
    }

    const handleScroll = e =>{
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            if (!lastFetch.isLoading) {
                nextPage();
            }
        }
        
    }

  const body = () =>{
    useEffect(() => {
       searchDataBase(); 
    },[searchRequest])
    
    return(
        <div className="container-body-search" onScroll={handleScroll}>
            <div className="content">
                {resultList}
            </div>
        </div>
    )
  }

  return (

    <CoorTransition page={body} name="search trans" transition={routeTransitionEase}/>
  );

};
  
export default Search;
//sd