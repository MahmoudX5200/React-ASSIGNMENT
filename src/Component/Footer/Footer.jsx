import React from "react";
import logo from "../../assets/images/freshcart-logo.svg";


export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-3 mt-5 border-top">
      <div className="container">
        <div className="row align-items-start">

          {/* Logo & About */}
          <div className="col-md-4 mb-4">
            {/* <h4 className="fw-bold text-success">FreshCart 🛒</h4> */}
            
            <img src={logo} alt="FreshCart Logo" className="mb-3 " style={{ width: '150px' }} />
            <p className="text-muted">
              Shop all your daily essentials with ease. Fresh products, great prices,
              and fast delivery right to your door!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-decoration-none text-muted">Home</a></li>
              <li><a href="#shop" className="text-decoration-none text-muted">Shop</a></li>
              <li><a href="#offers" className="text-decoration-none text-muted">Offers</a></li>
              <li><a href="#contact" className="text-decoration-none text-muted">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Stay Connected</h6>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="text-success fs-5"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-success fs-5"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-success fs-5"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-success fs-5"><i className="fab fa-tiktok"></i></a>
            </div>
            <p className="text-muted mb-1">
              <i className="fa fa-phone me-2"></i> +20 100 123 4567
            </p>
            <p className="text-muted mb-0">
              <i className="fa fa-envelope me-2"></i> support@freshcart.com
            </p>
          </div>
        </div>

        <hr />
        <div className="text-center text-muted small">
          © {new Date().getFullYear()} <span className="fw-bold text-success">FreshCart</span> — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
