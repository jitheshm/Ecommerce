import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { BASEURL } from "../../constants/constant"
import moment from 'moment'
import ReturnRequestForm from '../ReturnRequestForm/ReturnRequestForm';


function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState({})
    const [toogle, setToogle] = useState(false)
    const [requestForm, setrequestForm] = useState(false)
    const [stockError, setStockError] = useState(true)

    const { orderId, productId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        instance.get(`/user/orders/${orderId}/products/${productId}`, {
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

    useEffect(() => {
        if (orderDetails.orderedItems) {
            instance.get(`user/checkstockavailable?varientId=${orderDetails.orderedItems.productId}&&quantity=${orderDetails.orderedItems.quantity}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    setStockError(false)
                } else {
                    setStockError(true)
                }
            })
        }
    }, [orderDetails])


    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this order?')) {
            instance.patch(`/user/orders/${orderId}/products/${productId}/cancel`, {
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
        if (confirm('Are you sure you want to return this product?')) {
            setrequestForm(true)
        }


    }
    const handleRepay = () => {
        // instance.post('/user/orderrepayment',{
        //     orderId: orderId,
        //     amountPaid: orderDetails.amountPaid

        // },{
        //     headers: {
        //         Authorization: Cookies.get('token')
        //     }
        // }).then((res) => {
        //     console.log(res);
        //     if (res.data.success) {
        //         initiatePayment(res.data.data, res.data.data.total)
        //     }

        // })
    }


    return (
        <>
            <div className='col-md-7 '>
                {
                    !requestForm &&

                    <>
                        <div className='px-5 pt-5 address border mt-3  row' style={{ height: "245px" }}>
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
                                    orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" &&
                                    <Link to={`/order/invoice/${orderId}`} className='btn primary '>Invoice</Link>
                                }
                                {
                                    orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus != "Cancelled" && orderDetails.orderedItems.deliveryStatus != "pending" && orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus != "Delivered" &&
                                    <button className='btn btn-danger mt-4' onClick={handleCancel}>Cancel Order</button>
                                }
                                {
                                    orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" && orderDetails.orderedItems.returnStatus === 'Not Requested' && moment(orderDetails.deliveryDate, 'DD-MM-YYYY').add(7, 'days').isAfter(moment()) &&

                                    <button className='btn btn-danger mt-4' onClick={handleReturn}>Return</button>
                                }

                                {
                                    !stockError && orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "pending" && moment(orderDetails.orderDate).add(1, 'days').isAfter(moment()) &&

                                    <Link to={`/order/repayment/${orderId}`} className='btn btn-danger mt-4' >Repay</Link>
                                }

                            </div>



                        </div>
                        <div className='px-5 py-5 address border mt-3 mb-5 row'>
                            <div className='col-md-12'>
                                <div className="card d-flex flex-row mb-3 mt-3" style={{ border: "none" }}>
                                    <div className=' col-4 col-md-2 col-sm-4 '>
                                        <img className="card-img-top " src={orderDetails && orderDetails.variants ? BASEURL + "/" + orderDetails.variants.imagesUrl[0] : ""} alt="Card image cap" />
                                    </div>
                                    <div className="card-body  col-9 ms-4 pt-0 ">
                                        <h4 className="card-title "><b>{orderDetails && orderDetails.productDetails ? orderDetails.productDetails.productName : ""}</b></h4>


                                        <p className="card-text row mt-4"><h4 className=''><b>₹ {orderDetails && orderDetails.orderedItems ? orderDetails.orderedItems.totalprice : ""} </b> </h4>
                                            <b style={{ color: "green" }}>offers applied</b></p>
                                        {
                                            stockError && <p className="card-text row mt-4 text-danger">
                                                out of stock</p>
                                        }
                                    </div>


                                </div>
                            </div>
                            <div className='col-md-8 mt-5  d-flex align-items-center justify-content-center'>


                                <div className="row col-12">
                                    <div className="col-lg-12">
                                        <div className="horizontal-timeline">
                                            {
                                                orderDetails.orderedItems && (orderDetails.orderedItems.returnStatus === 'Confirmed' || orderDetails.orderedItems.returnStatus === 'Refund') &&
                                                <ul className="list-inline items d-flex ">
                                                    <li className="list-inline-item items-list col-4" style={{ borderTop: "2px #d36518 solid" }}>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#d36518', top: 0, marginTop: '-5px', left: 0 }} />

                                                        <p className="py-1  rounded" style={{ color: "#d36518" }}>confirmed</p>
                                                    </li>

                                                    <li className="list-inline-item items-list col-3" style={orderDetails.orderedItems && orderDetails.orderedItems.returnStatus === "Return" || orderDetails.orderedItems && orderDetails.orderedItems.returnStatus === "Refund" ? { borderTop: "2px #d36518 solid" } : { borderTop: "2px #ddd solid" }}>




                                                        {


                                                            orderDetails.orderedItems && orderDetails.orderedItems.returnStatus === "Return" || orderDetails.orderedItems && orderDetails.orderedItems.returnStatus === "Refund" ?
                                                                <>
                                                                    <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#d36518', top: 0, marginTop: '-5px', left: 0 }} />
                                                                    <p className="py-1 rounded " style={{ color: "#d36518" }}>Return</p>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#ddd', top: 0, marginTop: '-5px', left: 0 }} />

                                                                </>
                                                        }

                                                    </li>

                                                    <li className="list-inline-item items-list col-3" style={orderDetails.orderedItems && orderDetails.orderedItems && orderDetails.orderedItems.returnStatus === "Refund" ? { borderTop: "2px #d36518 solid" } : { borderTop: "2px #ddd solid" }}>




                                                        {


                                                            orderDetails.orderedItems && orderDetails.orderedItems.returnStatus === "Refund" ?
                                                                <>
                                                                    <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#d36518', top: 0, marginTop: '-5px', left: 0 }} />
                                                                    <p className="py-1 rounded " style={{ color: "#d36518" }}>Refund</p>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#ddd', top: 0, marginTop: '-5px', left: 0 }} />

                                                                </>
                                                        }

                                                    </li>

                                                </ul>
                                            }
                                            {
                                                orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === 'pending' && <p className='text-danger'>Payment failed</p>
                                            }
                                            {orderDetails.orderedItems && (orderDetails.orderedItems.returnStatus != 'Confirmed' && orderDetails.orderedItems.deliveryStatus != 'pending' && orderDetails.orderedItems.returnStatus != 'Refund') &&
                                                <ul className="list-inline items d-flex ">
                                                    <li className="list-inline-item items-list col-3" style={{ borderTop: "2px #26A541 solid" }}>
                                                        <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#26A541', top: 0, marginTop: '-5px', left: 0 }} />

                                                        <p className="py-1  rounded" style={{ color: "#26A541" }}>Ordered</p>
                                                    </li>
                                                    {
                                                        orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Cancelled" &&
                                                        <li className="list-inline-item items-list col-3" >


                                                            <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#e12222', top: 0, marginTop: '-5px', left: 0 }} />
                                                            <p className="py-1 rounded " style={{ color: '#e12222' }}>Cancelled</p>



                                                        </li>
                                                    }
                                                    {
                                                        orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus != "Cancelled" &&
                                                        <>
                                                            <li className="list-inline-item items-list col-3" style={orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Out for delivery" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Shipped" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ? { borderTop: "2px #26A541 solid" } : { borderTop: "2px #ddd solid" }}>




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
                                                            <li className="list-inline-item items-list  col-3" style={orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Out for delivery" || orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ? { borderTop: "2px #26A541 solid" } : { borderTop: "2px #ddd solid" }}>
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
                                                            <li className="list-inline-item items-list text-end col-3" style={orderDetails.orderedItems && orderDetails.orderedItems.deliveryStatus === "Delivered" ? { borderTop: "2px #26A541 solid", } : { borderTop: "2px #ddd solid", marginRight: 8 }}>
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
                                                                // orderDetails.orderedItems && orderDetails.orderedItems.returnStatus != 'Not Requested' &&
                                                                // <li className="list-inline-item items-list text-end col-2" style={{ borderTop: "2px #e12222 solid", marginRight: 8 }}>


                                                                //     <>
                                                                //         <div className="before" style={{ content: '""', position: 'absolute', height: 8, width: 8, borderRadius: '50%', backgroundColor: '#e12222', top: 0, marginTop: '-5px', left: 0 }} />
                                                                //         <p className="py-1  rounded " style={{ color: '#e12222' }}>Returned</p>
                                                                //     </>


                                                                // </li>
                                                            }
                                                        </>
                                                    }
                                                </ul>
                                            }

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className='px-5 pt-5 pb-4 address border mt-1  row' >


                            <div className="card-body">
                                <h5 className="card-title">Price Details</h5>
                                <hr />
                                <div className="row">
                                    <div className=" col-6 col-md-6">
                                        <h6 className="card-text">Sale Price(1):</h6>
                                    </div>
                                    <div className=" col-6 col-md-6 text-right">
                                        <h6 className="card-text">{orderDetails.orderedItems && orderDetails.orderedItems.salePrice}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-md-6">
                                        <h6 className="card-text"> Discount:</h6>
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                        <h6 className="card-text">{orderDetails.orderedItems && orderDetails.orderedItems.discount / orderDetails.orderedItems.quantity}</h6>
                                    </div>
                                </div>



                                <div className="row">
                                    <div className="col-6 col-md-6">
                                        <h5 className="card-text">Total Price:</h5>
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                        <h5 className="card-text">{orderDetails.orderedItems && orderDetails.orderedItems.totalprice / orderDetails.orderedItems.quantity}</h5>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6 col-md-6">
                                        <h5 className="card-text">Quantity:</h5>
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                        <h5 className="card-text">x{orderDetails.orderedItems && orderDetails.orderedItems.quantity}</h5>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-6 col-md-6">
                                        <h5 className="card-text">Amount paid:</h5>
                                    </div>
                                    <div className="col-6 col-md-6 text-right">
                                        <h5 className="card-text">{orderDetails.orderedItems && orderDetails.orderedItems.totalprice}</h5>
                                    </div>
                                </div>
                            </div>





                        </div>
                    </>}
                {
                    requestForm && <ReturnRequestForm orderId={orderId} productId={productId} toogle={toogle} setToogle={setToogle} setrequestForm={setrequestForm} />
                }

            </div >

        </>
    )
}

export default OrderDetails