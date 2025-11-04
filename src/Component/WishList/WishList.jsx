import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function WishList() {
  const [wishData, setWishData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    addCart,
    setCartCount,
    deleteWichlist,
    getAllWichhtData,
  } = useContext(CartContext);

  // ✅ تحميل الـ Wishlist أول ما الصفحة تفتح
  useEffect(() => {
    getWishlist();
  }, []);

  async function getWishlist() {
    try {
      setIsLoading(true);
      const { data } = await getAllWichhtData();
      setWishData(data.data);
    } catch {
      toast.error("Error fetching wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await deleteWichlist(id);
      if (data.status === "success") {
        toast.success("Removed from wishlist ");
        // ✅ شيل المنتج محلياً من الواجهة
        setWishData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch {
      toast.error("Error removing item");
    }
  }

  async function handleAddToCart(id) {
    try {
      const { data } = await addCart(id);
      if (data.status === "success") {
        setCartCount(data.numOfCartItems);
        toast.success("Added to cart successfully 🛒");
      } else {
        toast.error("Error adding to cart");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Toaster />
      <div className="container my-5 position-relative">

        {/* ✅ Loading Overlay */}
        {isLoading && (
          <div
            className="position-fixed top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center"
            style={{ zIndex: 9999 }}
          >
            <i className="fa-solid fa-spinner fa-spin fa-5x text-success"></i>
          </div>
        )}

        <h2 className="text-center fw-bold text-main mb-4">
          My Wishlist 
        </h2>

        {/* ✅ المحتوى */}
        <AnimatePresence>
          {!isLoading && (
            <>
              {wishData?.length > 0 ? (
                <motion.div
                  className="row g-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {wishData.map((el) => (
                    <motion.div
                      key={el._id}
                      className="col-md-3"
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="card shadow-sm border-0 rounded-4 h-100 text-center p-3 position-relative bg-white">
                        <motion.img
                          src={el.imageCover}
                          alt={el.title}
                          className="card-img-top mb-3 rounded-3"
                          style={{
                            objectFit: "contain",
                            height: "220px",
                            backgroundColor: "#f9f9f9",
                          }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="card-body">
                          <h6 className="fw-bold mb-2">{el.title}</h6>
                          <p className="text-success fw-semibold mb-3">
                            {el.price} EGP
                          </p>

                          <div className="d-flex justify-content-between">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(el._id)}
                              className="btn btn-outline-danger flex-grow-1 me-2"
                            >
                              <i className="fa-solid fa-trash-can me-1"></i>
                              Remove
                            </motion.button>

                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleAddToCart(el._id)}
                              className="btn btn-success flex-grow-1"
                            >
                              <i className="fa-solid fa-cart-plus me-1"></i>
                              Add to Cart
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fa-solid fa-heart-crack fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">Your wishlist is empty</h5>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
