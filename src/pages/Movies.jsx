import '../styles/movies.css';
import { CoorTransition } from "../components/CoorTransition";
import React, { useState, useEffect} from 'react';
import { routeTransitionEase  } from "../helper/transitiontypes";
import { Outlet } from "react-router-dom";



const Movies = () => {
  
  const body = () => {
    return (
      <>
      <Outlet/>
      <div className="container-body-base"> 
      </div>
      </>
    )
  }

  return (
    <CoorTransition page={body}  name="movies trans" transition={routeTransitionEase}/>
  );
  };
export default Movies;