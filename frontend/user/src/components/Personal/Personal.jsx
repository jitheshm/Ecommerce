import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import instance from '../../axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
function Personal() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    const [age, setAge] = useState()
    const [gender, setGender] = useState('Male')
    const [phone, setPhone] = useState()
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    
    const [ageError, setAgeError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        instance.get('/user/profile', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            setFirstName(res.data.data.firstName)
            setLastName(res.data.data.lastName)
          
            setAge(res.data.data.age)
            setGender(res.data.data.gender)
            setPhone(res.data.data.phone)

        })
    }, [])



    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    const handleSubmit = () => {
        if (!/^[^\s]{3}[\s\S]*$/.test(firstName)) {
            setFirstNameError(true)
            return;
        } else {
            setFirstNameError(false)
        }
        if (lastName.trim() === "") {
            setLastNameError(true)
            return;
        } else {
            setLastNameError(false)
        }

        
        if (age < 0 || !/^\d+$/.test(age) || isNaN(age) || age > 100) {
            setAgeError(true)
            return;
        } else {
            setAgeError(false)
        }
        if (phone < 0 || !/^[0-9\b]+$/.test(phone) || String(phone).length != 10) {
            console.log(String(phone).length);
            setPhoneError(true)
            return;

        } else {
            console.log(phone.length);
            setPhoneError(false)
        }

        instance.patch('/user/profile', {
            firstName,
            lastName,
            gender,
            age,
            phone
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            if (res.data.success)
                setSuccessMsg(true)

        }).catch((error) => {
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())


            }
        })
    }

    return (
        <>
            <div className='col-md-7 p-5  right'>
                <div style={{ height: "30px" }}>
                    {
                        successMsg && <p style={{ color: "green" }}>update successfully</p>
                    }
                </div>
                <form className='col-md-10'>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">First Name</label>
                            <input type="text" className="form-control" id="" placeholder="First Name" value={firstName} onChange={(e) => {
                                setFirstName(e.target.value)

                            }} />
                            {firstNameError && <p style={{ color: "red" }}>please enter your first name</p>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last Name</label>
                            <input type="text" className="form-control" id="" placeholder="Last Name" value={lastName} onChange={(e) => {
                                setLastName(e.target.value)

                            }} />
                            {lastNameError && <p style={{ color: "red" }}>please enter your last name</p>}
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Age</label>
                            <input type="number" className="form-control" id="" placeholder="Age" value={age} onChange={(e) => {
                                setAge(e.target.value)

                            }} />
                            {ageError && <p style={{ color: "red" }}>Please enter a valid Age</p>}
                        </div>
                        <div className="form-group col-md-6 px-5">
                            <label htmlFor="inputPassword4">Gender</label>
                            <div className='row '>
                                <div className="form-check col-md-6">
                                    <input className="form-check-input" type="radio" name="gender" id="gender" value={'Male'} onChange={handleGenderChange} checked={gender === 'Male'} />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check col-md-6">
                                    <input className="form-check-input" type="radio" name="gender" id="gender" value={'Female'} onChange={handleGenderChange} checked={gender === 'Female'} />
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
                            <input type="number" className="form-control" id="" value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }} />
                            {phoneError && <p style={{ color: "red" }}>Please enter a valid phone No</p>}
                        </div>

                    </div>

                    <button type="button" className="btn primary" onClick={handleSubmit}>Save</button>
                </form>

            </div>
        </>
    )
}

export default Personal