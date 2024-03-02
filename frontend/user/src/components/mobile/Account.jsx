import React from 'react'
import man from '../../assets/man.png'
import { Link } from 'react-router-dom'
import { logout } from '../../features/user/userSlice';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
function Account() {
    const dispatch = useDispatch()
    return (

        <div style={{ backgroundColor: "white", height: "100vh" }}>
            <div className='left-top m-auto mb-4 row px-5 py-4 col-12' style={{ width: "100%", height: "fit-content" }}>
                <div className='dp' style={{ backgroundImage: `url(${man})`, backgroundSize: "cover" }}>

                </div>
                <div className='col-6 nameContainer ms-4'>
                    <p>Hello</p>
                    <b className='fs-3'>Jithesh</b>
                </div>

            </div>
            <div className='container-fluid'>
                <div className='mt-5 row justify-content-between'>
                    <Link to={'/profile/orders'} className='card col-5 px-3'>
                        <h4>
                            <i className="fa-solid fa-box-open me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                            <b>Orders</b>
                        </h4>
                    </Link>
                    <Link to={'/profile/personal'} className='card col-5 px-3'>
                        <h4>
                            <i className="fa-solid fa-user me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                            <b>Profile</b>
                        </h4>
                    </Link>

                </div>
                <div className='mt-5 row justify-content-between'>
                    <Link to={'/profile/address'} className='card col-5 px-3'>
                        <h4>
                            <i className="fa-solid fa-location-arrow me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                            <b>Address</b>
                        </h4>
                    </Link>
                    <Link to={'/profile/wallet'} className='card col-5 px-3'>
                        <h4>
                            <i className="fa-solid fa-wallet me-4" style={{ color: '#15161d', fontSize: "19px" }} />
                            <b>Wallet</b>
                        </h4>
                    </Link>

                </div>
                <div className='mt-5 row justify-content-between'>
                    <Link className='card col-11 px-3 text-center'>
                        <h4>
                            <i className="fa-solid fa-arrow-right-from-bracket me-1" style={{ color: '#15161d', fontSize: "19px" }} />
                            <button className='fw-bold btn' onClick={() => {
                                Cookies.remove('token');
                                dispatch(logout())
                            }}>Logout</button>
                        </h4>
                    </Link>


                </div>
            </div>
        </div>


    )
}

export default Account