import { createContext, useEffect, useState } from "react";
import { userToken } from "../common/http";


export const CartContext = createContext();
export const CartProvider = ({children}) => {
    const [cartData,setCartData] = useState(JSON.parse(localStorage.getItem('cart'))|| [])
    const [shippingCost,setShippingCost] = useState(0);
    const addToCart = (product,size=null) => {
        let updatedCart = [...cartData];
        //If cart data is empty
        if(cartData.length == 0){
            updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 100000)}`,
                product_id : product.id,
                size : size,
                title : product.title,
                price : product.price,
                qty:1,
                image_url : product.image_url
            })
        }else{
            //if size is not empty
            if(size != null){
                const isProductExist= updatedCart.find(item =>
                    item.product_id == product.id && item.size == size
                )
                //if product and siz3e combination exist then increase qty
                if(isProductExist){
                    updatedCart = updatedCart.map(item => (item.product_id == product.id && item.size == size) ? {...item, qty: item.qty + 1} : item)
                }else {
                    //if product and size combination not exist then add new item
                     updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 100000)}`,
                product_id : product.id,
                size : size,
                title : product.title,
                price : product.price,
                qty:1,
                image_url : product.image_url
            })
                }
            }else{
                //when product is null
                const isProductExist = updatedCart.find(item => item.product_id == product.id )
                if(isProductExist){
                    updatedCart = updatedCart.map(item => (item.product_id == product.id ) ? {...item, qty: item.qty + 1} : item)
                }else {
                    //if product  not exist then add new item
                     updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 100000)}`,
                product_id : product.id,
                size : size,
                title : product.title,
                price : product.price,
                qty:1,
                image_url : product.image_url
            })
                }
            }
        } 
       
        setCartData(updatedCart)
        localStorage.setItem(`cart`,JSON.stringify(updatedCart))
    }
     const shipping = () => {
        
        let shippingAmount = 0;
        cartData.map(item => {
            shippingAmount += item.qty * shippingCost;
        })
            return shippingAmount;
        }
        const subTotal = ()=>{
            let subtotal = 0;
            cartData.map(item => {
                subtotal += item.qty * item.price;
            })
            return subtotal;
        }
        const grandTotal = () => {
            return subTotal() + shipping();
        }

        const updateCartItem = (itemId, newQty) => {
            let updatedCart = [...cartData];
           updatedCart = updatedCart.map(item => (item.id == itemId)? {...item,qty: newQty} : item)
            setCartData(updatedCart)
            localStorage.setItem('cart',JSON.stringify(updatedCart))
        }
        const deleteCartItem = (itemId) => {
          const newCartData =  cartData.filter(item => item.id != itemId)
          setCartData(newCartData)
          localStorage.setItem('cart',JSON.stringify(newCartData));
        }
        const getQty = () => {
            let qty = 0;
            cartData.map(item =>{
                qty += parseInt(item.qty)
            })
            return qty;
        }
        useEffect( () => {
               fetch(`${import.meta.env.VITE_API_URL}/get-shipping-front`,{
                            method:'GET',
                            headers:{
                                'Content-type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${userToken()}`
                            }
                        }).then(res => res.json())
                        .then(result => {
                            
                            if(result.status == 200){
                               
                               setShippingCost(result.data.shipping_charge)
                            }else{
                                setShippingCost(0);
                                console.log("something went wrong");
                            }
                        })
        })
    return(
        <CartContext.Provider value={{addToCart,cartData,grandTotal,subTotal,shipping,updateCartItem,deleteCartItem,getQty}}>
            {children}
        </CartContext.Provider>
    )
}