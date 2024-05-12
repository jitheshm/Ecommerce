/* eslint-disable react/prop-types */
import React from 'react'
import AddressForm from '../AddressForm/AddressForm'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import Swal from 'sweetalert2'
function AddressCard({ addrObj={}, setEdit, setAddress, checkOut = false, repayment = false }) {
    const dispatch = useDispatch()

    const handleEdit = () => {
        setEdit(addrObj._id)
    }
    const handleDelete = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
                actions: 'action-btn'
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            width: "50rem",

        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/user/addresses/${addrObj._id}`, {
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
        })

    }
    return (
        <div className=' col-12 ps-0 pe-0  pt-5'>
            <div className='border container-fluid'>
                <div className='row col-12 mt-3 ms-2 '>

                    {
                        !repayment && <p className='col-2 col-md-1 bg-secondary rounded d-flex align-items-center text-white justify-content-center'>{addrObj.addressType}</p>
                    }

                    {
                        !repayment && <p className='col-10 text-end' ><button type='button' className='btn me-4' onClick={handleEdit}>Edit</button> {!checkOut && <button type='button' className='btn' onClick={handleDelete}>Delete</button>}</p>
                    }

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