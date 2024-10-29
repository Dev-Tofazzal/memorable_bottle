import PropTypes from 'prop-types';
import ("./Cart.css")
const Cart = ({cart,handleRemoveToCart}) => {
    return (
        <div>
             <h4>Cart: {cart.length}</h4>
             <div className="cart_container">
                {
                    cart.map(bottle => <div className='cart_content' key={bottle.id}>
                        <img  src={bottle.img}></img>
                        <button onClick={()=>handleRemoveToCart(bottle.id)}>Remove</button>
                    </div>)
                }
             </div>
        </div>
    );
};

Cart.propTypes={
    cart: PropTypes.array.isRequired,
    handleRemoveToCart: PropTypes.func.isRequired
}
export default Cart;