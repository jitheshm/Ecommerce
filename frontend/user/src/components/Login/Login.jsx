import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { verify } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Login({ setForget }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()   
    const handleSubmit = () => {
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
        instance.post("/user/login", {

            email,
            password,
        }).then((res) => {
            console.log(res);
            Cookies.set('token', res.data.token, { expires: 365 })
            dispatch(verify({ name: res.data.name }))
            navigate("/")

        }).catch((err) => {
            console.log(err);
            setLoginError(true)

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
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <div style={{ height: "30px" }}>
                                            {
                                                loginError && <p style={{ color: "red" }}>Invalid email or password</p>
                                            }
                                        </div>
                                        <p className="text-dark-50 mb-5">Please enter your login and password!</p>
                                        <div className="form-outline form-white mb-4 ">
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            {emailError && <p style={{ color: "red" }}>Please enter a valid email address</p>}
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg " value={email} onChange={(e) => {
                                                setEmail(e.target.value)

                                            }} />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            {passwordError && <p style={{ color: "red" }}>please enter your password</p>}
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} />

                                        </div>
                                        <p className="small mb-5 pb-lg-2"><button className="text-dark-50" onClick={() => {
                                            setForget(true)
                                        }}>Forgot password?</button></p>
                                        <button className="btn primary verifyBtn btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>
                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                            <a href="#!" className="text-dark"><i className="fab fa-facebook-f fa-lg" /></a>
                                            <a href="#!" className="text-dark"><i className="fab fa-twitter fa-lg mx-4 px-2" /></a>
                                            <a href="#!" className="text-dark"><i className="fab fa-google fa-lg" /></a>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-0">Don't have an account? <Link to={'/signup'} className="text-dark-50  fw-bold">Sign Up</Link>
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

export default Login