import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Home() {

  let { addCart, setCartCount, AddWishList, RemoveWishList, wishList, getUserWishList } = useContext(CartContext)
  let baseUrl = "https://ecommerce.routemisr.com"
  let [productList, setProductList] = useState([])
  let [productListCode, setProductListCode] = useState([])
  let [loading, setLoading] = useState(false)
  let [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    getAllProduct()
    getWishList()
  }, [])

  async function getWishList() {
    let { data } = await getUserWishList()
    setWishlistItems(data?.data?.map(item => item._id) || [])
  }

  async function getAllProduct(page = 1) {
    setLoading(true)
    let { data } = await axios.get(`${baseUrl}/api/v1/products/?page=${page}`)
    setProductList(data.data)
    setProductListCode(data.data)
    setTimeout(() => setLoading(false), 500)
  }

  async function addDataToCart(id) {
    let { data } = await addCart(id)
    if (data.status === 'success') {
      setCartCount(data.numOfCartItems)
      toast.success(data.message)
    } else {
      toast.error("Error")
    }
  }

  async function toggleWishlist(id) {
    if (wishlistItems.includes(id)) {
      await RemoveWishList(id)
      setWishlistItems(prev => prev.filter(item => item !== id))
      toast.error("Removed from wishlist")
    } else {
      await AddWishList(id)
      setWishlistItems(prev => [...prev, id])
      toast.success("Added to wishlist")
    }
  }

  function Search(event) {
    let searchVal = event.target.value
    let myProduct = productListCode.filter((el) =>
      el.title.toLowerCase().includes(searchVal.toLowerCase())
    )
    setProductList(myProduct)
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Toaster />
      <MainSlider />
      <CategorySlider />

      <div className='my-5 position-relative'>
        {loading && (
          <div className='loading position-fixed top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center'>
            <i className='fa-solid fa-spinner fa-spin fa-4x text-success'></i>
          </div>
        )}

        <div className='row g-4 '>
          <h2 className='text-center mb-3'>Search Product</h2>
          <input
            type="text"
            onChange={(e) => Search(e)}
            placeholder='Search'
            className='form-control mb-4'
            id='Search'
          />

          {productList.map((product) => {
            const isWished = wishlistItems.includes(product._id)
            return (
              <div key={product._id} className='col-md-3'>
                <div className="product-card border rounded-3 shadow-sm p-3 text-center h-100 position-relative bg-white cursor-pointer transition-all">
                  <Link to={'/ProductDetails/' + product._id} className="text-decoration-none text-dark">
                    <img
                      src={product.imageCover}
                      className="w-100 mb-3 rounded-3"
                      alt={product.title}
                      style={{ objectFit: "contain", height: "230px" }}
                    />
                    <p className="text-success fw-semibold mb-1">{product.category.name}</p>
                    <h6 className="fw-bold mb-2">{product.title.split(" ").slice(0, 2).join(" ")}</h6>
                    <div className="d-flex justify-content-between align-items-center px-2">
                      <span className="fw-bold">{product.price} EGP</span>
                      <span className="text-warning fw-semibold">
                        <i className="fa-solid fa-star me-1"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>

                  <div className="actions-container mt-3 d-flex justify-content-between align-items-center px-2">
                    <i
                      onClick={() => toggleWishlist(product._id)}
                      className={`fa-solid fa-heart fa-lg cursor-pointer ${isWished ? 'text-danger' : 'text-dark'}`}
                    ></i>
                    <button
                      onClick={() => addDataToCart(product._id)}
                      className="btn btn-success w-75 fw-semibold add-btn"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <nav className='d-flex justify-content-center py-2' aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link">1</a></li>
            <li className="page-item"><a className="page-link">2</a></li>
          </ul>
        </nav>
      </div>
    </>
  )
}
