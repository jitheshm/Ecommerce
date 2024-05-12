
import React, { useState } from 'react';
import instance from '../../axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
function ReturnRequestForm({ orderId, productId, toogle, setToogle, setrequestForm }) {
    const [reason, setReason] = useState('');
    const dispatch = useDispatch()
    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        instance.patch(`/user/orders/${orderId}/products/${productId}/return`, {
            reason: reason
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data);

            setToogle(!toogle)
            setrequestForm(false)

        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())
            }
        })
    };

    return (
        <>
            <div className='px-5 pt-5 address border mt-3 row' style={{ height: "350px" }}>
                <div className=''>
                    <h4><b>Return Request</b></h4>
                    <hr className='border' />
                    <p><b>Return Request for Order ID</b>: {orderId}</p>
                    <form onSubmit={handleSubmit} className='px-4 '>
                        <div className="mb-3">
                            <label htmlFor="reason" className="form-label">Reason for Return</label>
                            <div>
                                <input type="radio" id="reason1" name="reason" value="Product Defects" checked={reason === 'Product Defects'} onChange={handleReasonChange} />
                                <label className='ms-3' htmlFor="reason1">Product Defects</label>
                            </div>
                            <div>
                                <input type="radio" id="reason2" name="reason" value="Wrong Item Received" checked={reason === 'Wrong Item Received'} onChange={handleReasonChange} />
                                <label className='ms-3' htmlFor="reason2">Wrong Item Received</label>
                            </div>
                            <div>
                                <input type="radio" id="reason3" name="reason" value="Box Items Missing" checked={reason === 'Box Items Missing'} onChange={handleReasonChange} />
                                <label className='ms-3' htmlFor="reason3">Box Items Missing</label>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ReturnRequestForm