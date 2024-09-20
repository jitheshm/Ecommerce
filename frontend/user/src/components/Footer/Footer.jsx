import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container text-md-left">
        <div className="row text-md-left">
          
          {/* Company Info Section */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Electro</h5>
            <p>
              Electro is your one-stop shop for all electronic gadgets and accessories.
              We provide the best products at unbeatable prices.
            </p>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Products</h5>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>Laptops</a>
            </p>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>Smartphones</a>
            </p>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>Headphones</a>
            </p>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>Accessories</a>
            </p>
          </div>

          {/* Social Media Section */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
            </p>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </p>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </p>
            <p>
              <a href="#" className="text-light" style={{ textDecoration: 'none' }}>
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </p>
          </div>

          {/* Contact Info Section */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
            <p>
              <i className="fas fa-home mr-3"></i> 123 Electro St, Tech City, USA
            </p>
            <p>
              <i className="fas fa-envelope mr-3"></i> info@electro.com
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i> + 1 234 567 88
            </p>
            <p>
              <i className="fas fa-print mr-3"></i> + 1 234 567 89
            </p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Copyright Section */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">
              © {new Date().getFullYear()} Electro, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
