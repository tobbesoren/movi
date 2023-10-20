import '../styles/checkout.css'; 
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../components/AppContext';
const Checkout = () => {
    const [cart, setCart] = useContext(AppContext).shoppingCart;
    const getMovies = () => Object.values(cart || {})

    function getTotalCartPrice(){
        let total = 0
        cart.map(movie => {
            total+=movie.price;
        })
        return total;
    }
    return(
        <section className="checkout">
            <h1 className ="cartHeader">Checkout</h1>
            <div className="paymentForm">
                <ul className="cartList">
                    {getMovies().map(movie => (
                    <li className="cartItem" key={movie.id}>
                        <img className="moviePoster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                        <h3 className="cartItemTitle">{movie.title}</h3>
                        <h4 className="cartItemPrice">$ {movie.price}</h4>
                    </li>
                    ))}
                </ul>
                <p className="cartTotal">Total: $ {getTotalCartPrice()}</p>
                <form className="payment">
                    <div className="labelAndInput">
                        <label htmlFor="fname">First name:</label>
                        <input className="inputField" type="text" id="fname" name="fname"></input>
                    </div>
                    <div className="labelAndInput">
                        <label htmlFor="lname">Last name:</label>
                        <input className="inputField" type="text" id="lname" name="lname"></input>
                    </div>
                    <div className="labelAndInput">
                        <label htmlFor="creditCard">Credit card number:</label>
                        <input className="inputField" type="text" id="creditCard" name="creditCard"></input>
                    </div>
                    <div className="labelAndInput">
                        <label htmlFor="cvv">CVV:</label>
                        <input className="inputField" type="text" id="cvv" name="cvv"></input>
                    </div>
                    <NavLink className="checkout_link" to="/confirm" data-page="confirm">
                        <button className="checkout_btn">Place order</button>
                    </NavLink>
                </form>
            </div>
        </section>
    )
}
export default Checkout