import React from 'react'

function Signup() {
  return (
    <>
    <section className="vh-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card login-card text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-md-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5 px-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                                        <p className="text-white-50 mb-5">Please enter your details</p>
                                        <div className="form-outline form-white mb-4 ">
                                            <label className="form-label" htmlFor="typeEmailX">Name</label>
                                            <input type="text" className="form-control form-control-lg " />

                                        </div>
                                        <div className="form-outline form-white mb-4 ">
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg " />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Confirm Password</label>
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" />

                                        </div>
                                        
                                        <button className="btn btn-outline-light btn-lg px-5 mt-4" type="submit">Create an account</button>

                                    </div>
                                    <div>
                                        <p className="mb-0">Already have an account? <a href="#!" className="text-white-50 fw-bold">Sign in</a>
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