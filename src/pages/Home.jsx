import '../styles/home.css';
import { CoorTransition } from "../components/CoorTransition";
import { routeTransitionEase } from "../helper/transitiontypes";
import AsyncImage from '../components/AsyncImage';
import poster from "../assets/cinema.jpg"
import { fetchById } from "../helper/request";
import { useEffect, useState } from 'react';
import { useLoader } from "../components/LoaderContext";

const Home = () => {

  const Featured = () => {
    const {startLoader, stopLoader} = useLoader();
    const [featuredMovie, setFeaturedMovie] = useState(null);
    
    //I'll go with the oppenheimer movie for now!
    const featuredMovieID = `${872585}`;

    const getFeaturedMovie = async () => {
      
      startLoader();

      fetchById(featuredMovieID)
      .then(movie => {
        if(movie) {
          setFeaturedMovie(movie);
          stopLoader();
        }
      })
      .catch(() => {
        stopLoader();
      })
      
    }

    useEffect(() => {
      getFeaturedMovie();
    },[])
    
    if(featuredMovie == null) {return null}

    return (
      <div className='featured'>
        <img className="poster" src={`https://image.tmdb.org/t/p/original${featuredMovie.poster_path}`}></img>
      </div>
    )
  }
  
  const body = () =>{
    return(
      <div className="container-body-home">
          <Featured></Featured>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );

};
  
export default Home;