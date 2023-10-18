import { CoorTransition } from "../components/CoorTransition";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/movie.css';
import { routeTransitionSpringFromRight } from "../helper/transitiontypes";
import AsyncImage from "../components/AsyncImage";
import { capitalizeFirstLetter, setAsyncTimeoutThenExecute } from "../helper/functions";
import { fetchById } from "../helper/request";
import { useLoader } from "../components/LoaderContext";

const HeadSub = ({ head, sub }) => {
  return (
    <div className="header-subheader">
      <h4>{head}</h4>
      <h5>{sub}</h5>
    </div>
  )
}

const PageHeader = ({ label }) => {
  return (
    <div className="header-body">
      <div className="header-label">
        <h2>{label}</h2>
      </div>
    </div>
  );
};

const MovieInfoBody = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const { startLoader, stopLoader } = useLoader();


  function fetchMovie(){

  }

  useEffect(() => {
    const getMovie = async event => {
      startLoader();
      fetchById(movieId)
        .then(collectedMovie => {
          if (collectedMovie) {
            setMovie(collectedMovie);
          }
          stopLoader();
        })
        .catch(() => {
          stopLoader();
      })
      }
      setAsyncTimeoutThenExecute(getMovie,100);
  },[movieId])

  if(!movie){return null}
  const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`
  
  
  return (
    <div className="movie-info-body" style={{ backgroundImage: `url(${posterUrl})` }}>
     
      <div className="play-button" style={{ zIndex: 2 }}>
      <img src="src/images/play.png" alt="Play" />
     
      
    </div>
    
    
    <div className="overlay"></div>
    
    
    
    <div className="movie-top-header" style={{ zIndex: 2 }}>
      <div className="movie-label">
        
        <label>{movie.overview}</label>
      </div>
    </div>
      <div className="movie-data-grid"style={{ zIndex: 2 }}>
        <div className="movie-row-left">
          <HeadSub head="Runtime" sub={movie.runtime} />
          <HeadSub head="Ranking" sub={movie.vote_average} />
          <HeadSub head="Revenue" sub={movie.revenue} />
          <HeadSub head="Release date" sub={movie.release_date} />
          <HeadSub head="Homepage" sub={movie.homepage} />
        </div>
        <div className="movie-row-right">
    <div className="header-subheader">
      <h4>Languages</h4>
      {(movie.spoken_languages && movie.spoken_languages.map(language => <h5 key={Math.random()}>{language.english_name}</h5>))}
    </div>
    <div className="header-subheader">
      <h4>Genre</h4>
      {(movie.genres && movie.genres.map(genre => <h5 key={Math.random()}>{genre.name}</h5>))}
    </div>
  </div>
</div>

    </div>
  )
}


const Movie = () => {
  const location = useLocation();
  const movieId = location.state.movieId;
 
  const body = () =>{
    return(
        <div className="container-body-movie" >
        <MovieInfoBody movieId={movieId}/>
      </div>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromRight}/>
  );
  };

export default Movie;