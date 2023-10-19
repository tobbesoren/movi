import { useContext, useEffect, useState } from "react";
import shoppingCart from '../../assets/shopping-cart.svg'
import "./CartWidget.css"
import { useNavigate } from "react-router-dom";
import { stringInterPolation } from "../../helper/functions";
import { AppContext } from "../AppContext";

export default function CartWidget({ productsCount }){
    const [productCountClass, setClassName] = useState("productsCountZero")
    const navigate = useNavigate()
    const cart = useContext(AppContext).shoppingCart;
    const [count, setCount] = useState(0);
    const navigateToCart = () => {
    //navigate('/showCart')
  }
    useEffect(() => {
        if (count==0){
            setClassName("productsCountZero")
        }else{
            setClassName("productsCount")
            
        }
    });

    useEffect(() => {
        
        setCount(cart[0].length);
        console.log(count);
        if(count == 0) {
            setClassName("productsCountZero")
        } else {
            setClassName("productsCount")
        }
    }, [cart]);

    return(
        <div>
            <button className="container" onClick={navigateToCart}>
                <div className={productCountClass}>
                    {count}
                </div>
                <img src={shoppingCart} className="shoppingCart" alt="Go to Cart" />
            </button>
        </div>
    )
}