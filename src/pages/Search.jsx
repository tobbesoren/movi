import '../styles/search.css';
import { CoorTransition } from "../components/CoorTransition";
import { routeTransitionEase,routeTransitionSpringFromRight} from "../helper/transitiontypes";
import { useState } from "react";
import fallback from "../images/Yoyo_Cinema_Logo.png";
import { stringInterPolation } from '../helper/functions';

const Search = () => {
    const [searchFieldText, setSearchFieldText] = useState('');
    const [resultList, setResultList] = useState([]);

    let currentPage = 1;
    let totalPages = 1;
    let isLoading = false;
    let searchString = '';
    

    const fetchData = async () => {
        
            
       // Token not used at the moment. Needed for v4 of API, I think. (Now we are using v3.)
        // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTk0ODE2OGQwZmM0YWRhYWE1NGFkMTIyZDhkMzY4YSIsInN1YiI6IjY1MjdiNzljODEzODMxMDBjNDhhMmQ4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpXnKgQM6TMS9lewqhi-56rX2PwAYM_6ASAsWgUK4g4'

        const apiKey = '55948168d0fc4adaaa54ad122d8d368a';
        const apiURL = 'https://api.themoviedb.org/3/search/movie?query=' + searchString + '&api_key=' + apiKey + '&page=' + currentPage;

        const response = await fetch(apiURL);
        const movieData = await response.json();
        console.log(movieData);

        const movies = movieData.results;

        totalPages = movieData.total_pages;

        const movieList = createMovieList(movies);

        return movieList
    }


    const loadPage = async () => {
        console.log('Hi!')
        if (currentPage <= totalPages) {
            isLoading = true;
            const movieList = await fetchData(searchString);
            setResultList(resultList => [...resultList, movieList]);

            isLoading = false;
        }
    }


    const nextPage = async () => {
        currentPage ++;
        loadPage();
    }


    const clearPage = () => {
        setResultList([]);
        searchString = '';
        totalPages = 1;
        currentPage = 1;
    }
    

    const createMovieList = (movies) => {
        
        let movieList = [];

        movies.forEach(movie => {
                const newMovie = Movie(movie);
                movieList.push(newMovie);
            }
        )
        return movieList;
    }


    const Movie = (movie) => {

        const movieTitle = movie.title;
        const movieImgURL = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
        const releaseDate = movie.release_date;
        const key = movie.id;

        return (
            <div key={key} className="preview">
                <img className="previewImage" src={movieImgURL} onError={(e) => (e.currentTarget.src = fallback)} />
                <h3 className="previewTitle">{movieTitle}</h3>
                <p className="previewReleaseDate">{releaseDate}</p>
            </div>
        )
    }


    const handleInput = (input) => {
        setSearchFieldText(input.target.value);
      };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            searchDataBase();
        }
    }


    const searchDataBase = () => {
        if(searchFieldText != '') {
            clearPage();
            searchString = createSearchString();
            setSearchFieldText('');
            loadPage();
        }
    }


    const createSearchString = () => {
        return searchFieldText.split(' ').join('+');
    }

    const handleScroll = e =>{
        //stringInterPolation(e.target.scrollTop,e.target.scrollHeight,e.target.clientHeight);
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            if (!isLoading) {
                //nextPage();
            }
        }
        
    }

  const body = () =>{
    return(
    <div className="container-body-search" onScroll={handleScroll}>
        <div className="container-search-field">
            <input onKeyDown={handleEnter} type="text" value={searchFieldText} onChange={handleInput}></input>
            <button onClick={searchDataBase}>Search</button>
        </div>
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