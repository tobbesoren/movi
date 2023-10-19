import { NavLink, useLocation, useNavigate} from "react-router-dom";
import React, { useState,useRef,useEffect, useContext, useCallback } from "react";
import '../styles/navbar.css';
import logo from "../assets/movi-loggo.png"
import { stringInterPolation } from "../helper/functions";
import CartWidget from "./CartWidget/CartWidget";
import { AppContext } from "./AppContext";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [searchFieldText, setSearchFieldText] = useState('');
  const [searchFieldIsOpen, setSearchFieldIsOpen] = useState(false);
  const { ref, isMenuOpen,setIsMenuOpen } = useOutsideClickToClose();
  const [searchRequest,setSearchRequest] = useContext(AppContext).api;
  
  const handleCloseMenu = () =>{
    setIsMenuOpen(false);
    setSearchFieldIsOpen(false);
  }

  const handleCloseMenuAndDoNewSearch = () =>{
    setIsMenuOpen(false);
    newSearchRequest();
  }
 
  const handleEnter = (event) => {
    if(event.key === "Enter") {
      if(strippedPathEquals("search")){newSearchRequest();}
      else{ 
        newSearchRequest(event); 
        navigate("/search");
      }
    }
  }

  const closeSearchField = useCallback(event => {
    setSearchFieldText("");
    setSearchFieldIsOpen(false);
  })

  function resetSearch(){
    if(searchRequest !== ""){
      setSearchFieldText("");
      setSearchRequest("");
    }
  }

  const newSearchRequest = useCallback(event => { setSearchRequest(searchFieldText);})
  const strippedPathEquals = (page) =>{ return strippedPath() === page; }
  const strippedPath = () =>{ return location.pathname.replace(/^\/|\/$/g, '').split('/')[0]; }
  const handleInput = (input) => { setSearchFieldText(input.target.value); }
  const handleToggleMenu = () =>{ setIsMenuOpen(!isMenuOpen);}

  /*
  useEffect(() =>{
    resetPageOnBackNavigation();
  },[location])*/

  return (
    <div className={isMenuOpen ? "menu-bar responsive" : "menu-bar"} data-menu-bar id="toggle_button">
        <NavLink className="home-link" to="/" data-page="home" onClick={(e) => handleCloseMenu()} ><img src={logo}/></NavLink>
        <div className={searchFieldIsOpen ? "search-field" : "search-field-disabled"}>
          <button className="clear-button" onClick={closeSearchField}>&#10060;</button>
          <input onKeyDown={handleEnter} type="text" placeholder="title" value={searchFieldText} onChange={handleInput}></input>
          {strippedPathEquals("search") ? 
          <button className="search-button" onClick={newSearchRequest}><i className="fa fa-search"></i></button> : 
          <NavLink className="search-button-nav" to="/search" data-page="search" onClick= {(e) => handleCloseMenuAndDoNewSearch()}><button className="search-button"><i className="fa fa-search"></i></button></NavLink>
          }
        </div>
        <a className={searchFieldIsOpen ? "search-link-disabled" : "search-link"} onClick= {(e) => setSearchFieldIsOpen(true)}><i className="fa fa-search"></i></a>
        <NavLink className="shoppingCart" to="/shoppingcart" data-page="shoppingcart">
          <CartWidget></CartWidget>
        </NavLink>
        <div ref={ref} className={searchFieldIsOpen ? "container-nav-link-search" : "container-nav-link"}>
          <NavLink className="base-link" to="/popular" data-page="popular" onClick={(e) => handleToggleMenu()}>Popular</NavLink>
          <NavLink className="base-link" to="/categories" data-page="categories" onClick={(e) => handleToggleMenu()}>Categories</NavLink>
        </div>
        <a className="icon" onClick={(e) => handleToggleMenu()}> <i className="fa fa-bars"></i> </a>
    </div>
  )
};

