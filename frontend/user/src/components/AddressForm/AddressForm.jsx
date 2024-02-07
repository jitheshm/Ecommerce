import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
function AddressForm({ setAddressForm, id, setEdit, method, api, title }) {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState()
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [locality, setLocality] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState()
    const [addressType, setAddressType] = useState("Home")
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            
            instance.get(`/user/address/${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res);
                setName(res.data.data.name)
                setPhone(res.data.data.phone)
                setCity(res.data.data.city)
                setStreet(res.data.data.street)
                setLocality(res.data.data.locality)
                setState(res.data.data.state)
                setPincode(res.data.data.pincode)
                setAddressType(res.data.data.addressType)
            }).catch((error) => {
                console.log("jjj");
                console.log(error.response.status);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())


                }
            })
        }
    }, [])


    const handleTypeChange = (e) => {
        setAddressType(e.target.value)
    }
    const handleSubmit = () => {
        const data = {
            name,
            phone,
            city,
            street,
            locality,
            state,
            pincode,
            addressType,
            id
        }
        console.log(data); 
        instance.request({
            method: method,
            url: api,
            data: data,
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            if (res.data.success) {

                if (id) {
                    setEdit('')
                } else {
                    setAddressForm(false)
                }
            }

        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())


            }
        })
    }

    return (
        <>

            <div className='col-md-12 p-5 address border mt-3' style={{ float: "none" }}>

                <h4><b>{title}</b></h4>
                <form className='col-md-10 mt-3' style={{ float: "none" }}>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Name</label>
                            <input type="text" className="form-control" id="" placeholder="Name" value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Phone</label>
                            <input type="number" className="form-control" id="" placeholder="Phone" value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">City</label>
                            <input type="text" className="form-control" id="" placeholder="Locality" value={city} onChange={(e) => {
                                setCity(e.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Street</label>
                            <input type="text" className="form-control" id="" placeholder="Street" value={street} onChange={(e) => {
                                setStreet(e.target.value)
                            }} />
                        </div>


                    </div>

                    <div className="row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Locality</label>
                            <input type="text" className="form-control" id="" placeholder="Locality" value={locality} onChange={(e) => {
                                setLocality(e.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">State</label>
                            <input type="text" className="form-control" id="" placeholder="State" value={state} onChange={(e) => {
                                setState(e.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Pincode</label>
                            <input type="number" className="form-control" id="" placeholder="Pincode" value={pincode} onChange={(e) => {
                                setPincode(e.target.value)
                            }} />
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword4">Address Type</label>
                        <div className='row ps-5 '>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="radio" name="type" id="" value="Home" onChange={handleTypeChange} checked={addressType === "Home"} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Home
                                </label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="radio" name="type" id="" value="Work" onChange={handleTypeChange} checked={addressType === "Work"} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Work
                                </label>
                            </div>
                        </div>

                    </div>

                    <button type="button" className="btn primary me-5" onClick={handleSubmit}>Save</button>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        if (id) {
                            setEdit('')
                        } else {
                            setAddressForm(false)
                        }

                    }}>Cancel</button>

                </form>

            </div>
        </>
    )
}

export default AddressForm