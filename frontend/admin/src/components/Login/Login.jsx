import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { verify } from '../../features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css'
function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [userNameError, setUserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (userName.trim() === "") {
            setUserNameError(true)
            return;
        } else {
            setUserNameError(false)
        }
        if (password === ""||password.length<5) {
            setPasswordError(true)
            return;
        } else {
            setPasswordError(false)
        }
        instance.post("/admin/login", {

            userName,
            password,
        }).then((res) => {
            console.log(res);
            if (res.error) {
                setError(true)
                return;
            }
            Cookies.set('token', res.data.token, { expires: 365 })
            dispatch(verify({ name: res.data.name }))
            navigate("/products")

        }).catch((err) => {
            console.log(err);

        })
    }
    return (
        <>
            {/* <section className="vh-100 gradient-custom ">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card login-card " style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-md-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5 px-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                                        <p className=" mb-5">Please enter your user name and password!</p>
                                        <div className="form-outline form-white mb-4 ">
                                            <label className="form-label" htmlFor="typeEmailX">User Name</label>
                                            {userNameError && <p style={{ color: "red" }}>Please enter a valid user name</p>}
                                            <input type="text"  className="form-control form-control-lg " value={userName} onChange={(e) => {
                                                setUserName(e.target.value)

                                            }} />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            {passwordError && <p style={{ color: "red" }}>please enter your password</p>}
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} />

                                        </div>
                                        
                                        <button className="btn btn-outline-dark text-white btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>
                                       
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}


            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2" />
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true" />
                        </div>
                        <div className="col-lg-12 login-title">
                            ADMIN PANEL
                        </div>
                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form>
                                    {error && <p style={{ color: "red" }}>user Name or Password is incorrect</p>}
                                    <div className="form-group">
                                        <label className="form-control-label">USERNAME</label>
                                        {userNameError && <p style={{ color: "red" }}>Please enter a valid user name</p>}
                                        <input type="text" className="form-control" value={userName} onChange={(e) => {
                                            setUserName(e.target.value)

                                        }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        {passwordError && <p style={{ color: "red" }}>please enter your password</p>}
                                        <input type="password" className="form-control" value={password} onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                            {/* Error Message */}
                                        </div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2" />
                    </div>
                </div>
            </div>






        </>
    )
}

export default Login