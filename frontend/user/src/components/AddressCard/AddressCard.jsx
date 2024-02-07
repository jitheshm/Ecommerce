/* eslint-disable react/prop-types */
import React from 'react'
import AddressForm from '../AddressForm/AddressForm'

function AddressCard({ addrObj,setEdit}) {

    const handleEdit = () => {
        setEdit(addrObj._id)
    }
    return (
        <div className=' col-12 ps-0 pe-0  pt-5'>
            <div className='border container-fluid'>
                <div className='row col-12 mt-3 ms-2'>


                    <p className='col-1 bg-secondary rounded'>{addrObj.addressType}</p>

                    <p className='col-11 text-end' ><button type='button' className='btn me-4' onClick={handleEdit}>Edit</button> <a href="">Delete</a></p>
                </div>
                <div className='mt-3' >
                    <div className='d-flex gap-3'>
                        <p>{addrObj.name}</p>
                        <p>{addrObj.phone}</p>
                    </div>


                    <div className='d-flex'>
                        <p>{addrObj.street}</p>&nbsp;
                        <p>{addrObj.locality}</p>&nbsp;
                        <p>{addrObj.state}</p>&nbsp;
                        <p>{addrObj.pincode}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressCard