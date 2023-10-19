import { useEffect, useState } from "react";
import shoppingCart from '../../assets/shopping-cart.svg'
import "./CartWidget.css"
import { useNavigate } from "react-router-dom";

export default function CartWidget({ productsCount }){
    const [productCountClass, setClassName] = useState("productsCountZero")
    const navigate = useNavigate()

    const navigateToCart = () => {
    //navigate('/showCart')
  }
    useEffect(() => {
        if (productsCount===undefined){
            setClassName("productsCountZero")
        }else{
            setClassName("productsCount")
        }
    });

    return(
        <div>
            <button className="container" onClick={navigateToCart}>
                <span className={productCountClass}>
                    {productsCount}
                </span>
                <img src={shoppingCart} className="shoppingCart" alt="Go to Cart" />
            </button>
        </div>
    )
}