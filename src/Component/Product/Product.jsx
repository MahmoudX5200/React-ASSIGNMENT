import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Product() {

  const { AddWishList, addCart, setCartCount } = useContext(CartContext)
  const baseUrl = "https://ecommerce.routemisr.com"

  const [productList, setProductList] = useState([])
  const [productListCode, setProductListCode] = useState([])
  const [wishlistIds, setWishlistIds] = useState([]) // ✅ حالة جديدة للـ wishlist
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getAllProduct()
    getWishlist() // ✅ نجيب الـ wishlist عند التحميل الأول
  }, [])

  async function getAllProduct(page = 1) {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`${baseUrl}/api/v1/products/?page=${page}`)
      setProductList(data.data)
      setProductListCode(data.data)
      setCurrentPage(page)
    } catch (error) {
      toast.error("Error fetching products")
    } finally {
      setIsLoading(false)
    }
  }

  async function getWishlist() {
    try {
      const token = localStorage.getItem("userToken")
      const { data } = await axios.get(`${baseUrl}/api/v1/wishlist`, {
        headers: { token }
      })
      const ids = data.data.map(item => item._id)
      setWishlistIds(ids)
    } catch (error) {
      console.log(error)
    }
  }

  async function addDataToCart(id) {
    try {
      const { data } = await addCart(id)
      if (data.status === 'success') {
        setCartCount(data.numOfCartItems)
        toast.success(data.message)
      } else {
        toast.error("Error adding to cart")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  async function addDataToWish(id) {
    try {
      const { data } = await AddWishList(id)
      if (data.status === 'success') {
        toast.success(data.message)
        // ✅ لو المنتج كان في الـ wishlist شيله، لو مش موجود ضيفه
        setWishlistIds(prev =>
          prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
        )
      } else {
        toast.error("Error updating wishlist")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  function handleSearch(e) {
    const searchVal = e.target.value.toLowerCase()
    const filtered = productListCode.filter((el) =>
      el.title.toLowerCase().includes(searchVal)
    )
    setProductList(filtered)
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Toaster />

      <div className="container my-5 position-relative">

        {isLoading && (
          <div className="loading position-fixed top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-spin fa-5x text-success"></i>
          </div>
        )}

        <div className="row g-4">
          <h2 className="text-center mb-3 fw-bold text-main">All Products</h2>
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            className="form-control mb-4 shadow-sm"
            id="Search"
          />

          {productList.length > 0 ? (
            productList.map((product) => (
              <div key={product._id} className="col-md-3">
                <div className="product-card border rounded-3 shadow-sm p-3 text-center h-100 bg-white position-relative">
                  <Link
                    to={`/ProductDetails/${product._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <img
                      src={product.imageCover}
                      className="w-100 mb-3 rounded-3"
                      alt={product.title}
                      style={{ objectFit: "contain", height: "230px" }}
                    />
                    <p className="text-success fw-semibold mb-1">
                      {product.category.name}
                    </p>
                    <h6 className="fw-bold mb-2">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center px-2">
                      <span className="fw-bold">{product.price} EGP</span>
                      <span className="text-warning fw-semibold">
                        <i className="fa-solid fa-star me-1"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>

                  <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                    <i
                      onClick={() => addDataToWish(product._id)}
                      className={`fa-solid fa-heart fa-lg cursor-pointer ${
                        wishlistIds.includes(product._id)
                          ? "text-danger"
                          : "text-dark"
                      }`}
                    ></i>

                    <button
                      onClick={() => addDataToCart(product._id)}
                      className="btn btn-success w-75 fw-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center text-muted">No products found</h4>
          )}
        </div>

        <nav className="d-flex justify-content-center py-3">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => getAllProduct(1)}>
                1
              </button>
            </li>
            <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => getAllProduct(2)}>
                2
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
