import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { BASEURL } from "../../constants/constant.json"
import moment from 'moment'

function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState({})
    const [toogle, setToogle] = useState(false)

    const { orderId, productId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        instance.get(`/user/order/${orderId}/${productId}`, {
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
    }, [toogle])

   
    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this order?')) {
            instance.patch(`/user/cancelorder/${orderId}/${productId}`, {
                orderStatus: "Cancelled"
            }, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data);
                setToogle(!toogle)
                //setOrderDetails(res.data.data[0])
            }).catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())
                }
            })
        }
    }

    const handleReturn = () => {
        if (confirm('Are you sure you want to return this order?')) {
            instance.patch(`/user/returnproduct/${orderId}/${productId}`, {}, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data);
                setToogle(!toogle)
                //setOrderDetails(res.data.data[0])
            }).catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())
                }
            })
        }
    }
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
                    <div className='col-6 d-flex align-items-center flex-column justify-content-center'>
                        {
                            orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus != "Cancelled" &&
                            <button className='btn primary '>Download invoice</button>
                        }
                        {
                            orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus != "Cancelled" && orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus != "Delivered" &&
                            <button className='btn btn-danger mt-4' onClick={handleCancel}>Cancel Order</button>
                        }
                        {
                            orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" && orderDetails.orderedItems.returnStatus === 'Not Requested' && moment(orderDetails.deliveryDate, 'DD-MM-YYYY').add(7, 'days').isAfter(moment()) &&

                            <button className='btn btn-danger mt-4' onClick={handleReturn}>Return</button>
                        }

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
                                        <li className="list-inline-item items-list col-2" style={{ borderTop: "2px #26A541 solid" }}>
                                            <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#26A541', top: 0, marginTop: '-5px', left: 0 }} />

                                            <p className="py-1  rounded" style={{ color: "#26A541" }}>Ordered</p>
                                        </li>
                                        {
                                            orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Cancelled" &&
                                            <li className="list-inline-item items-list col-2" >


                                                <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#e12222', top: 0, marginTop: '-5px', left: 0 }} />
                                                <p className="py-1 rounded " style={{ color: '#e12222' }}>Cancelled</p>



                                            </li>
                                        }
                                        {
                                            orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus != "Cancelled" &&
                                            <>
                                                <li className="list-inline-item items-list col-2" style={orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Out for delivery" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Shipped" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ? { borderTop: "2px #26A541 solid" } : { borderTop: "2px #ddd solid" }}>




                                                    {


                                                        orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Shipped" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Out for delivery" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ?
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
                                                <li className="list-inline-item items-list  col-2" style={orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Out for delivery" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ? { borderTop: "2px #26A541 solid" } : { borderTop: "2px #ddd solid" }}>
                                                    {
                                                        orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Out for delivery" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ?
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
                                                <li className="list-inline-item items-list text-end col-2" style={orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ? { borderTop: "2px #26A541 solid", } : { borderTop: "2px #ddd solid", marginRight: 8 }}>
                                                    {
                                                        orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ?
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
                                                {
                                                    orderDetails.orderedItems && orderDetails.orderedItems.returnStatus != 'Not Requested' &&
                                                    <li className="list-inline-item items-list text-end col-2" style={{ borderTop: "2px #e12222 solid", marginRight: 8 }}>


                                                        <>
                                                            <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#e12222', top: 0, marginTop: '-5px', left: 0 }} />
                                                            <p className="py-1  rounded " style={{ color: '#e12222' }}>Returned</p>
                                                        </>


                                                    </li>
                                                }
                                            </>
                                        }
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