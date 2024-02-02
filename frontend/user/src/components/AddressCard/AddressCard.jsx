import React from 'react'

function AddressCard() {
    return (
        <div className=' col-12 ps-0 pe-0  pt-5'>
            <div className='border container-fluid'>
                <div className='row col-12 mt-3 ms-2'>
                    <p className='col-1 bg-secondary rounded'>Home</p>
                    <p className='col-11 text-end' ><a href="" className='me-4'>Edit</a> <a href="">Delete</a></p>
                </div>
                <div className='mt-3' >
                    <div className='d-flex gap-3'>
                        <p>Jithesh</p>
                        <p>1234567890 </p>
                    </div>


                    <div className='d-flex'>
                        <p>Street,</p>
                        <p>Locality,</p>
                        <p>State,</p>
                        <p>Pincode</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressCard