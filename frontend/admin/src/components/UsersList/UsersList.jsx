import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function UsersList() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        instance.get(`/admin/getusers?page=${page}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setUsers(res.data.data)
            setTotalPages(res.data.totalPages);
        })
    }, [page])

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


    const handleBlock = (id) => {

        instance.get(`/admin/blockuser?id=${id}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setUsers(users.map((user) => {
                if (user._id === id) {
                    user.isBlocked = true
                }
                return user
            }))
        })


    }
    const handleUnblock = (id) => {

        instance.get(`/admin/unblockuser?id=${id}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setUsers(users.map((user) => {
                if (user._id === id) {
                    user.isBlocked = false
                }
                return user
            }))
        })


    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <div className='pt-5'>
                <div className="col-lg-11 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">Users</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search users" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table text-center" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "50px" }}>Index</th>
                                            <th>UID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>DOJ</th>
                                            <th>Is verified</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: "center", width: "100px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            users.map((user, index) => {
                                                if (user.firstName.startsWith(search) || search === "" || user.email.startsWith(search) || user._id.startsWith(search)) {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#bcc0d7", width: "50px" }}>{index + 1+((page-1)*10)}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user._id}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.firstName}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.email}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.phone ? user.phone : `NA`}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.dateOfJoin}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.isVerified ? <span>Verified</span> : <span>Not Verified</span>}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.isBlocked ? <span>Blocked</span> : <span>Active</span>}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "100px" }}>


                                                                {
                                                                    user.isBlocked ? <button className='btn btn-outline-success' onClick={() => handleUnblock(user._id)}>Unblock</button> : <button className='btn btn-outline-danger' onClick={() => handleBlock(user._id)}>Block</button>
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
            </div>

        </>

    )
}

export default UsersList