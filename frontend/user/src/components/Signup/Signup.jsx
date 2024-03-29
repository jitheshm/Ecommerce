import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function Signup({ setVerifyOtp }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmError, setConfirmError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")


    const handleSubmit = () => {
        if (!/^[^\s]{3,}$/.test(firstName)) {
            setFirstNameError(true)
            return;
        } else {
            setFirstNameError(false)
        }
        if (lastName.trim() === "") {
            setLastNameError(true)
            return;
        } else {
            setLastNameError(false)
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError(true)
            return;
        } else {
            setEmailError(false)
        }
        if (password === "") {
            setPasswordError(true)
            return;
        } else {
            setPasswordError(false)
        }
        if (confirmPassword != password) {
            console.log("password match");
            setConfirmError(true)
            return;
        } else {
            setConfirmError(false)
        }
        instance.post("/user/signup", {
            firstName,
            lastName,
            email,
            password,
        }).then((res) => {
            if (res.data.success) {
                console.log(res);
                Cookies.set('token', res.data.token, { expires: 365 })
                setVerifyOtp(true)
            } else {
                setErrorMsg(res.data.error)
            }
        }).catch((err) => {
            console.log(err);

        })


    }

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card login-card otpCard " style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-md-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5 px-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                                        <p className="text-dark-50 mb-5">Please enter your details</p>
                                        <div style={{ height: "30px" }}>
                                            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                                        </div>
                                        <div className="form-outline form-white mb-4 ">
                                            <label className="form-label" htmlFor="typeEmailX">First Name</label>

                                            <input type="text" className="form-control form-control-lg " value={firstName} onChange={(e) => {
                                                setFirstName(e.target.value)
                                            }} />
                                            {firstNameError && <p style={{ color: "red" }}>please enter your first name</p>}
                                        </div>

                                        <div className="form-outline form-white mb-4 ">
                                            <label className="form-label" htmlFor="typeEmailX">Last Name</label>

                                            <input type="text" className="form-control form-control-lg " value={lastName} onChange={(e) => {
                                                setLastName(e.target.value)
                                            }} />
                                            {lastNameError && <p style={{ color: "red" }}>please enter your last name</p>}
                                        </div>
                                        <div className="form-outline form-white mb-4 ">
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>

                                            <input type="email" id="typeEmailX" className="form-control form-control-lg " value={email} onChange={(e) => {
                                                setEmail(e.target.value)

                                            }} />
                                            {emailError && <p style={{ color: "red" }}>Please enter a valid email address</p>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>

                                            <input type="password" id="typePasswordX1" className="form-control form-control-lg" value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} />
                                            {passwordError && <p style={{ color: "red" }}>please enter your password</p>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX2">Confirm Password</label>

                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" value={confirmPassword} onChange={(e) => {
                                                setconfirmPassword(e.target.value)
                                            }} />
                                            {confirmError && <p style={{ color: "red" }}>password not match</p>}
                                        </div>       

                                        <button className="btn primary btn-lg px-5 mt-4 text-white verifyBtn" type="submit" onClick={handleSubmit}>Create an account</button>

                                    </div>
                                    <div>
                                        <p className="mb-0">Already have an account? <Link to={'/login'} className="text-dark-50 fw-bold">Sign in</Link>
                                        </p>
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

export default Signup