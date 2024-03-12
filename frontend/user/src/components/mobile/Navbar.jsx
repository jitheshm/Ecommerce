import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <div className='col-12 d-block d-md-none' style={{ position: "fixed", bottom: 0, left: 0, zIndex: 10, backgroundColor: "#15161D" }}>
                {/* container */}
                <div className="container-fluid">
                    {/* row */}
                    <div className="row col-12">


                        <div className="col-12  ">
                            <div className="header-mobile-ctn d-flex col-12 justify-content-between">

                                <div className='col-2 d-flex justify-content-center'>
                                    <Link to={'/'}>
                                        <i className="fa-solid fa-user" style={{ color: '#ffffff' }} />

                                        <span>Home</span>
                                        {/* <div className="qty">2</div>   */}
                                    </Link>

                                </div>

                                <div className='col-2 d-flex justify-content-center'>
                                    <Link to={'/profile'}>
                                        <i className="fa-solid fa-user" style={{ color: '#ffffff' }} />

                                        <span>Account</span>
                                        {/* <div className="qty">2</div>   */}
                                    </Link>

                                </div>

                                <div className='col-2 d-flex justify-content-center'>
                                    <Link to={'/categories'}>
                                        <i className="fa-solid fa-list" style={{ color: '#ffffff' }} />

                                        <span>Categories</span>
                                        {/* <div className="qty">2</div>   */}
                                    </Link>

                                </div>
                                {/* Wishlist */}
                                <div className='col-2 d-flex justify-content-center'>
                                    <Link to={'/profile/wishlist'}>
                                        <i className="fa-regular fa-heart" style={{ color: '#ffffff' }} />

                                        <span>Wishlist</span>
                                        {/* <div className="qty">2</div>   */}
                                    </Link>

                                </div>
                                {/* /Wishlist */}
                                {/* Cart */}
                                <div className='col-2 d-flex justify-content-center'>
                                    <Link to={'/cart'}>
                                        <i className="fa-solid fa-cart-shopping" style={{ color: '#ffffff' }} />
                                        <span> Cart</span>
                                        {/* <div className="qty">2</div> */}
                                    </Link>
                                </div>
                                {/* /Cart */}


                            </div>
                        </div>
                        {/* /ACCOUNT */}
                    </div>
                    {/* row */}
                </div>
                {/* container */}
            </div>
            <div className='d-md-none' style={{height:"69px"}}>   

            </div>
        </>
    )
}

export default Navbar