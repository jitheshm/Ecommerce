import React from 'react'
import './App.css'
import './assets/bootstrap.min.css'
import Header from './components/User/Header/Header'
import Login from './components/User/Login/Login'
import Signup from './components/User/Signup/Signup'
import OtpVerify from './components/User/Otp/OtpVerify'
import ProductDetails from './components/User/ProductDetails/ProductDetails'



function App() {
    return (
        <>
            <Header />
            {/* <Login/> */}
            {/* <Signup/> */}
            {/* <OtpVerify/> */}
            <ProductDetails/>
        </>
    )

}

export default App