import { useState } from "react";
import "./Search.css"
import fallback from "../images/Yoyo_Cinema_Logo.png";


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

    window.addEventListener('scroll', () => {
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            if (!isLoading) {
                nextPage();
            }
        }
    })


    return (
        <div>
            <input onKeyDown={handleEnter} type="text" value={searchFieldText} onChange={handleInput}></input>
            <button onClick={searchDataBase}>Search</button>
            <div className="content">
                {resultList}
            </div>
            
        </div>
    )
}

export default Search