import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import OrderCard from '../OrderCard/OrderCard';

function Orders() {
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        instance.get('/user/order', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setOrders(res.data.data)
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
            <div className='col-md-7 py-md-5 address border mt-md-3'>

                <h4 className='d-none d-md-block'><b>Orders</b></h4>

                <div className='left-top m-auto mb-4 row px-5  col-12 d-md-none' style={{ width: "100%", height: "40px" }}>



                    <div className='col-6 nameContainer ms-4'>
                        <h4>My Orders</h4>   
                    </div>

                </div>

                {
                    orders.map((order) => {
                        return (
                            <>
                                <OrderCard order={order} />
                            </>
                        )
                    })
                }








            </div>
        </>
    )
}

export default Orders