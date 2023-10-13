import { NavLink} from "react-router-dom";
import React, { useState,useRef,useEffect } from "react";
import '../styles/navbar.css';
import logo from "../assets/movi-loggo.png"
import { stringInterPolation } from "../helper/functions";


function useOutsideClickToClose() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
  };

  useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  }, []);

  return { ref, isMenuOpen, setIsMenuOpen };
}


export const NavBar = () => {
  const { ref, isMenuOpen,setIsMenuOpen } = useOutsideClickToClose();
  
  const handleToggleMenu = () =>{
    setIsMenuOpen(!isMenuOpen);
  }

  const handleCloseMenu = () =>{
    setIsMenuOpen(false);
  }
 
  return (
    <div ref={ref} className={isMenuOpen ? "menu-bar responsive" : "menu-bar"} data-menu-bar id="toggle_button">
        <NavLink className="home-link" to="/" data-page="home" onClick={handleCloseMenu}><img src={logo}/></NavLink>
        <NavLink className="search-link" to="/Search" data-page="search" onClick={handleCloseMenu}><i className="fa fa-search"></i></NavLink>
        <div className="container-nav-link">
          <NavLink className="base-link" to="/Movies" data-page="movies" onClick={handleToggleMenu}>Movies</NavLink>
          <NavLink className="base-link" to="/Popular" data-page="popular" onClick={handleToggleMenu}>Popular</NavLink>
          <NavLink className="base-link" to="/Categories" data-page="categories" onClick={handleToggleMenu}>Categories</NavLink>
        </div>
        <a className="icon" onClick={handleToggleMenu}> <i className="fa fa-bars"></i> </a>
    </div>
  )
};
