import { NavLink} from "react-router-dom";
import React, { useState,useRef,useEffect } from "react";
import '../styles/navbar.css';
import logo from "../assets/movi-loggo.png"
import { stringInterPolation } from "../helper/functions";


function useOutsideClickToClose() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if(event.target.className === "fa fa-bars"){return}
    if((ref.current && !ref.current.contains(event.target))) {
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


export const NavigationBar = () => {
  const [currentPage,setCurrentPage] = useState("home")
  const { ref, isMenuOpen,setIsMenuOpen } = useOutsideClickToClose();
  
  const handleToggleMenu = (event,page) =>{
    if(page !== currentPage){setCurrentPage(page);}
    setIsMenuOpen(!isMenuOpen);
  }

  const handleCloseMenu = (event,page) =>{
    setCurrentPage(page);
    setIsMenuOpen(false);
  }

 
  return (
    <div className={isMenuOpen ? "menu-bar responsive" : "menu-bar"} data-menu-bar id="toggle_button">
        <NavLink className="home-link" to="/" data-page="home" onClick={(e) => handleCloseMenu(e,"home")} ><img src={logo}/></NavLink>
        <NavLink className={(currentPage==="search") ? "search-link-disabled" : "search-link"} to="/search" data-page="search" onClick= {(e) => handleCloseMenu(e,"search")}><i className="fa fa-search"></i></NavLink>
        <div ref={ref} className="container-nav-link">
          <NavLink className="base-link" to="/popular" data-page="popular" onClick={(e) => handleToggleMenu(e,"popular")}>Popular</NavLink>
          <NavLink className="base-link" to="/categories" data-page="categories" onClick={(e) => handleToggleMenu(e,"categories")}>Categories</NavLink>
        </div>
        <a className="icon" onClick={(e) => handleToggleMenu(e,currentPage)}> <i className="fa fa-bars"></i> </a>
    </div>
  )
};