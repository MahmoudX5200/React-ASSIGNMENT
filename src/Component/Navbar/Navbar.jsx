import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/freshcart-logo.svg'
import { Counter } from '../../Context/CounterContext'
import { CartContext } from '../../Context/CartContext'
export default function Navbar({ userData, Logout }) {

  let { cartCount } = useContext(CartContext)

  return (
    <nav className="navbar py-3 fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="home">

          <img src={Logo} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData != null ? <ul className="navbar-nav  me-5 mb-2 mb-lg-0 mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="home">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="Cart">Cart</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="WishList">WishList</Link>
            </li>
              
            <li className="nav-item">
              <Link className="nav-link" to="product">Product</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="category">category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">Brands</Link>
            </li>

          </ul> : ""}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">


            {userData == null ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">register</Link>
                </li>
              </> : <>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="cart">

                    <i class="fa-solid fa-cart-shopping fa-lg text-success"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {cartCount}

                    </span>


                  </Link>
                </li> 
                
                <li className="nav-item">
                  <span onClick={Logout} className="nav-link cursor-pointer" >LOG OUT</span>
                </li>
                
                
                </>}


          </ul>

        </div>
      </div>
    </nav>
  )
}
