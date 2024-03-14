import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import OrderCard from '../OrderCard/OrderCard';

function Orders() {
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()
    const [toogle, setToogle] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        instance.get(`/user/order?page=${page}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setOrders(res.data.data)
            setTotalPages(res.data.totalPages);
        }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())
            }
        })
    }, [page, toogle])

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
            <div className='col-md-7 py-md-5 address border mt-md-3' style={{ position: "initial", float: "none" }}>

                <h4 className='d-none d-md-block'><b>Orders</b></h4>

                <div className='left-top m-auto mb-4 row px-5  col-12 d-md-none' style={{ width: "100%", height: "40px" }}>



                    <div className='col-6 nameContainer ms-4'>
                        <h4>My Orders</h4>
                    </div>

                </div>

                {
                    orders.map((order) => {
                        return (
                            <>
                                <OrderCard order={order} toogle={toogle} setToogle={setToogle}/>
                            </>
                        )
                    })
                }






                <div className='col-12 text-center '>
                    <nav aria-label="Page navigation example " >
                        <ul className="pagination justify-content-center  mt-4">
                            <div className='d-flex'>
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
                            </div>
                        </ul>
                    </nav>

                </div>

            </div>

        </>
    )
}

export default Orders