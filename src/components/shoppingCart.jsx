import { useEffect, useState } from "react";
import shoppingCart from "../assets/shopping-cart.svg"
import "./shoppingCart.css"

export default function ShoppingCart({ productsCount }){
    const [className, setClassName] = useState("productsCountZero")
    

    useEffect(() => {
        if (productsCount===undefined){
            setClassName("productsCountZero")
        }else{
            setClassName("productsCount")
        }
    });
    return(
        <div>
            <button className="container">
                <span className={className}>
                    {productsCount}
                </span>
                <img src={shoppingCart} className="shoppingCart" alt="Go to Cart" />
            </button>
        </div>
    )
}