import React, { useEffect, useState } from 'react'
import AddressForm from '../AddressForm/AddressForm'
import AddressCard from '../AddressCard/AddressCard'
import './CheckOut.css'
import PriceDetails from '../PriceDetails/PriceDetails'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { logout } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import OrderSummary from '../OrderSummary/OrderSummary'
import CouponList from '../CouponList/CouponList'
function CheckOut({ setOrderPlaced, setOrderReciept }) {
    const [address, setAddress] = useState([])
    const [orderAddress, setOrderAddress] = useState()
    const [addressForm, setAddressForm] = useState(false)
    const [edit, setEdit] = useState('')
    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [payment, setPayment] = useState('Razorpay')
    const [cartItems, setCartItems] = useState([])
    const [coupon, setCoupon] = useState('')
    const [applyCoupon, setApplyCoupon] = useState()
    const [couponStatus, setCouponStatus] = useState(false)
    const [couponError, setCouponError] = useState('')
    const [showCouponList, setShowCouponList] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        instance.get('/user/address', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setAddress(res.data.data)
            setOrderAddress(res.data.data[0]._id)

        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())
            }
        })
    }, [addressForm, edit])

    useEffect(() => {
        instance.get('/user/cart', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            if (res.data.data.length === 0) {
                navigate('/cart')
            }
            setCartItems(res.data.data)
            console.log(res.data.data);
            setTotal(res.data.data.reduce((acc, item) => acc + item.totalPrice, 0))
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())


            }
        })
    }, [])

    const handleAddressChange = (e) => {
        setOrderAddress(e.target.value)
    }

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
                            alert('Payment failed')
                        }
                    })

                } catch (error) {
                    console.error('Error capturing payment:', error);
                    // setPaymentStatus('Payment failed!');
                    alert('Payment failed')
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

        paymentObject.open();
    }

    const handleConfirm = () => {

        instance.post('/user/placeorder', {
            deliveryAddress: orderAddress,
            paymentMethod: payment,
            orderAmount: total,
            discount: discount,
            amountPaid: total - discount,
            coupon: applyCoupon,
            orderedItems: cartItems.map((item) => {
                return {
                    productId: item.products.productId,
                    quantity: item.products.quantity,
                    salePrice: item.varient.salePrice,
                    discount: (item.varient.salePrice * item.products.quantity) - item.totalPrice,
                    totalprice: item.totalPrice,


                }
            })
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            if (res.data.success) {
                if (payment === 'COD') {
                    console.log(res);
                    setOrderReciept(res.data.data)
                    setOrderPlaced(true)
                } else {
                    console.log(res.data.data.id);
                    initiatePayment(res.data.data);

                }
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

    const handleApplyCoupon = () => {
        instance.post('/user/applycoupon', {
            couponId: coupon,
            totalAmount: total
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                let discountValue
                if (res.data.data.discountType === 'percentage') {
                    discountValue = (total * res.data.data.discount) / 100
                } else {
                    discountValue = res.data.data.discount
                }
                setDiscount(discountValue)
                setApplyCoupon({
                    couponId: coupon,
                    discount: discountValue
                })
                setCouponStatus(true)
                setCouponError('')

            } else {
                console.log(res.data.msg);
                setCouponStatus(false)
                setCouponError(res.data.msg)
            }

        }).catch((error) => {
            console.log(error);
        })
    }
    const handleRemoveCoupon = () => {
        setDiscount(0)
        setCoupon('')
        setApplyCoupon([])
        setCouponStatus(false)
    }

    return (
        <div className='container-fluid pt-5 checkOut'>
            <div className='row ms-4 checkOutContent'>
                <div className='col-md-7 '>
                    <div className=' p-5  right mb-5'>
                        <h4><b>Delivery Address</b></h4>
                        {
                            address.map((addrObj) => {
                                if (addrObj._id === edit) {
                                    return <AddressForm key={addrObj._id} setAddressForm={setAddressForm} id={addrObj._id} setEdit={setEdit} method={"patch"} api={`/user/updateaddress`} />
                                }
                                return <>
                                    <div className='row'>
                                        <input className="form-check-input col-1 mt-5" type="radio" name="type" id="" value={addrObj._id} onChange={handleAddressChange} checked={orderAddress === addrObj._id} />
                                        <div className='col-10'>

                                            <AddressCard addrObj={addrObj} setEdit={setEdit} setAddress={setAddress} checkOut={true} />
                                        </div>
                                    </div>
                                </>
                            })
                        }

                        {
                            !addressForm && <div className='mt-5'>
                                <button className='btn primary ' onClick={() => {
                                    setAddressForm(true)
                                }}>Add new address</button>
                            </div>
                        }

                        {
                            addressForm && <AddressForm title={"Add New Address"} setAddressForm={setAddressForm} api={'/user/newaddress'} method={"post"} />
                        }



                    </div>
                    <OrderSummary items={cartItems} />

                    <div className=' p-5 mb-3  right'>
                        <h4><b>Payment Options</b></h4>

                        <div className='row py-4 justify-content-center gap-5'>
                            <div className="card col-3" onClick={() => {
                                setPayment('Razorpay')
                            }} style={payment === 'Razorpay' ? { borderColor: "#333" } : { borderColor: "rgba(0, 0, 0, 0.175)" }} >

                                <div className="card-body text-center py-4" >
                                    <i className="fa-solid fa-wallet" style={{ color: '#15161d', fontSize: "39px" }} />
                                    <h5><b>Razorpay</b></h5>

                                </div>
                            </div>

                            <div className="card col-3" onClick={() => {
                                setPayment('COD')
                            }} style={payment === 'COD' ? { borderColor: "#333" } : { borderColor: "rgba(0, 0, 0, 0.175)" }}>

                                <div className="card-body text-center py-4">
                                    <i className="fa-solid fa-money-bill-1" style={{ color: '#15161d', fontSize: "39px" }} />
                                    <h5><b>Cash on delivery</b></h5>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className=' px-5 py-3 mb-5  right'>

                        <h4><b><i className="fa-solid fa-plus me-3" />
                            Add Coupons</b></h4>


                        <form action="" className='col-12 pb-4'>
                            <div className='row'>
                                <div className='col-5'>
                                    <input type="text" className="form-control my-3" placeholder="Enter coupon code" name='couponCode' value={coupon} onChange={(e) => {
                                        setCoupon(e.target.value)
                                    }} />
                                </div>
                                {
                                    couponStatus && <p className='text-success col-5 p-4' >Coupon applied successfully</p>
                                }
                                {
                                    couponError && <p className='text-danger col-5 p-4' >{couponError}</p>
                                }
                            </div>
                            {
                                !couponStatus ? <button type='button' className='btn primary' onClick={handleApplyCoupon}>Apply</button> : <button type='button' className='btn primary' onClick={handleRemoveCoupon}>Remove</button>
                            }
                            <button type='button' className='btn primary ms-4' onClick={() => {
                                setShowCouponList(true)

                            }} style={{ backgroundColor: "#c91c1c", color: "#ffffff" }}>Show Coupons</button>

                        </form>



                    </div>
                </div>
                <PriceDetails checkOut={true} itemsCount={cartItems.length} total={total} discount={discount} handleConfirm={handleConfirm} />
            </div>
            {
                showCouponList && <CouponList setShowCouponList={setShowCouponList}/>
            }

        </div>
    )
}

export default CheckOut