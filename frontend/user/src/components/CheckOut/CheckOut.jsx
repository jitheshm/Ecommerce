import React, { useEffect, useState } from 'react'
import AddressForm from '../AddressForm/AddressForm'
import AddressCard from '../AddressCard/AddressCard'
import './CheckOut.css'
import PriceDetails from '../PriceDetails/PriceDetails'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { logout } from '../../features/user/userSlice'
function CheckOut() {
    const [address, setAddress] = useState([])
    const [orderAddress, setOrderAddress] = useState()
    const [addressForm, setAddressForm] = useState(false)
    const [edit, setEdit] = useState('')
    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [payment, setPayment] = useState('Razorpay')
    const [cartItems, setCartItems] = useState([])

    const dispatch = useDispatch()

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
    }, [addressForm])

    useEffect(() => {
        instance.get('/user/cart', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setCartItems(res.data.data)
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

                    <div className=' p-5 mb-5  right'>
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
                </div>
                <PriceDetails checkOut={true} itemsCount={cartItems.length} total={total} discount={discount} />
            </div>
        </div>
    )
}

export default CheckOut