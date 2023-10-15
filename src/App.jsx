import { useState,useEffect,useContext } from 'react'
import { Routes, Route,useLocation,HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./components/LoaderContext";
import { NavigationBar } from './components/NavigationBar';
import Home from "./pages/Home";
import Error from "./pages/Error";
import Categories from "./pages/Categories";
import Popular from "./pages/Popular";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import { AppContext,AppProvider } from "./components/AppContext";
//import Search from './components/Search'
//import './App.css'
import "./styles/base.css"

const str = "/categories/";
const rgx = new RegExp(str);

function LocationProvider({ children }) {
  return <AnimatePresence >{children}</AnimatePresence>;
}

function AppRoutes() {
  const location = useLocation();
  const context = useContext(AppContext);
  useEffect(() => {
    context.setHiddenMenu(rgx.test(location.pathname)); 
  },[location])

  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/categories" element={<Categories />} >
        <Route path=":movieId" element={<Movie />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

const AppBody = () =>{
  const appContext = useContext(AppContext);
  return (
    <div className="App">
      <HashRouter>
      {!appContext.hiddenMenu && <NavigationBar/>}
      <LocationProvider>
        <AppRoutes />
      </LocationProvider>
    </HashRouter>
    </div>
  )

}


function App() {
  return (
    <AppProvider>
      <LoaderProvider>
        <AppBody/>
      </LoaderProvider>
    </AppProvider>
    
  );
}

/*
function App() {
  

  return (
    <>
      <Search></Search>
    </>
  )
}*/

export default App
