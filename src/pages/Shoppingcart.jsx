import { useEffect, useContext } from "react"
import useLocalStorageState from "use-local-storage-state"
import { NavLink, useLocation } from "react-router-dom"
import Increase_Decrease from "../components/Increase_Decrease/Increase_Decrease"
import { AppContext } from "../components/AppContext"
import '../styles/shoppingcart.css';
import moment from "moment"
import { getMoviePrice } from '../helper/functions';

const ShoppingCart = (props) => {
  const location = useLocation();
  const [cart, setCart] = useContext(AppContext).shoppingCart;


  useEffect(() => {
    console.log(cart)
    window.scrollTo(0, 0)
  }, [location])

  const handleRemoveMovie = movieId => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart }
      delete updatedCart[movieId]
      return updatedCart
    })
  }

  const handleUpdateQuantity = (movieId, operation) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart }
      if (updatedCart[movieId]) {
        if (operation === "increase") {
          updatedCart[movieId] = {
            ...updatedCart[movieId],
            quantity: updatedCart[movieId].quantity + 1
          }
        } else {
          updatedCart[movieId] = {
            ...updatedCart[movieId],
            quantity: updatedCart[movieId].quantity - 1
          }
        }
      }
      return updatedCart
    })
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
