import React from 'react'

function Personal() {
    return (
        <>
            <div className='col-md-7 p-5  right'>
                <form className='col-md-10'>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">First Name</label>
                            <input type="text" className="form-control" id="" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last Name</label>
                            <input type="text" className="form-control" id="" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Email Address</label>
                        <input type="email" className="form-control" id="" placeholder="Email" />
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Age</label>
                            <input type="number" className="form-control" id="" placeholder="Age" />
                        </div>
                        <div className="form-group col-md-6 px-5">
                            <label htmlFor="inputPassword4">Gender</label>
                            <div className='row '>
                                <div className="form-check col-md-6">
                                    <input className="form-check-input" type="radio" name="gender" id="gender" defaultChecked />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check col-md-6">
                                    <input className="form-check-input" type="radio" name="gender" id="gender" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Female
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="">Phone</label>
                            <input type="number" className="form-control" id="" />
                        </div>

                    </div>

                    <button type="button" className="btn primary">Save</button>
                </form>

            </div>
        </>
    )
}

export default Personal