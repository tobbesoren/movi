import { useEffect, useState } from "react";
import shoppingCart from '../../assets/shopping-cart.svg'
import "./CartWidget.css"

export default function CartWidget({ productsCount }){
    const [productCountClass, setClassName] = useState("productsCountZero")
    

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
                <span className={productCountClass}>
                    {productsCount}
                </span>
                <img src={shoppingCart} className="shoppingCart" alt="Go to Cart" />
            </button>
        </div>
    )
}