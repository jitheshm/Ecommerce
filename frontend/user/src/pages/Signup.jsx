import React, { useState } from 'react'
import Header from '../components/Header/Header'
import SignupComponent from '../components/Signup/Signup'
import OtpVerify from '../components/Otp/OtpVerify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Signup() {
    const [verifyOtp, setVerifyOtp] = useState(false)
    const [loading, setloading] = useState(true)
    const { name, verified } = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (verified) {
            navigate("/")
        } else {
            setloading(false)
        }
    }, [verified])
    return (
        <>
            <Header />
            {
              loading? <div>loading...</div> :verifyOtp ? <OtpVerify /> : <SignupComponent setVerifyOtp={setVerifyOtp} />
            }

        </>
    )
}

export default Signup