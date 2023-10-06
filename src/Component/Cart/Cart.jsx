import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  let [CartData, setCartData] = useState(null)
  let { getAllCartData, deleteProduct, updateProductQuantity,setCartCount ,} = useContext(CartContext)

  useEffect(() => {
    getAllData()
  }, [])

  async function DeleteProduct(id) {
    let { data } = await deleteProduct(id)
    setCartData(data.data)
    setCartCount(data.numOfCartItems)
  }


  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count)
    console.log(data);
    setCartData(data.data)
  }


  async function getAllData() {
    let {data} = await getAllCartData()
    console.log(data);
    setCartData(data.data)
  }
  return (
    <div className='bg-light p-4'>

      {CartData?.products.map((el) => {
        return <div key={el._id} className='row py-2 border-bottom justify-content-between'>
          <div className='col-md-6'>
            <div className='row align-items-center'>
              <div className='col-md-2'>
                <img src={el.product.imageCover} className='w-100' alt="" />
              </div>
              <div className='col-md-9'>
                <h6>{el.product.title}</h6>
                <p className='text-main'>{el.price}</p>

                <span className='cursor-pointer' onClick={() => DeleteProduct(el.product._id)}>
                  <i class="fa-solid fa-trash-can text-danger"></i>Remove
                </span>

              </div>
            </div>
          </div>
          <div className='col-md-2 '>
            <span onClick={() => updateCount(el.product._id, el.count + 1)} className='btn btn-success btn-sm'>+</span>
            <span className='mx-2'>  {el.count}</span>
            <span onClick={() => updateCount(el.product._id, el.count - 1)} className='btn btn-danger btn-sm'>-</span>
          </div>
        </div>
      })}
      <h3 className='text-main'>Total Pirce :{CartData?.totalCartPrice}</h3>



      <Link to={'/CheckOut/' + CartData?._id} >
        <span className='btn btn-success'>
        Check Out
        </span>
      </Link>
    </div>
  )
}
