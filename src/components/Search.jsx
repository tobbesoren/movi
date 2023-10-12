import { useState } from "react";
import "./Search.css"


const Search = () => {

    const [searchFieldText, setSearchFieldText] = useState('');
    const [result, setResult] = useState('');
    const [imgURL, setImageURL] = useState('');
    

    const fetchData = async (searchString) => {
            
        const apiKey = '55948168d0fc4adaaa54ad122d8d368a';
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTk0ODE2OGQwZmM0YWRhYWE1NGFkMTIyZDhkMzY4YSIsInN1YiI6IjY1MjdiNzljODEzODMxMDBjNDhhMmQ4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpXnKgQM6TMS9lewqhi-56rX2PwAYM_6ASAsWgUK4g4'
        const apiURL = 'https://api.themoviedb.org/3/search/movie?query=' + searchString + '&api_key=' + apiKey;
        
        const response = await fetch(apiURL);
        const movieData = await response.json();
        const movies = movieData.results;
        const movieTitle = movies[0].title;
        const resultImage = 'https://image.tmdb.org/t/p/original' + movies[0].poster_path;
        setResult(movieTitle);
        setImageURL(resultImage);
        console.log(resultImage);

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
        setResult('');
        setImageURL('');
        console.log(searchFieldText)
        const searchString = createSearchString();
        fetchData(searchString);
    }

    const createSearchString = () => {
        return searchFieldText.split(' ').join('+');
    }


    return (
        <div>
            <input onKeyDown={handleEnter} type="text" value={searchFieldText} onChange={handleInput}></input>
            <button onClick={searchDataBase}>Search</button>
            <h2>{result}</h2>
            <img className="moviePoster" src={imgURL} alt="" />
            
        </div>
    )
}

export default Search