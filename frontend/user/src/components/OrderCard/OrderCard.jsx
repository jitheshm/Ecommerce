import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASEURL } from "../../constants/constant"
import moment from 'moment'
import ReturnRequestForm from '../ReturnRequestForm/ReturnRequestForm';
function OrderCard({ order, toogle, setToogle }) {
    const [requestForm, setrequestForm] = useState(false)
    const handleReturn = () => {
        if (confirm('Are you sure you want to return this product?')) {
            setrequestForm(true)
        }


    }
    return (
        <div>
            <div className="card d-flex flex-row align-items-center mb-3 col-11 m-auto col-md-12">
                <div className='p-3 col-md-1  '>
                    <img className="card-img-top " src={order ? BASEURL + "/" + order.variants.imagesUrl[0] : ""} alt="Card image cap" style={{ maxHeight: "50px" }} />
                </div>
                <div className="card-body col-11 row ms-2">
                    <Link to={`/profile/orders/${order._id}/${order.orderedItems.productId}`} className='row col-10' >
                        <h5 className="card-title col-md-4">{order.productDetails.productName}</h5>


                        <p className="card-text  col-2 d-none d-md-block">₹ {order.orderedItems.totalprice}</p>
                        {
                            order.orderedItems.returnStatus === 'Not Requested' ?
                                <div className='col-md-6 '>
                                    {
                                        order.orderedItems.deliveryStatus === 'Cancelled' && <p className="text-danger">{order.orderedItems.deliveryStatus}</p>
                                    }
                                    {
                                        order.orderedItems.deliveryStatus === 'pending' && <p className="text-danger">Payment failed</p>
                                    }
                                    {
                                        order.orderedItems.deliveryStatus != 'Cancelled' && order.orderedItems.deliveryStatus != 'pending' && <p>{order.orderedItems.deliveryStatus === 'Delivered' ? <span>Deliverd on</span> : <span>Expect to delivery on</span>} {order.deliveryDate} </p>
                                    }

                                </div> :
                                <div className='col-4 d-none d-md-block'>
                                    <p className='text-danger'>Return request {order.orderedItems.returnStatus}</p>
                                </div>
                        }
                    </Link>
                    <div className='col-2 d-flex gap-5 d-none d-lg-flex'>                  

                        {
                            order.orderedItems && order.orderedItems.deliveryStatus === "Delivered" &&
                            <Link to={`/order/invoice/${order._id}`}>
                                <i className="fa-solid fa-receipt" style={{ fontSize: "20px", color: "#4f9937" }} />
                            </Link>
                        }

                        {
                            order.orderedItems && order.orderedItems.deliveryStatus === "Delivered" && order.orderedItems.returnStatus === 'Not Requested' && moment(order.deliveryDate, 'DD-MM-YYYY').add(7, 'days').isAfter(moment()) &&

                            // <button className='btn btn-danger mt-4' onClick={handleReturn}>Return</button>
                            <i className="fa-solid fa-truck-fast" style={{ fontSize: "20px", color: "#bd3e3e" }} onClick={handleReturn} />
                        }




                    </div>
                </div>

            </div>
            {
                requestForm &&
                <div className='px-4 mb-4'>
                    <ReturnRequestForm orderId={order._id} productId={order.orderedItems.productId} toogle={toogle} setToogle={setToogle} setrequestForm={setrequestForm} />
                </div>
            }
        </div>


    )
}

export default OrderCard