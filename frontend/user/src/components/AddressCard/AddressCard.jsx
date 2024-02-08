/* eslint-disable react/prop-types */
import React from 'react'
import AddressForm from '../AddressForm/AddressForm'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';

function AddressCard({ addrObj, setEdit, setAddress }) {
    const dispatch = useDispatch()

    const handleEdit = () => {
        setEdit(addrObj._id)
    }
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this address?')) {
            instance.delete(`/user/deleteaddress?id=${addrObj._id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res);
                setAddress((prev) => {
                    return prev.filter((address) => {
                        return address._id !== addrObj._id
                    })
                })

            }).catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())


                }
            })
        }
    }
    return (
        <div className=' col-12 ps-0 pe-0  pt-5'>
            <div className='border container-fluid'>
                <div className='row col-12 mt-3 ms-2'>


                    <p className='col-1 bg-secondary rounded'>{addrObj.addressType}</p>

                    <p className='col-11 text-end' ><button type='button' className='btn me-4' onClick={handleEdit}>Edit</button> <button type='button' className='btn' onClick={handleDelete}>Delete</button></p>
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