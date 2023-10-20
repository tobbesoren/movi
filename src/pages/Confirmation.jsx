import '../styles/confirm.css'; 
import { useContext } from 'react';
import { AppContext } from '../components/AppContext';
const Confirm = () => {
    const [cart, setCart] = useContext(AppContext).shoppingCart;
    const getMovies = () => Object.values(cart || {})
    return(
        <section className="checkout">
            <p className="thankYou">
                Thank you for your purchase
            </p>
            <ul className="cartList">
                {getMovies().map(movie => (
                <li className="cartItem" key={movie.id}>
                    <img className="moviePoster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                    <h3 className="cartItemTitle">{movie.title}</h3>
                     <img className="confirm-play-button" src="src/images/play.png" alt="Play" />
                </li>
                ))}
            </ul>
        </section>
        
    )
}
export default Confirm