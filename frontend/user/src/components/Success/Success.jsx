import React from 'react'
import './Success.css'
function Success() {
    return (
        <>
            <div className='container-fluid  success'>
                <div className='row pt-5 mt-5'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card pt-5 successCard'>
                            <div className='text-center'>
                                <i className="fa-solid fa-circle-check" style={{ color: '#0aa31c',fontSize:"90px" }} />

                            </div>
                            <div className='card-body text-center'>
                                <h3><b>Order Placed Successfully</b></h3> 
                                <p>Thank you for shopping with us</p>
                                <p>Order ID: 123456</p>
                                <p>Amount: $500</p>
                            </div>
                            <div className='text-center mb-5'>
                                <button className='btn primary'>Go to Orders</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Success