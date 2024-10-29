import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import { addToLS, getStoreCart, removeFromLS} from "../Utilities/Localstorage";
import Cart from "../cart/Cart";
import("./Bottles.css")

const Bottles = () => {
    const [bottles, setBottle] = useState([])
    const [cart,setCart] = useState([])
    

    useEffect(() => {
        fetch("Bottles.json")
            .then(res => res.json())
            .then(data => setBottle(data))
    }, [])

    // load cart from local store
    useEffect(()=>{
       console.log("call the use bottle", bottles.length)
       if(bottles.length){
        const storeCartLC = getStoreCart();
        // console.log(storeCartLC);
         const saveCart = []
        for(const id of storeCartLC){
            console.log(id)
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                saveCart.push(bottle)
            }
        }
        console.log("Save Cart",saveCart)
        setCart(saveCart)
       }
        
        
        
    },[bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart,bottle];
        setCart(newCart);
        addToLS(bottle.id)
    }

    const handleRemoveToCart = id => {
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)
        removeFromLS(id)
    }
    return (
        <div>
            <h2>Bottles Avaible: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveToCart={handleRemoveToCart}></Cart>
            <div className="bottle_container">
                {
                    bottles.map(bottle => <Bottle 
                    key={bottle.id} 
                    bottle={bottle}
                    handleAddToCart={handleAddToCart}>

                    </Bottle>)

                }
            </div>
        </div>
    );
};

export default Bottles;