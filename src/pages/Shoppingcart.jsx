import { useEffect } from "react"
import useLocalStorageState from "use-local-storage-state"
import { useLocation } from "react-router-dom"
import Increase_Decrease from "../components/Increase_Decrease/Increase_Decrease"

const ShoppingCart = () => {
  const [cart, setCart] = useLocalStorageState("cart", {})
  const location = useLocation()

  useEffect(() => {
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

  const totalPrice = getMovies().reduce(
    (accumulator, movie) => accumulator + movie.price * movie.quantity,
    0
  )

  return (
    <section className="cart">
      <h1>Your shoppingcart</h1>

      <div className="container">
        {getMovies().map(movie => (
          <div className="movie" key={movie.id}>
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <Increase_Decrease
              removeProductCallback={() => handleRemoveMovie(product.id)}
              productId={movie.id}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        ))}
      </div>
      <div>Total amount to pay {totalPrice} $</div>
    </section>
  )
}
export default ShoppingCart
