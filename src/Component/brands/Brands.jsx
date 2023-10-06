import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $, { data } from 'jquery'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import Product from '../Product/Product'

export default function Brands() {


  let { AddWishList,addCart ,setCartCount} = useContext(CartContext)
  let baseUrl = "https://ecommerce.routemisr.com"
  
  let [productList, setProductList] = useState([])
  let [productListCode, setProductListCode] = useState([])
  let { id } = useParams()

  useEffect(() => {
    let link = document.querySelectorAll(".page-item a")
    link.forEach((el) => {
      el.addEventListener("click", function (e) {
        console.log(e.target.innerText);
        let page = e.target.innerText
        getAllBrands(page)

      })
    })

    getAllBrands()
  }, [])
  async function getAllBrands(page = 1) {
    $(".loading").fadeIn()
    let { data } = await axios.get(`${baseUrl}/api/v1/brands/?page=${page}`)
    setProductList(data.data)
    setProductListCode(data.data)
    console.log(data.data);
    $(".loading").fadeOut(1000)
  }

  async function addDataToCart(id) {
    let { data } = await addCart(id)
    if (data.status == 'success') {
      setCartCount(data.numOfCartItems)
      toast.success(data.message)
    }else{
      toast.error("Error")
    }
    console.log(data.data);
  }
function OpenModal(product)
{
  

}
  return (
    <>
    <Helmet>
    <title>Home</title>
  </Helmet>
    <Toaster />
    <div className='my-5 position-relative'>
      <div className='loading position-fixed top-0 end-0 bottom-0 start-0 bg-white'>
        <i className='fa-solid fa-spinner fa-spin fa-5x'></i>
      </div>
      <div className='row g-3 '>
        <h1 className='text-center text-success font1'>All Brands</h1>
        {productList.map((product) => {
          OpenModal(product._id)
          return <div key={product._id} className='col-md-3' >
              
                
             <div className='product cursor-pointer border border-1 ' data-bs-toggle="modal" data-bs-target= {OpenModal(product._id)} >
                <img src={product.image} className='w-100' alt="" />
                <p className='text-main text-center'>{product.name}</p>


            </div>
            <div class="modal fade" id={OpenModal(product._id)} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">brand {product.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex justify-content-between align-items-center ">
     <div className='row'>
        
         <div className='col-md-6 mt-5'><h1 className='text-main text-center'>{product.name}</h1></div>

        <div className='col-md-6'> <img src={product.image} className='w-100' alt="" /> </div>


     </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

            
               
                    
          </div>
        })}
      </div>

      <nav className='d-flex justify-content-center py-2' aria-label="Page navigation example">
        <ul className="pagination ">

          <li className="page-item"><a className="page-link" >1</a></li>
          <li className="page-item"><a className="page-link" >2</a></li>

        </ul>
      </nav>


    </div>



    </>
  )
}
