//import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import shoppingCart from "../assets/shopping-cart.svg"
import "./shoppingCart.css"

export default function ShoppingCart({ productsCount }){

  useEffect => {
    productsCount = 5;
  }
  //const navigate = useNavigate()

  //const navigateToCart = () => {
  //  navigate("/cart")
  //}
  return(
    <div>
        <button className="container">
            <span className="productsCount"></span>
            <img src={shoppingCart} className="shoppingCart" alt="Go to Cart" />
        </button>
    </div>
  )
/*
  return (
    <button className={classes.container} onClick={navigateToCart}>
      <span className={classes.productsCount}>{productsCount}</span>
      <img src={shoppingCart} className={classes.shoppingCart} alt="Go to Cart" />
    </button>
    
  )*/
}