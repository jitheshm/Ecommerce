import React, { useEffect } from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { verify } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';


function OtpVerify() {
    const [otp, setOtp] = useState("")
    const [otpError, setOtpError] = useState(false)
    const [timer, setTimer] = useState(30)
    const [timerEnd, setTimerEnd] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (otp.trim() === "") {
            setOtpError(true)
            return;
        } else {
            setOtpError(false)
        }
        instance.post("/user/otpVerify", {
            otp
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            Cookies.set('token', res.data.token, { expires: 365 })
            dispatch(verify({ name: res.data.name }))
            navigate("/")

        })
    }

    useEffect(() => {
        let id
        if (!timerEnd) {
            id = setInterval(() => {
                setTimer((pre) => {
                    if (pre === 1) {
                        setTimerEnd(true)
                    }
                    return pre - 1
                })

            }, 1000);
        }
        return () => {
            clearInterval(id)
        }
    }, [timerEnd])


    const handleResendOtp=()=>{
        instance.get("/user/resendOtp",{
            headers:{
                Authorization:Cookies.get('token')
            }
        }).then((res)=>{
            console.log(res);
            setTimer(30)
            setTimerEnd(false)
        })
    }

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-5 col-xl-5 text-dark">
                            <div className="card login-card text-dark otpCard" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-md-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5 px-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Otp</h2>
                                        <p className="text-dark-50 mb-5">Please enter your verification code</p>
                                        <div className="form-outline form-white mb-4 ">
                                            {otpError && <p className="text-danger">Please enter otp</p>}
                                            <input type="text" className="form-control form-control-lg " value={otp} onChange={(e) => {
                                                setOtp(e.target.value)
                                            }} />

                                        </div>


                                        <button className="btn primary btn-lg px-5 text-white verifyBtn" type="button" onClick={handleSubmit}>Verify me</button>
                                        <div className='mt-5'>
                                            <p className="mb-0">Not received otp? {timerEnd ? <button className="text-dark-50 fw-bold btn" onClick={handleResendOtp}>Resend code</button>: <span className="text-dark-50 fw-bold">{timer}</span>}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OtpVerify