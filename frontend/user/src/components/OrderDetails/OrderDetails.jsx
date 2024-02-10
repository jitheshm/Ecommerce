import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { BASEURL } from "../../constants/constant.json"

function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState({})

    const { orderId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        instance.get(`/user/order/${orderId}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            setOrderDetails(res.data.data[0])
        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())
            }
        })
    }, [])

    return (
        <>
            <div className='col-md-7 '>
                <div className='px-5 pt-5 address border mt-3 row' style={{ height: "245px" }}>
                    <div className='col-6'>
                        <h4><b>Delivery Address</b></h4>
                        <div>
                            <p><b>{orderDetails.deliveryAddress ? orderDetails.deliveryAddress.name : ''}</b></p>

                        </div>
                        <div style={{ lineHeight: "11px" }}>

                            <p>{orderDetails.deliveryAddress ? orderDetails.deliveryAddress.street : ''}</p>
                            <p>{orderDetails.deliveryAddress ? orderDetails.deliveryAddress.locality : ''}</p>
                            <p>{orderDetails.deliveryAddress ? orderDetails.deliveryAddress.city : ''}</p>
                            <p>{orderDetails.deliveryAddress ? orderDetails.deliveryAddress.state : ''}</p>
                            <p>{orderDetails.deliveryAddress ? orderDetails.deliveryAddress.pincode : ''}</p>
                        </div>
                        <div>
                            <p><b>phone</b> {orderDetails.deliveryAddress ? orderDetails.deliveryAddress.phone : ''}</p>

                        </div>
                    </div>
                    <div className='col-6 d-flex align-items-center  justify-content-center'>
                        <button className='btn primary'>Download invoice</button>
                    </div>


                </div>
                <div className='px-5 py-5 address border mt-3 row'>
                    <div className='col-4'>
                        <div className="card d-flex flex-row mb-3 mt-3" style={{ border: "none" }}>
                            <div className=' col-3 '>
                                <img className="card-img-top " src={orderDetails && orderDetails.variants ? BASEURL + "/" + orderDetails.variants.imagesUrl[0] : ""} alt="Card image cap" />
                            </div>
                            <div className="card-body  col-9 ms-4 pt-0 ">
                                <h4 className="card-title "><b>{orderDetails && orderDetails.productDetails ? orderDetails.productDetails.productName : ""}</b></h4>


                                <p className="card-text row mt-4"><h4 className=''><b>₹ {orderDetails && orderDetails.variants ? orderDetails.variants.salePrice : ""}</b></h4></p>
                            </div>

                        </div>
                    </div>
                    <div className='col-8 d-flex align-items-center justify-content-center'>


                        <div className="row col-12">
                            <div className="col-lg-12">
                                <div className="horizontal-timeline">
                                    <ul className="list-inline items d-flex ">
                                        <li className="list-inline-item items-list col-3" style={{ borderTop: "2px #26A541 solid" }}>
                                            <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#26A541', top: 0, marginTop: '-5px', left: 0 }} />

                                            <p className="py-1  rounded" style={{ color: "#26A541" }}>Ordered</p>
                                        </li>
                                        <li className="list-inline-item items-list col-3" style={orderDetails.orderStatus === "Shipped" || orderDetails.orderStatus === "Out for delivery" || orderDetails.orderStatus === "Delivered" ? { borderTop: "2px #26A541 solid" } : { borderTop: "2px #ddd solid" }}>

                                            {
                                                orderDetails.orderStatus === "Shipped" || orderDetails.orderStatus === "Out for delivery" || orderDetails.orderStatus === "Delivered" ?
                                                    <>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#26A541', top: 0, marginTop: '-5px', left: 0 }} />
                                                        <p className="py-1 rounded " style={{ color: "#26A541" }}>Shipped</p>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#ddd', top: 0, marginTop: '-5px', left: 0 }} />

                                                    </>
                                            }

                                        </li>
                                        <li className="list-inline-item items-list  col-3" style={orderDetails.orderStatus === "Out for delivery" || orderDetails.orderStatus === "Delivered" ? { borderTop: "2px #26A541 solid" } : { borderTop: "2px #ddd solid" }}>
                                            {
                                                orderDetails.orderStatus === "Out for delivery" || orderDetails.orderStatus === "Delivered" ?
                                                    <>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#26A541', top: 0, marginTop: '-5px', left: 0 }} />
                                                        <p className="py-1  rounded " style={{ color: "#26A541" }}>Out for delivery</p>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#ddd', top: 0, marginTop: '-5px', left: 0 }} />

                                                    </>
                                            }
                                        </li>
                                        <li className="list-inline-item items-list text-end col-3" style={orderDetails.orderStatus === "Delivered" ? { borderTop: "2px #26A541 solid", marginRight: 8} : { borderTop: "2px #ddd solid", marginRight: 8}}>
                                            {
                                                orderDetails.orderStatus === "Delivered" ?
                                                    <>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#26A541', top: 0, marginTop: '-5px', left: 0 }} />
                                                        <p className="py-1  rounded " style={{ color: "#26A541" }}>Delivered</p>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#ddd', top: 0, marginTop: '-5px', left: 0 }} />

                                                    </>
                                            }
                                        </li>
                                    </ul>
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