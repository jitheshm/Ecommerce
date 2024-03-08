/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import instance from '../../axios';
import moment from 'moment'
function Wallet() {

    const [balance, setBalance] = useState(0.00)
    const [transactions, setTransactions] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        instance.get('/user/wallet', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setBalance(res.data.data.balance)
            setTransactions(res.data.data.transactions)
        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())
            }

        })
    }, [])


    return (
        <>
            <div className='col-md-7 '>
                <div className='px-5 pt-5 address border mt-3 row' style={{ height: "180px" }}>
                    <h4><b>My Wallet</b></h4>
                    <div className='col-md-3 col-6 border text-white mb-4 text-center' style={{ "backgroundColor": "#1E1F29", borderRadius: "10px" }}>


                        <div className='mt-5 text-center '>
                            <h4 style={{color:"white"}} ><b>Wallet Balance</b></h4>
                            <h4 style={{color:"white"}}>₹ {balance}</h4>
                        </div>


                    </div>




                </div>

                <div className='px-5 pt-5 address  mt-3 row'>
                    <h4><b>Transaction History</b></h4>
                    <div className="d-flex flex-row align-items-center mb-3 mt-4">
                        <div className='p-3 col-4 text-center'>
                            <b>Date</b>
                        </div>
                        <div className="card-body col-4 row ms-2 text-center">
                            <b>Transaction Id</b>
                        </div>
                        <div className="card-body col-4 row ms-2 text-center">
                            <b>Amount</b>
                        </div>

                    </div>
                    {transactions.map((data) => {
                        return (
                            <div className="card d-flex flex-row align-items-center mb-3">
                                <div className='p-3 col-4 text-center '>
                                    {moment(data.date).format('D-MM-YYYY, h:mm:ss a')}
                                </div>
                                <div className="card-body col-4 row ms-2 text-center">
                                    <b>{data.transactionId}</b>
                                </div>
                                <div className="card-body col-4 row ms-2  text-center">
                                    {
                                        data.type === 'debit' ? <b className='text-danger'>-{data.amount}</b> : <b className='text-success'>+{data.amount}</b>
                                    }
                                    
                                    
                                </div>

                            </div>
                        )
                    })

                    }




                </div>

            </div>
        </>
    )
}

export default Wallet