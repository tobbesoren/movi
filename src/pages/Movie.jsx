import { CoorTransition } from "../components/CoorTransition";
import React, { useState, useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import '../styles/movie.css';
import { routeTransitionSpringFromBottom } from "../helper/transitiontypes";


const Movie = () => {
  const location = useLocation();
  const movieID = location.state.movieID;
  const navigate = useNavigate();
 
  const handleNavigateBack = event =>{
    navigate(-1);
  }

  const body = () =>{
    return(
        <div className="container-body-movie" >
        
      
      </div>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromBottom}/>
  );
  };

  export default Movie;