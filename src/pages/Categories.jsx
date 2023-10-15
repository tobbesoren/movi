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

const MovieCard = ({movie}) =>{

  const handleOnClick = e =>{

  }

  const movieTitle = movie.title;
  const movieImgURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const releaseDate = movie.release_date;
  const key = movie.id;
  const nav = `${movie.id}`
  return (
      <div key={key} className="container-movie">
        <NavLink className="movie-nav-link" to={nav} data-page="movie-info" state={{ movieId: movie.id }} style={{ textDecoration: 'none' }}>
          <AsyncImage className="movie-poster" src={movieImgURL} onClick={handleOnClick} />
        </NavLink>
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
      if(filteredMovies && filteredMovies.results){
        //setMovies(movies.concat(filteredMovies.results));
        setMovies(filteredMovies.results);
      }
      else{setMovies([])}
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
    scrollHeight:0,
  }

  const initialScrollStatus = {
    current:STATUS.IDLE,
    lastScrollHeight:0,
  }
  const ref = createRef();
  const [filterRequest,setFilterRequest] = useState(initialRequest);
  const [scrollStatus,setScrollStatus] = useState(initialScrollStatus);

  const handleScroll = async () =>{
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const endOfPage = scrollTop + clientHeight >= scrollHeight;
    if(scrollTop && endOfPage){
      console.log("entered refresh: ",scrollTop, scrollHeight, clientHeight)
      console.log("filtered values: ",filterRequest.scrollHeight)
      /*setScrollStatus({
        current:STATUS.FETCHING,
        lastScrollHeight:scrollHeight,
      })*/
    }
  }

  
  useEffect(() =>{
    if(scrollStatus.current === STATUS.FETCHING && filterRequest.page === 1){
      stringInterPolation("fetch page: ");
      setFilterRequest({
        categorie:filterRequest.categorie,
        page:filterRequest.page+1,
        scrollHeight:scrollStatus.lastScrollHeight,
      })
    }
  },[scrollStatus])

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
