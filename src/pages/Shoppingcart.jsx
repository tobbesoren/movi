import { useEffect, useContext } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import '../styles/shoppingcart.css';
import { getMoviePrice } from '../helper/functions';

const ShoppingCart = () => {
  const location = useLocation();
  const [cart, setCart] = useContext(AppContext).shoppingCart;


  useEffect(() => {
    console.log(cart)
    window.scrollTo(0, 0)
  }, [location])

  const handleRemoveMovie = movieId => {
    let newCart = [cart][0];
    newCart = newCart.filter(item => item.id !==movieId);
    setCart(newCart);
  }

  const getMovies = () => Object.values(cart || {})

  function getTotalPrice() {
    let totalPrice = 0;

    getMovies().map(movie => {
      movie.price = getMoviePrice(movie);
      totalPrice += movie.price;
    })
    return totalPrice;
  }
  return (
    <section className="cart">
      <h1 className="cartHeader">Your shoppingcart</h1>

      <ul className="cartList">
        {getMovies().map(movie => (
          <li className="cartItem" key={movie.id}>
            <img className="moviePoster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            <h3 className="cartItemTitle">{movie.title}</h3>
            <p className="moviePrice">$ {movie.price}</p>
            <button className="fa fa-trash trashButton" onClick={() => {handleRemoveMovie(movie.id)}}></button>
          </li>
        ))}
      </ul>
      <div className="checkoutSection">Total amount to pay {getTotalPrice()} $
      <NavLink className="checkout_link" to="/checkout" data-page="checkout">
        <button className="checkout_btn">Checkout</button>
      </NavLink>
      </div>
    </section>
  )
}
export default ShoppingCart
