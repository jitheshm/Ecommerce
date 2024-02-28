import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../axios'
import Cookies from 'js-cookie';
import generateExcel from '../../utils/generateExcel';

function SalesReport() {

    const [orders, setOrders] = useState([])
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 86400000).toISOString().split('T')[0])
    const [filter, setFilter] = useState('Daily')

    useEffect(() => {
        instance.get(`/admin/salesreport/${startDate}/${endDate}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            setOrders(res.data.data)
        })
    }, [startDate, endDate])

    const handleFilter = (e) => {
        if (e.target.value == 'Custom') {
            setStartDate(new Date().toISOString().split('T')[0])
            setEndDate(new Date(new Date().getTime() + 86400000).toISOString().split('T')[0])
            setFilter(e.target.value)
        } else if (e.target.value == 'Daily') {
            setStartDate(new Date().toISOString().split('T')[0])
            setEndDate(new Date(new Date().getTime() + 86400000).toISOString().split('T')[0])
            setFilter(e.target.value)

        } else if (e.target.value == 'Weekly') {
            setStartDate(new Date(new Date().getTime() - 604800000).toISOString().split('T')[0])
            setEndDate(new Date().toISOString().split('T')[0])
            setFilter(e.target.value)
        } else if (e.target.value == 'Monthly') {
            setStartDate(new Date(new Date().getTime() - 2592000000).toISOString().split('T')[0])
            setEndDate(new Date().toISOString().split('T')[0])
            setFilter(e.target.value)
        } else if (e.target.value == 'Yearly') {
            setStartDate(new Date(new Date().getTime() - 31536000000).toISOString().split('T')[0])
            setEndDate(new Date().toISOString().split('T')[0])
            setFilter(e.target.value)
        }
    }

    const handleExcel = () => {
        generateExcel(orders)  
    }

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
                                    }} value={startDate} readOnly={filter != 'Custom' ? true : false} />
                                    <input type="date" className="form-control" placeholder="" style={{ color: "white" }} onChange={(e) => {
                                        setEndDate(e.target.value)
                                    }} value={endDate} readOnly={filter != 'Custom' ? true : false} />
                                    <select className="form-control" style={{ color: "white", backgroundColor: "#2A3038", border: 'none' }} onChange={handleFilter} value={filter}>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </form>
                                <div className='col-6 d-flex justify-content-end'>
                                    Download as:
                                    <div className='ms-3'>
                                        <button className='btn btn-outline-success me-3'> PDF</button>
                                        <button className='btn btn-outline-success' onClick={handleExcel}> Excel</button>
                                    </div>
                                </div>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Date</th>
                                            <th>Products</th>
                                            <th>Offer discount</th>
                                            <th>Coupon discount</th>
                                            <th>Total discount</th>
                                            <th>Revenue</th>



                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            orders.map((order, index) => {

                                                return (
                                                    // eslint-disable-next-line react/jsx-key
                                                    <tr >
                                                        <td style={{ color: "#6c7293" }}>{index + 1}</td>
                                                        <td style={{ color: "#6c7293" }}>{new Date(order._id).toDateString()}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.ProductsCount}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.discount}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.couponDiscount}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.couponDiscount + order.discount}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.revenue}</td>


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