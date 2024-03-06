import React, { useState } from 'react'
import RepaymentComponent from '../components/Repayment/Repayment'
import Header from '../components/Header/Header'
import Success from '../components/Success/Success'
import MobileNavbar from '../components/mobile/Navbar'
function Repayment() {
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderReciept, setOrderReciept] = useState('')
    return (
        <><Header />

            {

                orderPlaced ? <Success orderReciept={orderReciept} /> : <RepaymentComponent setOrderPlaced={setOrderPlaced} setOrderReciept={setOrderReciept} />
            }
            <MobileNavbar />
        </>
      
    )
}

export default Repayment