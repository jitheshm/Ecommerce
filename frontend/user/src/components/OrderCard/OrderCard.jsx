import React from 'react'
import { Link } from 'react-router-dom'
import { BASEURL } from "../../constants/constant.json"
function OrderCard({ order }) {
    return (
        <Link to={`/profile/orders/${order._id}/${order.orderedItems.productId}`}  >
            <div className="card d-flex flex-row align-items-center mb-3 col-11 m-auto col-md-12">
                <div className='p-3 col-md-1  '>
                    <img className="card-img-top " src={order ? BASEURL + "/" + order.variants.imagesUrl[0] : ""} alt="Card image cap" style={{ maxHeight: "50px" }} />
                </div>
                <div className="card-body col-11 row ms-2">
                    <h5 className="card-title col-md-6">{order.productDetails.productName}</h5>


                    <p className="card-text  col-2 d-none d-md-block">₹ {order.orderedItems.totalprice}</p>
                    {
                        order.orderedItems.returnStatus === 'Not Requested' ?
                            <div className='col-md-4 '>
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
                </div>

            </div>

        </Link>
    )
}

export default OrderCard