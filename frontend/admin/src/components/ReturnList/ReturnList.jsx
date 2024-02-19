import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
function ReturnList() {
    const [search, setSearch] = useState('')
    const [orders, setOrders] = useState([])
    const [toogle, setToogle] = useState(false)
    const handleSearch = (e) => {
        setSearch(e.target.value)

    }

    useEffect(() => {
        instance.get('/admin/returnorders', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setOrders(res.data.data)
        })
    }, [toogle])
    const handleChangeStatus = (status, orderId, productId) => {
        instance.patch('/admin/changereturnstatus', {
            orderId: orderId,

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
                                                            <td style={{ color: "#6c7293", textAlign: "center", width: "100px" }}>{order.orderedItems.price}</td>
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
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}



export default ReturnList