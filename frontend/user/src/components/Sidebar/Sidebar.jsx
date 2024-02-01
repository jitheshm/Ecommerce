import React from 'react'
import man from '../../assets/man.png'
function Sidebar() {
    return (
        <>
            <div className='col-md-4'>
                <div className='left-top m-auto mb-5 row p-4'>
                    <div className='dp' style={{ backgroundImage: `url(${man})`, backgroundSize: "cover" }}>
                        <input type="file" name='image' title=' ' style={{ opacity: 0 }} />
                    </div>
                    <div className='col-6 nameContainer ms-4'>
                        <p>Hello</p>
                        <b className='fs-3'>Jithesh</b>
                    </div>
                </div>
                <div className='left-sidebar m-auto mb-5 ps-5 py-5 '>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-user me-4" style={{ color: '#15161d', fontSize: "19px" }} />

                        <a className='fw-bold' href="">Profile Information</a>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-location-arrow me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <a className='fw-bold' href="">Manage Address</a>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-ticket me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <a className='fw-bold' href="">My coupons</a>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-box-open me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <a className='fw-bold' href="">My Orders</a>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-heart me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <a className='fw-bold' href="">My Wishlist</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar