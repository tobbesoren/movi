import '../styles/checkout.css'; 
const Checkout = () => {
    return(
        <section className="checkout">
            <h1 className ="cartHeader">Checkout</h1>
            <div className="paymentForm">
                <form className="payment">
                    <label htmlFor="fname">First name:</label>
                    <input className="inputField" type="text" id="fname" name="fname"></input>
                    <label htmlFor="lname">Last name:</label>
                    <input className="inputField" type="text" id="lname" name="lname"></input>
                </form>
            </div>
            <div className="container">

            </div>
            <div>Total amount to pay </div>
        </section>
    )
}
export default Checkout