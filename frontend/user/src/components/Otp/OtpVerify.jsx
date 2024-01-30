import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { verify } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';


function OtpVerify() {
    const [otp, setOtp] = useState("")
    const [otpError, setOtpError] = useState(false)
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
    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-5 col-xl-5">
                            <div className="card login-card text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-md-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5 px-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Otp</h2>
                                        <p className="text-white-50 mb-5">Please enter your verification code</p>
                                        <div className="form-outline form-white mb-4 ">
                                            {otpError && <p className="text-danger">Please enter otp</p>}
                                            <input type="text" className="form-control form-control-lg " value={otp} onChange={(e) => {
                                                setOtp(e.target.value)
                                            }} />

                                        </div>


                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Verify me</button>

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