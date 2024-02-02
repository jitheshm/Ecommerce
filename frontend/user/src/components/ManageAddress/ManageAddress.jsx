import React from 'react'
import AddressForm from '../AddressForm/AddressForm'
import AddressCard from '../AddressCard/AddressCard'

function ManageAddress() {
    return (
        <div className='col-md-7 p-5  right'>
            <h4><b>Manage Address</b></h4>
            <div className='mt-5'>
                <button className='btn primary '>Add new address</button>
            </div>

            <AddressForm />

            <AddressCard />

        </div>
    )
}

export default ManageAddress