import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAllCartData, deleteProduct, updateProductQuantity, setCartCount } =
    useContext(CartContext);

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    try {
      setLoading(true);
      const { data } = await getAllCartData();
      setCartData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct(id) {
    const { data } = await deleteProduct(id);
    setCartData(data.data);
    setCartCount(data.numOfCartItems);
  }

  async function handleUpdateCount(id, count) {
    if (count < 1) return;
    const { data } = await updateProductQuantity(id, count);
    setCartData(data.data);
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <i className="fa-solid fa-spinner fa-spin fa-3x text-success"></i>
      </div>
    );
  }

  if (!cartData || cartData.products.length === 0) {
    return (
      <div className="text-center my-5">
        <h3 className="text-muted">Your cart is empty 🛒</h3>
        <Link to="/" className="btn btn-outline-success mt-3">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light p-4 rounded-3 shadow-sm my-5">
      <h2 className="text-main mb-4 fw-bold">
        <i className="fa-solid fa-cart-shopping me-2"></i>Your Cart
      </h2>

      {cartData.products.map((el) => (
        <div
          key={el._id}
          className="row py-3 border-bottom align-items-center justify-content-between"
        >
          <div className="col-md-7 d-flex align-items-center">
            <img
              src={el.product.imageCover}
              alt={el.product.title}
              className="me-3 rounded"
              style={{ width: "90px", height: "90px", objectFit: "cover" }}
            />
            <div>
              <h6 className="fw-bold">{el.product.title}</h6>
              <p className="text-success fw-semibold mb-1">
                {el.price.toLocaleString()} EGP
              </p>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteProduct(el.product._id)}
              >
                <i className="fa-solid fa-trash-can me-1"></i> Remove
              </button>
            </div>
          </div>

          <div className="col-md-3 text-center">
            <div className="d-inline-flex align-items-center border rounded px-2 py-1">
              <button
                onClick={() => handleUpdateCount(el.product._id, el.count - 1)}
                className="btn btn-sm btn-light"
              >
                -
              </button>
              <span className="mx-3 fw-semibold">{el.count}</span>
              <button
                onClick={() => handleUpdateCount(el.product._id, el.count + 1)}
                className="btn btn-sm btn-light"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4 className="fw-bold text-success">
          Total: {cartData.totalCartPrice.toLocaleString()} EGP
        </h4>
        <Link
          to={`/CheckOut/${cartData._id}`}
          className="btn btn-success px-4 py-2 fw-semibold"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
