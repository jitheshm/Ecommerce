import React from 'react'
import man from '../../assets/man.png'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
function Sidebar() {
    const dispatch = useDispatch()
    return (
        <>
            <div className='col-md-4 d-none d-md-block'>
                <div className='left-top m-auto mb-4 row p-4'>
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

                        <Link className='fw-bold' to={'/profile/personal'}>Profile Information</Link>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-location-arrow me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <Link className='fw-bold' to={'/profile/address'}>Manage Address</Link>
                    </div>
                    
                    <div className=' pt-3'>
                        <i className="fa-solid fa-box-open me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <Link className='fw-bold' to={'/profile/orders'}>My Orders</Link>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-heart me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <Link className='fw-bold' to={'/profile/wishlist'}>My Wishlist</Link>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-wallet me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                        <Link className='fw-bold' to={'/profile/wallet'}>My Wallet</Link>
                    </div>
                    <div className=' pt-3'>
                        <i className="fa-solid fa-arrow-right-from-bracket me-1" style={{ color: '#15161d', fontSize: "19px" }} />
                        <button className='fw-bold btn' onClick={() => {
                            Cookies.remove('token');
                            dispatch(logout())
                        }}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar