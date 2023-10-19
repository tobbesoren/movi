import '../styles/home.css';
import { CoorTransition } from "../components/CoorTransition";
import { routeTransitionEase } from "../helper/transitiontypes";
import AsyncImage from '../components/AsyncImage';
import poster from "../assets/cinema.jpg"
import { fetchById, fetchByPopularity } from "../helper/request";
import { useEffect, useState } from 'react';
import { useLoader } from "../components/LoaderContext";
import MovieCard from '../components/MovieCard';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const Featured = () => {
    const {startLoader, stopLoader} = useLoader();
    const [featuredMovie, setFeaturedMovie] = useState(null);
    
    //I'll just go with the oppenheimer movie for now!
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

    const navigateToMovie = () => {
      navigate(`/movie/${featuredMovie.id}`, {state:{ movieId: featuredMovie.id }})
      
    }
    
    if(featuredMovie == null) {return null}

    return (
      <div className='featured'>
        <h2>Featured</h2>
        <img className="poster" src={`https://image.tmdb.org/t/p/original${featuredMovie.poster_path}`} onClick={navigateToMovie}></img>
      </div>
    )
  }

  const PopularMovies = () => {

    const {startLoader, stopLoader} = useLoader();
    const [popularMovies, setPopularMovies] = useState(null);
    const [movieCards, setMovieCards] = useState(null);

    const getPopularMovies = async () => {
      
      startLoader();

      fetchByPopularity('1')
      .then(movies => {
        if(movies) {
          setPopularMovies(movies);
          setMovieCards(createMovieList(movies));
          
          stopLoader();
        }
      })
      .catch(() => {
        stopLoader();
      })
      
    }

    useEffect(() => {
      getPopularMovies();
    },[])

    

    return(
      <div>
      <h2>Popular</h2>
      <div className="movieList">
        {movieCards}
      </div>
      </div>
    )
  }

  const createMovieList = (movies) => {
    
    let movieList = [];
    const path = "/movie/";
    movies.forEach(movie => {
            const newMovie = MovieCard({movie,path});
            movieList.push(newMovie);
        }
    )
    return movieList;
}
  
  const body = () =>{

    return(
      <div className="container-body-home">
          <Featured></Featured>
          <PopularMovies></PopularMovies>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );

};
  
export default Home;