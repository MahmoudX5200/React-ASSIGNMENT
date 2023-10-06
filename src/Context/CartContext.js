import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export let CartContext = createContext()

export default function CartContextProvider(props) {


    let [cartCount, setCartCount] = useState(0)
    let headersData = {
        token: localStorage.getItem("userToken")
    }

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            async function getData() {
                let { data } = await getAllCartData()
                console.log(data);
                setCartCount(data?.numOfCartItems)
            }
            getData()
        }
    }, [])

    function deleteProduct(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: headersData
        })
    }
    function deleteWichlist(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: headersData
        })
    }
    function getAllCartData() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: headersData
        })

    }
    function getAllWichhtData() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: headersData
        })

    }
    function addCart(id) {
        let body = {
            "productId": id
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, body, {
            headers: headersData
        })
    }
    function AddWishList(id) {
        let body = {
            "productId": id
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, body, {
            headers: headersData
        })
    }

    function checkPayment(id, shippingData) {

        let body = {
            shippingAddress: shippingData
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, body, {
            headers: headersData
        })

    }
    function updateProductQuantity(id, count) {
        let body = {
            "count": count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, {
            headers: headersData
        })
    }
    return <CartContext.Provider value={{ cartCount, setCartCount, checkPayment, addCart, getAllCartData, deleteProduct ,deleteWichlist, updateProductQuantity ,AddWishList ,getAllWichhtData }}>
        {props.children}
    </CartContext.Provider>
}