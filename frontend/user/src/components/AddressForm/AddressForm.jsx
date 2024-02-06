import React from 'react'

function AddressForm() {
    return (
        <>

            <div className='col-md-12 p-5 address border mt-3' style={{float:"none"}}>

                <h4><b>Add new Address</b></h4>
                <form className='col-md-10 mt-3' style={{float:"none"}}>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Name</label>
                            <input type="text" className="form-control" id="" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Phone</label>
                            <input type="number" className="form-control" id="" placeholder="Phone" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">City</label>
                            <input type="text" className="form-control" id="" placeholder="Locality" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Street</label>
                            <input type="text" className="form-control" id="" placeholder="Street" />
                        </div>


                    </div>

                    <div className="row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Locality</label>
                            <input type="text" className="form-control" id="" placeholder="Locality" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">State</label>
                            <input type="text" className="form-control" id="" placeholder="Street" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Pincode</label>
                            <input type="text" className="form-control" id="" placeholder="Pincode" />
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword4">Address Type</label>
                        <div className='row ps-5 '>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="radio" name="type" id="" defaultChecked />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Home
                                </label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="radio" name="type" id="" />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Work
                                </label>
                            </div>
                        </div>

                    </div>

                    <button type="button" className="btn primary">Save</button>
                </form>

            </div>
        </>
    )
}

export default AddressForm