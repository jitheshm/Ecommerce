import React, { useEffect, useState } from 'react'
import AddressForm from '../AddressForm/AddressForm'
import AddressCard from '../AddressCard/AddressCard'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
function ManageAddress() {
    const [addressForm, setAddressForm] = useState(false)
    const [address, setAddress] = useState([])
    const [edit,setEdit]=useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        instance.get('/user/address', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setAddress(res.data.data)

        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())


            }
        })
    }, [addressForm,edit])

    return (
        <div className='col-md-7 p-5  right'>
            <h4><b>Manage Address</b></h4>
            <div className='mt-5'>
                {
                    !addressForm && <button className='btn primary ' onClick={() => {
                        setAddressForm(true)
                    }}>Add new address</button>
                }
            </div>

            {
                addressForm && <AddressForm title={"Add New Address"} setAddressForm={setAddressForm} api={'/user/newaddress'} method={"post"}  />
            }

            {
                address.map((addrObj) => {  
                    if(addrObj._id===edit){
                        return <AddressForm key={addrObj._id} setAddressForm={setAddressForm} id={addrObj._id} setEdit={setEdit} method={"patch"} api={`/user/updateaddress`}/>
                    }
                    return <AddressCard key={addrObj._id} addrObj={addrObj} setEdit={setEdit} />
                })
            }
        </div>
    )
}

export default ManageAddress