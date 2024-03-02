import React from 'react'
import CartComponent from '../components/Cart/Cart'
import Header from '../components/Header/Header'
import MobileNavbar from '../components/mobile/Navbar'
function Cart() {
    return (
        <>
            <Header />
            <CartComponent />
            <MobileNavbar />
        </>
    )
}

export default Cart