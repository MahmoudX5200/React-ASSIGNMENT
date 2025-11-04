import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

  let [cartCount, setCartCount] = useState(0);
  let headersData = {
    token: localStorage.getItem("userToken")
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      async function getData() {
        let { data } = await getAllCartData();
        setCartCount(data?.numOfCartItems);
      }
      getData();
    }
  }, []);

  // 🛒 Cart functions
  function addCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: id }, { headers: headersData });
  }

  function getAllCartData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headersData });
  }

  function deleteProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: headersData });
  }

  function updateProductQuantity(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers: headersData });
  }

  function checkPayment(id, shippingData) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      { shippingAddress: shippingData },
      { headers: headersData }
    );
  }

  // 💖 Wishlist functions
  function AddWishList(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: id }, { headers: headersData });
  }

  function deleteWichlist(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: headersData });
  }

  function getAllWichhtData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: headersData });
  }

  // ✅ دي الفانكشن الجديدة اللي كانت ناقصة:
  async function getUserWishList() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: headersData
      });
      return data;
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      return null;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        checkPayment,
        addCart,
        getAllCartData,
        deleteProduct,
        updateProductQuantity,
        AddWishList,
        deleteWichlist,
        getAllWichhtData,
        getUserWishList, // 👈 أضفناها هنا
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
