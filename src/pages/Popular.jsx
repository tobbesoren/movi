import '../styles/popular.css';
import { CoorTransition } from "../components/CoorTransition";
import React, { useState, useEffect} from 'react';
import { routeTransitionOpacity  } from "../helper/transitiontypes";
import { Outlet } from "react-router-dom";



const Popular = () => {
  
  const body = () => {
    return(
        <div className="container-body-popular"> 
        </div>
      )
  }

  return (
    <CoorTransition page={body}  name="popular trans" transition={routeTransitionOpacity}/>
  );
  };
export default Popular;