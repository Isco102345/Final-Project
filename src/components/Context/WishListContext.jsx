import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {

    // let headers = {
    //     token: localStorage.getItem("userToken")
    // }

    function addProductToWishList(productId) {
        let headers = { token: localStorage.getItem("userToken") };
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: productId }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function Getloggeduserwishlist() {
        let headers = { token: localStorage.getItem("userToken") };
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function Removeproductfromwishlist(id) {
        let headers = { token: localStorage.getItem("userToken") };
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    return <WishListContext.Provider value={{ addProductToWishList, Getloggeduserwishlist, Removeproductfromwishlist }}>
        {props.children}
    </WishListContext.Provider>

}

