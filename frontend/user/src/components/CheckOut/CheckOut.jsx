import React from 'react'
import AddressForm from '../AddressForm/AddressForm'
import AddressCard from '../AddressCard/AddressCard'
import './CheckOut.css'
import PriceDetails from '../PriceDetails/PriceDetails'
function CheckOut() {
    return (
        <div className='container-fluid pt-5 checkOut'>
            <div className='row ms-4 checkOutContent'>
                <div className='col-md-7 '>
                    <div className=' p-5  right mb-5'>
                        <h4><b>Delivery Address</b></h4>
                        <div className='row'>
                            <input className="form-check-input col-1 mt-5" type="radio" name="type" id="" defaultChecked />
                            <div className='col-10'>
                                <AddressCard />
                            </div>
                        </div>
                        <div className='row'>
                            <input className="form-check-input col-1 mt-5" type="radio" name="type" id="" defaultChecked />
                            <div className='col-10'>
                                <AddressCard />
                            </div>
                        </div>
                        <div className='my-5'>
                            <button className='btn primary '>Add new address</button>
                        </div>

                        {/* <AddressForm /> */}



                    </div>

                    <div className=' p-5 mb-5  right'>
                        <h4><b>Payment Options</b></h4>

                        <div className='row py-4 justify-content-center gap-5'>
                            <div className="card col-3" >

                                <div className="card-body text-center py-4">
                                    <i className="fa-solid fa-wallet" style={{ color: '#15161d', fontSize: "39px" }} />
                                    <h5><b>Razorpay</b></h5>

                                </div>
                            </div>

                            <div className="card col-3" >

                                <div className="card-body text-center py-4">
                                    <i className="fa-solid fa-money-bill-1" style={{ color: '#15161d', fontSize: "39px" }} />
                                    <h5><b>Cash on delivery</b></h5>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <PriceDetails />
            </div>
        </div>
    )
}

export default CheckOut