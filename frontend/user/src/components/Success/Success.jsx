import React from 'react'
import './Success.css'
import { Link } from 'react-router-dom'
function Success({ orderReciept }) {
    return (
        <>
            <div className='container-fluid  success'>
                <div className='row pt-5 mt-5'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card pt-5 successCard'>
                            <div className='text-center'>
                                <i className="fa-solid fa-circle-check" style={{ color: '#0aa31c', fontSize: "90px" }} />

                            </div>
                            <div className='card-body text-center'>
                                <h3><b>Order Placed Successfully</b></h3>
                                <p>Thank you for shopping with us</p>
                                <p>Order ID: {orderReciept._id}</p>
                                <p>Amount: {orderReciept.amountPaid}</p>    
                                <p>Order Date:{orderReciept.orderDate}</p>
                                <p>Transaction ID:{orderReciept.transactionId}</p>
                            </div>
                            <div className='text-center mb-5'>
                                <Link to={'/profile/orders'} className='btn primary'>Go to Orders</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Success