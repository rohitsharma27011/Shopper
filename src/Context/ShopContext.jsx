import React, { createContext, useState } from "react";
import all_product from '../components/Assets/all_product'
import Product from "../Pages/Product";

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart = {};
    for(let index=0;index<all_product.length+1;index++){
        cart[index]=0;
    }
    console.log(cart);
    return cart;
}



const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);

    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

    }

    

    const getTotalAmount  = () =>{
        let total=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id === Number(item));
                total+= itemInfo.new_price*cartItems[item];
            }
        }
        return total;
    }

    const getTotalItem = () => {
        let totalItem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalItem,getTotalAmount,all_product,cartItems,addToCart,removeFromCart};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;