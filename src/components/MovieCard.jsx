import { NavLink, Outlet} from "react-router-dom";
import AsyncImage from "../components/AsyncImage";

const MovieCard = ({movie}) =>{
    const movieImgURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    const nav = `/movie/${movie.id}`
    
    return (
        <div key={movie.id} className="container-movie">
          <NavLink className="movie-nav-link" to={nav} data-page="movie-info" state={{ movieId: movie.id }} style={{ textDecoration: 'none' }} >
            <AsyncImage className="movie-poster" src={movieImgURL}/>
          </NavLink>
        </div>
    )
  }

  export default MovieCard;