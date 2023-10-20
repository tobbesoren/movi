import { CoorTransition } from "../components/CoorTransition";
import { useState, useEffect , useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/movie.css';
import { routeTransitionSpringFromRight } from "../helper/transitiontypes";
import { capitalizeFirstLetter,currentDatePlus, setAsyncTimeoutThenExecute, stringInterPolation } from "../helper/functions";
import { fetchById } from "../helper/request";
import { useLoader } from "../components/LoaderContext";
import { AppContext } from "../components/AppContext";
import { fetchMovieFromLocalStorageById, removeMovieFromLocalStorageById, storeMovieToLocalStorageById } from "../helper/storage";
import { AlertDialog, ActionAlertDialog } from "../components/DialogModel";
import { MOVIE_STATUS, movieStatusToLabel } from "../helper/enum";

const HeadSub = ({ head, sub }) => {
  return (
    <div className="header-subheader">
      <h4>{head}</h4>
      <h5>{sub}</h5>
    </div>
  )
}

const PageHeader = ({ label }) => {
  return (
    <div className="header-body">
      <div className="header-label">
        <h2>{label}</h2>
      </div>
    </div>
  );
};

const MovieInfoBody = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const { startLoader, stopLoader } = useLoader();
  const [modelIsOpened, setModelIsOpened] = useState(false);
  const [isInCart,setIsInCart] = useState(true);

  const Dialog = () => {
  
    const onAddToCart = () => {
      storeMovieToLocalStorageById(movie.id)
      .then( movie =>{
      })
      .catch(error =>{
      })
    };

    const onRemoveFromCart = () => {
      removeMovieFromLocalStorageById(movie.id)
      .then( movie =>{
      })
      .catch(error =>{
      })
    };

    const AddToCartDialog = () =>{
      return (
        <ActionAlertDialog
            title="Add to cart?"
            lblRed="Cancel"
            lblBlue="Yes, add movie"
            leftAction={false}
            isOpened={modelIsOpened}
            onAction={onAddToCart}
            onClose={() => setModelIsOpened(false)}
          >
            <h4>{movie.title}</h4>
            <p>price: 50.0&#x24;</p>
            <p>start: {currentDatePlus(0)}</p>
            <p>end: {currentDatePlus(7)}</p>
          </ActionAlertDialog>
      );
    }

    const AlreadyInCartDialog = () =>{
      return (
        <ActionAlertDialog
            title="Movie already in cart!"
            lblRed="Remove from cart"
            lblBlue="OK"
            leftAction={true}
            isOpened={modelIsOpened}
            onAction={onRemoveFromCart}
            onClose={() => setModelIsOpened(false)}
            >
            <h4></h4>
            <p>Proceed to checkout, then start watching!</p>
          </ActionAlertDialog>
      );
    }
    
    return(
      <div>
        {isInCart ? <AlreadyInCartDialog/> : <AddToCartDialog/> }
      </div>
    )
    
  };

  const handlePlayButtonClick = event =>{
    /*fetchMovieFromLocalStorageById(movie.id)
    .then(movie => {
      setIsInCart(true);
      setModelIsOpened(true);
    })
    .catch(error =>{
      setIsInCart(false);
      setModelIsOpened(true);
    })*/
  }
  const [cart, setCart] = useContext(AppContext).shoppingCart;

  useEffect(() => {
    const getMovie = async event => {
      startLoader();
      fetchById(movieId)
        .then(collectedMovie => {
          if (collectedMovie) {
            setMovie(collectedMovie);
          }
          stopLoader();
        })
        .catch(() => {
          stopLoader();
      })
      }
      setAsyncTimeoutThenExecute(getMovie,100);
  },[movieId])

  if(!movie){return null}
  const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`
  
  const addToCart = (addedMovie) => {
    setCart(prevState => {
      return [...prevState, addedMovie];
    })
    // console.log(cart.map(movie =>
    //   movie));
  }
  
  return (
    <div className="movie-info-body" style={{ backgroundImage: `url(${posterUrl})` }}>
      <Dialog/>
      <div className="play-button" onClick={handlePlayButtonClick} style={{ zIndex: 2 }}>
        <img src="src/images/play.png" alt="Play" />
      </div>
      <div className="buttonContainer" style={{ zIndex: 2 }}>
          <button className="buyButton" onClick={() => addToCart(movie)} >Buy</button>
      </div> 
      <div className="overlay"></div>
      <div className="movie-top-header" style={{ zIndex: 2 }}>
        <div className="movie-label">
          
          <label>{movie.overview}</label>
        </div>
        
      </div>
     
      <div className="movie-data-grid"style={{ zIndex: 2 }}>
          <div className="movie-row-left">
            <HeadSub head="Runtime" sub={movie.runtime} />
            <HeadSub head="Ranking" sub={movie.vote_average} />
            <HeadSub head="Revenue" sub={movie.revenue} />
            <HeadSub head="Release date" sub={movie.release_date} />
            <HeadSub head="Homepage" sub={movie.homepage} />
          </div>
        <div className="movie-row-right">
          <div className="header-subheader">
            <h4>Languages</h4>
            {(movie.spoken_languages && movie.spoken_languages.map(language => <h5 key={Math.random()}>{language.english_name}</h5>))}
          </div>
          <div className="header-subheader">
            <h4>Genre</h4>
            {(movie.genres && movie.genres.map(genre => <h5 key={Math.random()}>{genre.name}</h5>))}
          </div>
        </div>
            
      </div>
      
  </div>
  )
}


const Movie = () => {
  const location = useLocation();
  const movieId = location.state.movieId;
 
  const body = () =>{
    return(
        <div className="container-body-movie" >
        <MovieInfoBody movieId={movieId}/>       
      </div>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromRight}/>
  );
  };

export default Movie;