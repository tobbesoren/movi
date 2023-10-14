import { CoorTransition } from "../components/CoorTransition";
import React, { useState,useEffect, createRef } from "react";
import '../styles/categories.css';
import { routeTransitionEase } from "../helper/transitiontypes";
import { GENRE,genreToLabel } from "../helper/enum";
import { useLoader } from "../components/LoaderContext";
import { stringInterPolation } from "../helper/functions";
import AsyncImage from "../components/AsyncImage";


async function makeRequest(categorie,page) {
  console.log(page);
  if(categorie === ""){return null;}
  else if(page > 2){return null}
  const genreId = GENRE[categorie];
  const apiKey = '55948168d0fc4adaaa54ad122d8d368a';
  const apiUrlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  const response = await fetch(apiUrlGenre);
  const movieData = await response.json();
  return movieData;
}

const MovieCard = ({movie}) =>{

  const handleOnClick = e =>{

  }

  const movieTitle = movie.title;
  const movieImgURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const releaseDate = movie.release_date;
  const key = movie.id;

  return (
      <div key={key} className="container-movie">
          <AsyncImage className="movie-poster" src={movieImgURL} onClick={handleOnClick} />
      </div>
  )
}



const GenreMenu = ({setFilterRequest}) =>{

  const [currentCategorie,setCurrentCategorie] = useState("");

  const handleSwitchCategorie = (event,cat) =>{
    const newCat = currentCategorie === cat ? "" : cat
    setCurrentCategorie(newCat);
    setFilterRequest({
      categorie: newCat,
      page: 1,
      lastScrollHeight:0,
    })
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

const MoviesByCategorie = ({filterRequest}) =>{

  const {startLoader, stopLoader} = useLoader();
  const [movies,setMovies] = useState([]);
 
  useEffect(() => {
    const getMovies = async event =>{
    startLoader();
    makeRequest(filterRequest.categorie,filterRequest.page)
    .then( filteredMovies => {
      if(filteredMovies && filteredMovies.results){
        setMovies(movies.concat(filteredMovies.results));
      }
      stopLoader();
    })
    .catch(() =>{
      stopLoader();
     })
    }
    getMovies()
  },[filterRequest])

  return (
    <div className="container-movies">
        {movies.map(movie => <MovieCard key={Math.random()} movie={movie}/>)}
    </div>
  );
}

const Categories = () => {
  const initialRequest = {
    categorie: "",
    page: 1,
    lastScrollHeight:0,
  }
  let gridLock = false;
  const ref = createRef(null);
  const [filterRequest,setFilterRequest] = useState(initialRequest);
 
  const handleScroll = async () =>{
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const endOfPage = scrollTop + clientHeight >= scrollHeight;

    if(endOfPage && !gridLock){
      gridLock = true;
      stringInterPolation(scrollTop, scrollHeight, clientHeight)
      const lastScrollHeight = scrollHeight;
      setFilterRequest({
        categorie:filterRequest.categorie,
        page:filterRequest.page+1,
        lastScrollHeight:lastScrollHeight,
      })
    }
  }

  useEffect(() =>{
    if(filterRequest.lastScrollHeight != ref.current.scrollHeight && filterRequest.lastScrollHeight != 0){
      setTimeout(() =>{
        ref?.current?.scroll({
          top:filterRequest.lastScrollHeight,
          behavior:'smooth'
          })
        gridLock = false;
      },500)
      
    }
  },[filterRequest])

  const body = () =>{
    return(
      <div id="scrollable" ref={ref} className="container-body-categories" onScroll={handleScroll}>
        <GenreMenu setFilterRequest={setFilterRequest}/>
        <MoviesByCategorie filterRequest={filterRequest} setFilterRequest={setFilterRequest}/>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="categories trans" transition={routeTransitionEase}/>
  );

};
  
export default Categories;
