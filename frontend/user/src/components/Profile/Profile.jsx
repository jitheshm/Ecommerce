import React from 'react'
import './Profile.css'
function Profile() {
    return (
        <>

            <div className='container-fluid profile'>
                <div className='row mt-5'>
                    <div className='col-md-4'>
                        <div className='left-top m-auto mb-5'>

                        </div>
                        <div className='left-sidebar m-auto mb-5 ps-5 py-5 '>
                            <div className=' pt-3'>
                                <i className="fa-solid fa-user me-4" style={{color: '#15161d', fontSize:"19px"}} />

                                <a className='fw-bold' href="">Profile Information</a>
                            </div>
                            <div className=' pt-3'>
                            <i className="fa-solid fa-location-arrow me-4" style={{color: '#15161d', fontSize:"19px"}} />
                                <a className='fw-bold' href="">Manage Address</a>
                            </div>
                            <div className=' pt-3'>
                            <i className="fa-solid fa-ticket me-4" style={{color: '#15161d', fontSize:"19px"}} />
                                <a className='fw-bold' href="">My coupons</a>
                            </div>
                            <div className=' pt-3'>
                            <i className="fa-solid fa-heart me-4" style={{color: '#15161d', fontSize:"19px"}} />
                                <a className='fw-bold' href="">My Wishlist</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 p-5  right'>
                        <form className='col-md-10'>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">First Name</label>
                                    <input type="text" className="form-control" id="" placeholder="First Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Last Name</label>
                                    <input type="text" className="form-control" id="" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Email Address</label>
                                <input type="email" className="form-control" id="" placeholder="Email" />
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Age</label>
                                    <input type="number" className="form-control" id="" placeholder="Age" />
                                </div>
                                <div className="form-group col-md-6 px-5">
                                    <label htmlFor="inputPassword4">Gender</label>
                                    <div className='row '>
                                        <div className="form-check col-md-6">
                                            <input className="form-check-input" type="radio" name="gender" id="gender" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check col-md-6">
                                            <input className="form-check-input" type="radio" name="gender" id="gender" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Female
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="">Phone</label>
                                    <input type="number" className="form-control" id="" />
                                </div>

                            </div>

                            <button type="button" className="btn primary">Save</button>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile