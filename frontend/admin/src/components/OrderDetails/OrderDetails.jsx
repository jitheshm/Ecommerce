import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { BASEURL } from "../../constants/constant.json"

function OrderDetails() {
    const [order, setOrder] = useState({})
    const { orderId, productId } = useParams()
    useEffect(() => {
        instance.get(`admin/order/${orderId}/${productId}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data[0]);
            setOrder(res.data.data[0])

        })

    }, [])

    return (
        <>
            <div className='pt-5 px-2'>
                <div className="col-lg-12 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Order Details</h4>
                            <div className="">
                                <table className=" table " style={{ color: "white" }}>
                                    <thead>
                                        <tr className='bg-success'>
                                            <th style={{ color: "white" }}> Order ID </th>

                                            <th style={{ color: "white" }}> Order Date </th>
                                            <th style={{ color: "white" }}> Order Status </th>
                                            <th style={{ color: "white" }}> Total Amount </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr className='bg-success'>
                                            <td style={{ color: "white" }}> {order._id}</td>

                                            <td style={{ color: "white" }}>{new Date(order.orderDate).toDateString()} </td>
                                            <td style={{ color: "white" }}> {order.orderedItems && order.orderedItems.deliveryStatus} </td>
                                            <td style={{ color: "white" }}> {order.orderedItems && order.orderedItems.totalprice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='container-fluid '>


                                <div className=' address border mt-5 row' >


                                    <div className="card-body row justify-content-between">


                                        <div className=' col-4 col-md-2 col-sm-4 '>
                                            <img className="card-img-top " src={order.variants?BASEURL + "/" + order.variants.imagesUrl[0]:""} alt="Card image cap" style={{ width: "100%" }} />
                                        </div>
                                        <div className='col-4'>
                                            <h4 className="card-title "><b>{order.productDetails && order.productDetails.productName}</b></h4>
                                            <p className="card-text "><b>price: {order.orderedItems && order.orderedItems.salePrice}</b></p>
                                            <p className="card-text "><b>quantity: {order.orderedItems && order.orderedItems.quantity}</b></p>
                                            <p className="card-text "><b>discount: {order.orderedItems && order.orderedItems.discount}</b></p>

                                        </div>
                                        <div className='col-4' style={{lineHeight: "8px"}}>
                                            <h4 className="card-title ">{order.deliveryAddress && order.deliveryAddress.name}</h4>
                                            <p className="card-text">{order.deliveryAddress && order.deliveryAddress.street}</p>
                                            <p className="card-text">{order.deliveryAddress && order.deliveryAddress.locality}</p>
                                            <p className="card-text">{order.deliveryAddress && order.deliveryAddress.city}</p>
                                            <p className="card-text">{order.deliveryAddress && order.deliveryAddress.pincode}</p>   
                                            <p className="card-text">{order.deliveryAddress && order.deliveryAddress.phone}</p>
                                        </div>




                                    </div>





                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OrderDetails