import { CoorTransition } from "../components/CoorTransition";
import React, { useState,useEffect, createRef } from "react";
import '../styles/categories.css';
import { routeTransitionEase } from "../helper/transitiontypes";
import { STATUS,GENRE,genreToLabel } from "../helper/enum";
import { useLoader } from "../components/LoaderContext";
import { stringInterPolation,setAsyncTimeout } from "../helper/functions";
import AsyncImage from "../components/AsyncImage";
import { NavLink, Outlet} from "react-router-dom";
import { fetchByCategorie } from "../helper/request";
import { lastRequest } from "../helper/request";

const MovieCard = ({movie}) =>{
  const movieImgURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const nav = `${movie.id}`
  return (
      <div key={movie.id} className="container-movie">
        <NavLink className="movie-nav-link" to={nav} data-page="movie-info" state={{ movieId: movie.id }} style={{ textDecoration: 'none' }}>
          <AsyncImage className="movie-poster" src={movieImgURL}/>
        </NavLink>
      </div>
  )
}

const GenreMenu = ({setFilterRequest}) =>{

  const [currentCategorie,setCurrentCategorie] = useState("");

  const handleSwitchCategorie = (event,cat) =>{
    if(currentCategorie === cat){return}
    setCurrentCategorie(cat);
    setFilterRequest({
      categorie: cat,
      page: 1,
      scrollHeight:0,
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
    fetchByCategorie(filterRequest.categorie,filterRequest.page)
    .then( filteredMovies => {
      if(filteredMovies){
        if(filterRequest.page === 1){setMovies(filteredMovies);}
        else{setMovies(movies.concat(filteredMovies));}
      }
      stopLoader();
    })
    .catch(() =>{
      stopLoader();
     })
    }
    getMovies()
  },[filterRequest])
  if(movies.length <= 0){return null}
  return (
    <div className="container-body-movies">
      <div className="container-movies-label">
        <h2>TOP 100</h2>
        <h4>(1 - {movies.length})</h4>
      </div>
      <div className="container-movies">
        {movies.map(movie => <MovieCard key={Math.random()} movie={movie}/>)}
      </div>
    </div>
    
  );
}

const Categories = () => {
  const initialRequest = {
    categorie: "",
    page: 1,
    scrollHeight:0,
  }

  const ref = createRef();
  const [filterRequest,setFilterRequest] = useState(initialRequest);

  const handleScroll = async () =>{
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const endOfPage = scrollTop + clientHeight >= scrollHeight;

    if(scrollTop && endOfPage){
      //stringInterPolation(scrollTop,scrollHeight,clientHeight);
      const newPage = filterRequest.page + 1;
      if(newPage <= lastRequest.maxPagesByDeveloper && newPage <= lastRequest.totalPages){
        setFilterRequest({
          categorie:filterRequest.categorie,
          page:filterRequest.page+1,
          scrollHeight:scrollHeight,
        })
      }
   }
  }

  /*
    ref.scrollTo({ top: 0, behavior: 'smooth' })
  
  */
  /*useEffect(() =>{
    stringInterPolation("loaded pages: ",lastRequest.page)
  },[ref])*/


  const body = () =>{
    return(
      <>
        <Outlet/>
        <div id="scrollable" ref={ref} className="container-body-categories" onScroll={handleScroll}>
          <GenreMenu setFilterRequest={setFilterRequest}/>
          <MoviesByCategorie filterRequest={filterRequest}/>
        </div>
      </>
    )
  }

  return (
    <CoorTransition page={body} name="categories trans" transition={routeTransitionEase}/>
  );

};
  
export default Categories;
