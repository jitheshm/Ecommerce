import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../axios'
import Cookies from 'js-cookie';

function SalesReport() {

    const [orders, setOrders] = useState([])
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

    useEffect(() => {
        instance.get(`/admin/salesreport/${startDate}/${endDate}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
        })
    }, [startDate, endDate])



    return (
        <>
            <div className='pt-5'>
                <div className="col-lg-11 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">Sales Report</h4>

                            </div>
                            <div className='mb-5 row'>
                                <form className="nav-link  d-none d-lg-flex search col-6 gap-5">
                                    <input type="date" className="form-control" placeholder="" style={{ color: "white" }} onChange={(e) => {
                                        setStartDate(e.target.value)
                                    }} value={startDate} />
                                    <input type="date" className="form-control" placeholder="" style={{ color: "white" }} onChange={(e) => {
                                        setEndDate(e.target.value)
                                    }} value={endDate} />
                                </form>
                                <div className='col-6 d-flex justify-content-end'>
                                    Download as:
                                    <div className='ms-3'>
                                        <button className='btn btn-outline-success me-3'> PDF</button>
                                        <button className='btn btn-outline-success'> Excel</button>
                                    </div>
                                </div>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Date</th>
                                            <th>Orders</th>
                                            <th>Revenue</th>
                                            <th>Cancelled Orders</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            orders.map((order, index) => {

                                                return (
                                                    // eslint-disable-next-line react/jsx-key
                                                    <tr >
                                                        <td style={{ color: "#6c7293" }}>{index + 1}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.orderDate}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.count}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.revenue}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.cancelled}</td>

                                                    </tr>
                                                )

                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>



    )
}

export default SalesReport