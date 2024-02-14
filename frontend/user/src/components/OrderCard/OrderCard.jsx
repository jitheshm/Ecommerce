import React from 'react'
import { Link } from 'react-router-dom'
import { BASEURL } from "../../constants/constant.json"
function OrderCard({ order }) {
    return (
        <Link to={`/profile/orders/${order._id}`}  >
            <div className="card d-flex flex-row align-items-center mb-3">
                <div className='p-3 col-1 '>
                    <img className="card-img-top " src={order ? BASEURL + "/" + order.variants.imagesUrl[0] : ""} alt="Card image cap" style={{ maxHeight: "50px" }} />
                </div>
                <div className="card-body col-11 row ms-2">
                    <h4 className="card-title col-6"><b>{order.productDetails.productName}</b></h4>


                    <p className="card-text  col-2">₹ {order.orderedItems.price * order.orderedItems.quantity}</p>
                    <div className='col-4'>
                        {
                            order.orderStatus === 'Cancelled' && <p className="text-danger">{order.orderStatus}</p>
                        }
                        {
                            order.orderStatus != 'Cancelled' && <p>{order.orderStatus === 'Delivered' ? <span>Deliverd on</span> : <span>Expect to delivery on</span>} {order.deliveryDate} </p>
                        }

                    </div>
                </div>

            </div>

        </Link>
    )
}

export default OrderCard