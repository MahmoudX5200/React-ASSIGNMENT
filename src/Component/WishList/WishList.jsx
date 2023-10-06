import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
export default function WishList() {
  let [WichData, setCartData] = useState(null);
  let {
    addCart,
    getAllCartData,
    updateProductQuantity,
    setCartCount,
    addWishList,
    deleteWichlist,
    getAllWichhtData,
  } = useContext(CartContext);
  let { id } = useParams();

  useEffect(() => {
    // getAllData()

    getwichlist();
  }, []);

  async function DeleteWichlist(id) {
    let { data } = await deleteWichlist(id);
    setCartData(data.data);
    setCartCount(data.numOfCartItems);
    getwichlist();
  }
  async function AddWishList(id) {
    let { data } = await addWishList(id);
    setCartData(data.data);
    setCartCount(data.numOfCartItems);
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    console.log(data);
    setCartData(data.data);
  }

  async function getAllData() {
    let { data } = await getAllCartData();
    console.log(data);
    setCartData(data.data);
  }
  async function getwichlist() {
    $(".loading").fadeIn();

    let { data } = await getAllWichhtData();
    console.log(data);
    setCartData(data.data);
    $(".loading").fadeOut(1000);
  }

  async function addDataToCart(id) {
    let { data } = await addCart(id);
    if (data.status == "success") {
      setCartCount(data.numOfCartItems);
      toast.success(data.message);
    } else {
      toast.error("Error");
    }
    console.log(data.data);
  }

  return (
    <div className="bg-light p-4 my-5">
      <div className="loading position-fixed top-0 end-0 bottom-0 start-0 bg-white">
        <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
      </div>

      <h1>My wish List</h1>
      {WichData?.map((el) => {
        return (
          <div key={el._id} className="row py-2 border-bottom d-flex">
            <div className=" col-md-11 my-4">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img src={el.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-8">
                  <h6>{el.title}</h6>
                  <p className="text-main">{el.price}</p>
                  <div className="d-flex justify-content-between ">
                    <span
                      className=" mx-5 btn btn-outline-danger cursor-pointer"
                      onClick={() => DeleteWichlist(el._id)}
                    >
                      <i class="fa-solid fa-trash-can text-danger "></i>Remove
                    </span>
                    <button
                      onClick={() => addDataToCart(el._id)}
                      className=" btn btn-outline-success my-2 d-block "
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}