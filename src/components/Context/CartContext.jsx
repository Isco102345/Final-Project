import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export let CartContext = createContext()

export default function CartContextProvider(props) {


    let headers = {
        token: localStorage.getItem("userToken")
    }
    const [cartId, setCartId] = useState()
    const [numberItems, setNumberItems] = useState()

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)
    }

    function GetLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => {
                setNumberItems(res.data.numOfCartItems)
                setCartId(res.data.data._id)
                return res
            })
            .catch((err) => err)
    }

    function UpdateCartQuantity(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newCount }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function RemoveSpecificCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function ClearUserCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function Checkout(cartId, url, formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: formData
        },
            { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function getAllOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`, { headers })
            .then((res) => res.data)
            .catch((err) => err)
    }
    function getUserOrders(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, { headers })
            .then((res) => res.data)
            .catch((err) => err)
    }
    

    useEffect(() => {
        GetLoggedUserCart()
    }, [])

    return <CartContext.Provider value={{ addProductToCart, GetLoggedUserCart, UpdateCartQuantity, RemoveSpecificCartItem, ClearUserCart, Checkout, cartId, numberItems, setNumberItems, getAllOrders, getUserOrders }}>
        {props.children}
    </CartContext.Provider>
}