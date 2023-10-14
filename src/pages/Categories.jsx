import { CoorTransition } from "../components/CoorTransition";
import React, { useState,useEffect } from "react";
import '../styles/categories.css';
import { routeTransitionEase } from "../helper/transitiontypes";
import { GENRE,genreToLabel } from "../helper/enum";
import { useLoader } from "../components/LoaderContext";
import { stringInterPolation } from "../helper/functions";

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

async function makeRequest(categorie,page) {
  stringInterPolation(categorie,GENRE[categorie],page)
  const genreId = GENRE[categorie];
  const apiKey = '55948168d0fc4adaaa54ad122d8d368a';
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTk0ODE2OGQwZmM0YWRhYWE1NGFkMTIyZDhkMzY4YSIsInN1YiI6IjY1MjdiNzljODEzODMxMDBjNDhhMmQ4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpXnKgQM6TMS9lewqhi-56rX2PwAYM_6ASAsWgUK4g4'
  //const apiURL = 'https://api.themoviedb.org/3/search/movie?query=' + searchString + '&api_key=' + apiKey;
  
  //const apiUrlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page={page}`
  //const response = await fetch(apiUrlGenre);
  //const movieData = await response.json();
  //console.log(movieData)
  //const movies = movieData.results;
  //const movieTitle = movies[0].title;
  //const resultImage = 'https://image.tmdb.org/t/p/original' + movies[0].poster_path;
  //setResult(movieTitle);
  //setImageURL(resultImage);
  //console.log(resultImage);
 
  

  return Array(100).fill(null);
}



const MovieCard = ({movie}) =>{

  const handleOnClick = e =>{

  }

  return(
      <div className="movie-card">
          <div className="movie-poster" onClick={handleOnClick}> 
          </div>
          <div className="movie-info">
              <h6 >A MOVIE TITLE</h6>
           </div>
      </div>
  );
}



const GenreMenu = ({currentCategorie,setCurrentCategorie}) =>{
 
  const handleSwitchCategorie = (event,cat) =>{
    const newCat = currentCategorie === cat ? "" : cat
    setCurrentCategorie(newCat);
  }

  return(
    <div className="container-genre-menu">
      {Object.keys(GENRE).map( name => 
      <h3 className= {(currentCategorie === name) ? "box" : ""} onClick={(e) => handleSwitchCategorie(e,name)} key={GENRE[name]} value={GENRE[name]}>
        {genreToLabel(name)}
      </h3>)}
    </div>
  )
}

const MoviesByCategorie = ({currentCategorie}) =>{
  const {startLoader, stopLoader} = useLoader();
  const [currentPage,setCurrentPage] = useState(1);
  const [movies,setMovies] = useState([]);


  const handleScroll = e =>{
    stringInterPolation(e.target.scrollTop,e.target.scrollHeight,e.target.clientHeight);
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
        console.log("fetch new")  
        setCurrentPage(currentPage+1);
      /*if (!isLoading) {
            nextPage();
        }*/
    }
    
}


  useEffect(() => {
    const getMovies = async event =>{
    startLoader();
    makeRequest(currentCategorie,currentPage)
    .then( filteredMovies => {
      if(filteredMovies){
        setMovies(filteredMovies);
      }
      stopLoader();
    })
    .catch(() =>{
        stopLoader();
    })
    }
    getMovies()
  },[currentCategorie,currentPage])

  return (
    <section className="section-movies" onScroll={handleScroll}>
      {movies.map(movie => <MovieCard key={Math.random()} movie={movie}/>)}
    </section>
  );
}

const Categories = () => {
  const [currentCategorie,setCurrentCategorie] = useState("");
  
  const body = () =>{
    return(
      <div className="container-body-categories">
        <GenreMenu currentCategorie={currentCategorie} setCurrentCategorie={setCurrentCategorie}/>
        <MoviesByCategorie currentCategorie={currentCategorie}/>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="categories trans" transition={routeTransitionEase}/>
  );

};
  
export default Categories;
