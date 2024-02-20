import React from 'react'
import { Link } from 'react-router-dom'
import { BASEURL } from "../../constants/constant.json"
function OrderCard({ order }) {
    return (
        <Link to={`/profile/orders/${order._id}/${order.orderedItems.productId}`}  >
            <div className="card d-flex flex-row align-items-center mb-3">
                <div className='p-3 col-1 '>
                    <img className="card-img-top " src={order ? BASEURL + "/" + order.variants.imagesUrl[0] : ""} alt="Card image cap" style={{ maxHeight: "50px" }} />
                </div>
                <div className="card-body col-11 row ms-2">
                    <h4 className="card-title col-6"><b>{order.productDetails.productName}</b></h4>


                    <p className="card-text  col-2">₹ {order.orderedItems.price * order.orderedItems.quantity}</p>
                    {
                        order.orderedItems.returnStatus === 'Not Requested' ?
                            <div className='col-4'>
                                {
                                    order.orderedItems.deliveryStatus === 'Cancelled' && <p className="text-danger">{order.orderedItems.deliveryStatus}</p>
                                }
                                {
                                    order.orderedItems.deliveryStatus != 'Cancelled' && <p>{order.orderedItems.deliveryStatus === 'Delivered' ? <span>Deliverd on</span> : <span>Expect to delivery on</span>} {order.deliveryDate} </p>
                                }

                            </div> :
                            <div className='col-4'>
                                <p className='text-danger'>Return request {order.orderedItems.returnStatus}</p>
                            </div>
                    }
                </div>

            </div>

        </Link>
    )
}

export default OrderCard