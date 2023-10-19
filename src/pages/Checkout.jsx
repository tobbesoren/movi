import '../styles/checkout.css'; 
const Checkout = () => {
    return(
        <section className="checkout">
            <h1 className ="cartHeader">Checkout</h1>
            <div className="paymentForm">
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
                    
                </form>
            </div>
            <div className="container">

            </div>
            <div>Total amount to pay </div>
        </section>
    )
}
export default Checkout