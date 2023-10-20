import { useEffect,useContext } from 'react'
import { Routes, Route,useLocation,HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./components/LoaderContext";
import { NavigationBar } from './components/NavigationBar';
import Home from "./pages/Home";
import Error from "./pages/Error";
import Categories from "./pages/Categories";
import Popular from "./pages/Popular";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import ShoppingCart from './pages/Shoppingcart';
import Checkout from './pages/Checkout';
import Confirm from './pages/Confirmation';
import { AppContext,AppProvider } from "./components/AppContext";
import "./styles/base.css"
import { stringInterPolation } from './helper/functions';

const str1 = "/categories/";
const rgx1 = new RegExp(str1);

function LocationProvider({ children }) {
  return <AnimatePresence >{children}</AnimatePresence>;
}

function AppRoutes() {
  const location = useLocation();
  /*const menu = useContext(AppContext).menu;
  const [hiddenMenu,setHiddenMenu] = menu;
  
  
  useEffect(() => {
    setHiddenMenu(rgx1.test(location.pathname)); 
  },[location])*/

  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/shoppingcart" element={<ShoppingCart />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/categories" element={<Categories />} >
        <Route path=":movieId" element={<Movie />} />
      </Route>
      <Route path="/movie/:movieId" element={<Movie />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

const AppBody = () =>{
  const menu = useContext(AppContext).menu;
  const [hiddenMenu,setHiddenMenu] = menu;
  return (
    <div className="App">
      <HashRouter>
      {!hiddenMenu && <NavigationBar/>}
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

export default App
