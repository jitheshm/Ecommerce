/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderSummary from '../OrderSummary/OrderSummary'
import PriceDetails from '../PriceDetails/PriceDetails'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../../axios'
import Cookies from 'js-cookie'
import { BASEURL } from '../../constants/constant'
import { logout } from '../../features/user/userSlice'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

function Repayment({ setOrderPlaced, setOrderReciept }) {
    const [orderItems, setOrderItems] = useState([])
    const [total, setTotal] = useState(0)
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        instance.get(`user/getoneorder/${orderId}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            if (res.data.data[0].paymentStatus === "payment pending") {
                setOrderItems(res.data.data)
                //setTotal(res.data.data.totalPrice)
            }
            else {
                navigate('/profile/orders')
            }

        }).catch((err) => {
            console.log(err);
        })
    }, [])



    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const handleConfirm = () => {
        instance.post('/user/orderrepayment', {
            orderId: orderId,
            amountPaid: orderItems[0].amountPaid
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            if (res.data.success) {

                console.log(res.data.data.id);
                initiatePayment(res.data.data);


            } else {
                console.log(res.data.msg);
            }

        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())


            }
        })
    }

    const initiatePayment = async (data, total) => {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razropay failed to load!!')
            return
        }

        const options = {
            key: 'api_key',
            // amount: 10 * 100, // Amount in paise
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Test Payment',
            order_id: data.id,
            retry:false,
            handler: async function (response) {
                try {
                    console.log(data);
                    const paymentId = response.razorpay_payment_id;
                    const orderId = response.razorpay_order_id
                    const signature = response.razorpay_signature;

                    // setPaymentStatus('Payment successful!');

                    // You can handle payment confirmation with your backend here if required
                    instance.patch('/user/verifypayment', {
                        paymentId: paymentId,
                        orderId: orderId,
                        signature: signature,
                        receiptId: data.receipt

                    }, {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    }).then((res) => {
                        if (res.data.success) {
                            console.log("Payment successfull");
                            console.log(res.data.data);
                            setOrderReciept(res.data.data)
                            setOrderPlaced(true)
                        } else {
                            Swal.fire({
                                title: "Payment Failed",
                                text: "Payment failed, please try again",
                                icon: "error"
                            });
                        }
                    })

                } catch (error) {
                    console.error('Error capturing payment:', error);
                    // setPaymentStatus('Payment failed!');
                    Swal.fire({
                        title: "Payment Failed",
                        text: "Payment failed, please try again",
                        icon: "error"
                    });
                }
            },
            prefill: {
                name: 'User Name',
                email: 'user@example.com'
            },
            theme: {
                color: '#F37254'
            }
        };






        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            //paymentObject.close();
            Swal.fire({
                title: "Payment Failed",
                text: "Payment failed, please try again",
                icon: "error"
            });
        })
        paymentObject.open();
    }

    return (
        <>
            <div className='container-fluid pt-5 checkOut'>
                <div className='row ms-4 checkOutContent'>
                    <div className='col-md-7 '>
                        <div className=' p-5  right mb-5'>
                            <h4><b>Delivery Address</b></h4>
                            <div className='row'>

                                <div className='col-10'>

                                    <AddressCard addrObj={orderItems[0] ? orderItems[0].deliveryAddress : ""} checkOut={true} repayment={true} />
                                </div>
                            </div>




                        </div>
                        {/* <OrderSummary items={order} /> */}
                        <div className='card mb-3'>


                            {
                                orderItems.map((item, index) => {
                                    return (
                                        <div className=" d-flex flex-row  ">
                                            <div className='p-5 col-2 '>
                                                <img className="card-img-top " src={item.variants && BASEURL + "/" + item.variants.imagesUrl[0]} alt="Card image cap" style={{ height: "65px", width: "50px" }} />
                                            </div>
                                            <div className="card-body pt-4 col-6 ms-2 mt-2">
                                                <h4 className="card-title "><>{item.productDetails && item.productDetails.productName}</></h4>
                                                <div className="d-flex flex-row">
                                                    <div className="text-warning mb-1 me-2">
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fas fa-star-half-alt" />
                                                        <span className="ms-1">
                                                            4.5
                                                        </span>
                                                    </div>

                                                </div>

                                                <p className="card-text mt-2 row"><h4 className='col-3'><b>₹ {item.orderedItems && item.orderedItems.totalprice}</b></h4> </p>
                                                {/* <div style={{ height: "30px" }}>{stockError && <p style={{ color: "red" }}>Out of stock</p>}</div> */}
                                            </div>


                                        </div>
                                    )
                                })
                            }


                        </div>




                    </div>
                    <PriceDetails checkOut={true} itemsCount={orderItems[0] && orderItems.length} total={orderItems[0] && orderItems[0].amountPaid} discount={orderItems[0] && orderItems[0].discount} handleConfirm={handleConfirm} />
                </div>


            </div>
        </>
    )
}

export default Repayment