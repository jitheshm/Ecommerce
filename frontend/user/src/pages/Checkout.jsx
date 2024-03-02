import React, { useState } from 'react'
import Header from '../components/Header/Header'
import CheckOut from '../components/CheckOut/CheckOut'
import Success from '../components/Success/Success'
import MobileNavbar from '../components/mobile/Navbar'
function Checkout() {
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderReciept, setOrderReciept] = useState('')

    return (
        <>
            <Header />

            {

                orderPlaced ? <Success orderReciept={orderReciept} /> : <CheckOut setOrderPlaced={setOrderPlaced} setOrderReciept={setOrderReciept} />
            }
            <MobileNavbar />
        </>
    )
}

export default Checkout