import React, { useState } from 'react'
import instance from '../../axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
function NewPasswordForm() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [confirmError, setConfirmError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = () => {

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
        instance.patch("/user/passwordupdate", {

            password
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            if (res.data.success) {
                console.log(res);
                navigate('/')
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

                                        <p className="text-dark-50 mb-5">Please enter new Password</p>


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

                                        <button className="btn primary btn-lg px-5 mt-4 text-white verifyBtn" type="submit" onClick={handleSubmit}>Change Password</button>

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

export default NewPasswordForm