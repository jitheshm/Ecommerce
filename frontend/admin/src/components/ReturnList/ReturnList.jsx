import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
function ReturnList() {
    const [search, setSearch] = useState('')
    const [orders, setOrders] = useState([])
    const [toogle, setToogle] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const handleSearch = (e) => {
        setSearch(e.target.value)

    }

    useEffect(() => {
        instance.get(`/admin/orders/return?page=${page}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setOrders(res.data.data)
            setTotalPages(res.data.totalPages);
        })
    }, [toogle, page])
    const handleChangeStatus = (status, orderId, productId) => {
        instance.patch(`/admin/orders/${orderId}/return`, {
            

            productId: productId,
            status: status
        }, {

            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setToogle(!toogle)

        }).catch((err) => {
            console.log(err);
        })
    }

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

    return (
        <>
            <div className='pt-5 px-2'>
                <div className="col-lg-12 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">Return Products</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search products" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table" >
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: "center", width: "230px" }}>Order ID</th>

                                            <th style={{ textAlign: "center", width: "230px" }}>Product Id</th>
                                            <th style={{ textAlign: "center", width: "250px" }}> Return Reason</th>
                                            <th style={{ textAlign: "center", width: "100px" }}>Total Price</th>
                                            <th style={{ textAlign: "center", width: "200px" }}>Return Status</th>

                                            <th style={{ textAlign: "center", width: "250px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            orders.map((order) => {
                                                if (order.orderedItems.productId.startsWith(search) || search === "" || order._id.includes(search)) {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#6c7293", textAlign: "center" }}>{order._id}</td>

                                                            <td style={{ color: "#6c7293", textAlign: "center" }}>{order.orderedItems.productId}</td>
                                                            <td style={{ color: "#6c7293", textAlign: "center" }}>{order.orderedItems.returnReason}</td>
                                                            <td style={{ color: "#6c7293", textAlign: "center", width: "100px" }}>{order.orderedItems.totalprice}</td>
                                                            <td style={{ color: "#6c7293", textAlign: "center" }}>{order.orderedItems.returnStatus}</td>

                                                            <td className='d-flex gap-3 ' >


                                                                {
                                                                    order.orderedItems.returnStatus === 'pending' &&
                                                                    <>
                                                                        <button className='btn btn-outline-success' onClick={() => {
                                                                            handleChangeStatus('Confirmed', order._id, order.orderedItems.productId)
                                                                        }}>
                                                                            Confirm
                                                                        </button>
                                                                        <button className='btn btn-outline-danger' onClick={() => {
                                                                            handleChangeStatus('Cancelled', order._id, order.orderedItems.productId)
                                                                        }}>
                                                                            Reject
                                                                        </button>
                                                                    </>
                                                                }

                                                                {

                                                                    order.orderedItems.returnStatus === 'Confirmed' &&
                                                                    <button className='btn btn-outline-success' onClick={() => {
                                                                        handleChangeStatus('Returned', order._id, order.orderedItems.productId)
                                                                    }}>
                                                                        Return
                                                                    </button>
                                                                }
                                                                {

                                                                    order.orderedItems.returnStatus === 'Returned' &&
                                                                    <button className='btn btn-outline-success' onClick={() => {
                                                                        handleChangeStatus('Refund', order._id, order.orderedItems.productId)
                                                                    }}>
                                                                        Refund
                                                                    </button>
                                                                }


                                                            </td>
                                                        </tr>
                                                    )
                                                } else {
                                                    return null
                                                }
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
            </div >

        </>
    )
}



export default ReturnList