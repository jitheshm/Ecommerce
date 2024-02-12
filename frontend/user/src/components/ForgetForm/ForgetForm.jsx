import React, { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import OtpVerify from '../Otp/OtpVerify';
import NewPasswordForm from '../NewPasswordForm/NewPasswordForm';
function ForgetForm() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [otpToogle, setOtpToogle] = useState(false)
    const [newPasswordToogle, setNewPasswordToogle] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError(true)
            return;
        } else {
            setEmailError(false)
        }

        instance.post('/user/forgetotpsend', {
            email: email
        }).then((res) => {
            if (res.data.success) {
                console.log(res);
                Cookies.set('token', res.data.token, { expires: 365 })
                setOtpToogle(true)
            } else {
                console.log("fail");
            }
        })
    }
    return (
        <>
            {
                !otpToogle && !newPasswordToogle && <section className="vh-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card login-card otpCard " style={{ borderRadius: '1rem' }}>
                                    <div className="card-body p-md-5 text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5 px-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Enter your Email </h2>
                                            <div style={{ height: "30px" }}>
                                                {
                                                    loginError && <p style={{ color: "red" }}>Invalid email </p>
                                                }
                                            </div>
                                            <p className="text-dark-50 mb-5">Please enter your email</p>
                                            <div className="form-outline form-white mb-4 ">
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                                {emailError && <p style={{ color: "red" }}>Please enter a valid email address</p>}
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg " value={email} onChange={(e) => {
                                                    setEmail(e.target.value)

                                                }} />

                                            </div>
                                            <button className="btn primary verifyBtn btn-lg px-5" type="submit" onClick={handleSubmit}>Send Otp</button>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

            {otpToogle && !newPasswordToogle && <OtpVerify forgetOtp={true} setNewPasswordToogle={setNewPasswordToogle} />}
            {
                newPasswordToogle && <NewPasswordForm/>
            }
        </>
    )
}

export default ForgetForm