import { useEffect } from "react"
import useLocalStorageState from "use-local-storage-state"
import { useLocation } from "react-router-dom"
import { Increase_Decrease } from "../Increase_Decrease/Increase_Decrease"

export const ShoppingCart = () => {
  const [cart, setCart] = useLocalStorageState("cart", {})
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleRemoveProduct = productId => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart }
      delete updatedCart[productId]
      return updatedCart
    })
  }

  const handleUpdateQuantity = (productId, operation) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart }
      if (updatedCart[productId]) {
        if (operation === "increase") {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity + 1
          }
        } else {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity - 1
          }
        }
      }
      return updatedCart
    })
  }

  const getProducts = () => Object.values(cart || {})

  const totalPrice = getProducts().reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  )

  return (
    <section className={classes.cart}>
      <h1>Cart</h1>

      <div className={classes.container}>
        {getProducts().map(product => (
          <div className={classes.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <Increase_Decrease
              removeProductCallback={() => handleRemoveProduct(product.id)}
              productId={product.id}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        ))}
      </div>
      <div>{totalPrice}</div>
    </section>
  )
}
