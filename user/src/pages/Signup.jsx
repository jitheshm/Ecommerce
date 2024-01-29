import React, { useState } from 'react'
import Header from '../components/Header/Header'
import SignupComponent from '../components/Signup/Signup'
import OtpVerify from '../components/Otp/OtpVerify'
function Signup() {
    const [verifyOtp, setVerifyOtp] = useState(false)
    return (
        <>
            <Header />
            {
                verifyOtp ? <OtpVerify /> : <SignupComponent />
            }
           
        </>
    )
}

export default Signup