import React from 'react'

function OtpVerify() {
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
                                           
                                            <input type="text"  className="form-control form-control-lg " />

                                        </div>
                                         
                                       
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Verify me</button>
                                       
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