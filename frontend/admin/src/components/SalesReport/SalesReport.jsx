import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../axios'
import Cookies from 'js-cookie';
import generateExcel from '../../utils/generateExcel';
import generatePDF from '../../utils/generatePdf';

function SalesReport() {

    const [orders, setOrders] = useState([])
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 86400000).toISOString().split('T')[0])
    const [filter, setFilter] = useState('Daily')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        instance.get(`/admin/salesreport/${startDate}/${endDate}?page=${page}&&limit=10`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            setOrders(res.data.data)
            setTotalPages(res.data.totalPages);
        })
    }, [startDate, endDate, page])

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

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
            let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
            console.log(tomorrow);

            setEndDate(tomorrow)
            setFilter(e.target.value)
        } else if (e.target.value == 'Monthly') {
            setStartDate(new Date(new Date().getTime() - 2592000000).toISOString().split('T')[0])
            let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
            console.log(tomorrow);

            setEndDate(tomorrow)
            setFilter(e.target.value)
        } else if (e.target.value == 'Yearly') {
            setStartDate(new Date(new Date().getTime() - 31536000000).toISOString().split('T')[0])
            let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
            console.log(tomorrow);

            setEndDate(tomorrow)
            setFilter(e.target.value)
        }
    }

    const handleExcel = () => {
        instance.get(`/admin/salesreport/${startDate}/${endDate}?page=${page}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            generateExcel(res.data.data,startDate,endDate)
            
        })
        
    }
    const handlePdf = () => {
        instance.get(`/admin/salesreport/${startDate}/${endDate}?page=${page}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            generatePDF(res.data.data,startDate,endDate)
            
            
        })
        
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
                                        <button className='btn btn-outline-success me-3' onClick={handlePdf}> PDF</button>
                                        <button className='btn btn-outline-success' onClick={handleExcel}> Excel</button>
                                    </div>
                                </div>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table text-center" >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Date</th>
                                            <th>OrderId</th>

                                            <th>Delivery Address</th>
                                            <th>Products</th>
                                            <th>Sale Price</th>
                                            <th>quantity</th>
                                            <th>Amount</th>
                                            <th>Discount</th>

                                            <th>Total</th>



                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            orders.map((order, index) => {

                                                return (
                                                    // eslint-disable-next-line react/jsx-key
                                                    <tr >
                                                        <td style={{ color: "#6c7293" }}>{index + 1+(page-1)*10}</td>
                                                        <td style={{ color: "#6c7293" }}>{new Date(order.orderDate).toDateString()}</td>
                                                        <td style={{ color: "#6c7293" }}>{order._id}</td>
                                                        <td style={{ color: "#6c7293", whiteSpace: "normal" }}>{
                                                            order.deliveryAddress.name} <br /> {order.deliveryAddress.street + ', ' + order.deliveryAddress.city + ', ' + order.deliveryAddress.state + ', ' + order.deliveryAddress.pincode

                                                            }</td>
                                                        <td style={{ color: "#6c7293" }}>{order.productDetails.productName} ({order.varients.color})</td>
                                                        <td style={{ color: "#6c7293" }}>{order.orderedItems.salePrice}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.orderedItems.quantity}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.orderedItems.salePrice * order.orderedItems.quantity}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.orderedItems.discount}</td>
                                                        <td style={{ color: "#6c7293" }}>{order.orderedItems.totalprice}</td>


                                                    </tr>
                                                )

                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center  mt-4">
                                        <li className="page-item">
                                            {
                                                page != 1 && <button disabled={page === 1} className="page-link" aria-label="Previous" onClick={handlePrevPage}>
                                                    <span aria-hidden="true">«</span>
                                                    <span className="sr-only">Previous</span>
                                                </button>
                                            }

                                        </li>
                                        {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                                        <li className="page-item">
                                            {
                                                page != totalPages && <button className="page-link" aria-label="Next" onClick={handleNextPage}>
                                                    <span aria-hidden="true">»</span>
                                                    <span className="sr-only">Next</span>
                                                </button>
                                            }

                                        </li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>



    )
}

export default SalesReport