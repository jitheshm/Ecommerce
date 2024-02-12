import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
function OrdersList() {
    const [search, setSearch] = useState('')
    const [orders, setOrders] = useState([])
    const [toogle, setToogle] = useState(false)
    const handleSearch = (e) => {
        setSearch(e.target.value)

    }

    useEffect(() => {
        instance.get('/admin/orders', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setOrders(res.data.data)
        })
    }, [toogle])
    const handleChangeStatus = (status, orderId, userId) => {
        instance.patch('/admin/changeorderstatus', {
            orderId: orderId,
            userId: userId,
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
            <div className='pt-5'>
                <div className="col-lg-11 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">All orders</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search products" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Customer Id</th>
                                            <th>Total Price</th>
                                            <th>Status</th>

                                            <th style={{ textAlign: "center", width: "250px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            orders.map((order) => {
                                                if (order.userId.startsWith(search) || search === "" || order._id.includes(search)) {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#6c7293" }}>{order._id}</td>
                                                            <td style={{ color: "#6c7293" }}>{order.orderDate}</td>
                                                            <td style={{ color: "#6c7293" }}>{order.userId}</td>
                                                            <td style={{ color: "#6c7293" }}>{order.orderAmount}</td>
                                                            <td style={{ color: "#6c7293" }}>{order.orderStatus}</td>

                                                            <td className='d-flex gap-3 ' style={{ width: "250px" }}>


                                                                <div className="nav-item dropdown" style={{ position: "initial" }}>
                                                                    <a className='btn btn-outline-success' id="profileDropdown" href="#" data-bs-toggle="dropdown">


                                                                        <p className="mb-0 d-none d-sm-block navbar-profile-name">Change Status</p>


                                                                    </a>
                                                                    {order.orderStatus != 'Cancelled' &&
                                                                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">







                                                                            <button className="dropdown-item preview-item" onClick={() => {
                                                                                handleChangeStatus('Shipped', order._id, order.userId)
                                                                            }}>

                                                                                <div className="preview-item-content">
                                                                                    <p className="preview-subject mb-1">Shipped</p>

                                                                                </div>

                                                                            </button>
                                                                            <button className="dropdown-item preview-item" onClick={() => {
                                                                                handleChangeStatus('Out for delivery', order._id, order.userId)
                                                                            }}>

                                                                                <div className="preview-item-content">
                                                                                    <p className="preview-subject mb-1">Out for delivery</p>

                                                                                </div>

                                                                            </button>
                                                                            <button className="dropdown-item preview-item" onClick={() => {
                                                                                handleChangeStatus('Delivered', order._id, order.userId)
                                                                            }}>

                                                                                <div className="preview-item-content">
                                                                                    <p className="preview-subject mb-1">Delivered</p>

                                                                                </div>

                                                                            </button>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {
                                                                    order.orderStatus != 'Cancelled' && order.orderStatus != 'Delivered'&& <button className='btn btn-outline-danger' onClick={() => {
                                                                        handleChangeStatus('Cancelled', order._id, order.userId)
                                                                    }}>
                                                                        Cancel
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
            </div>

        </>
    )
}

export default OrdersList