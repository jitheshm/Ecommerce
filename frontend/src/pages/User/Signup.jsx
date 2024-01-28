import React, { useState } from 'react'
import Header from '../../components/User/Header/Header'
import SignupComponent from '../../components/User/Signup/Signup'
import OtpVerify from '../../components/User/Otp/OtpVerify'
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