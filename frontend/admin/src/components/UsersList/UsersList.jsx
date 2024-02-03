import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function UsersList() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        instance.get('/admin/getusers', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setUsers(res.data.data)
        })
    }, [])


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
                                            <th style={{width: "50px"}}>Index</th>
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
                                            users.map((user,index) => {
                                                if (user.firstName.startsWith(search) || search === "" || user.email.startsWith(search) ||  user._id.startsWith(search)){
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#bcc0d7",width: "50px" }}>{index+1}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user._id}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.firstName}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.email}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.phone?user.phone:`NA`}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.dateOfJoin}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.isVerified ? <span>Verified</span> : <span>Not Verified</span>}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{user.isBlocked ? <span>Blocked</span> : <span>Active</span>}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "100px" }}>
                                                               
                                                                
                                                                {
                                                                    user.isBlocked?<button className='btn btn-outline-success' onClick={()=>handleUnblock(user._id)}>Unblock</button>:<button className='btn btn-outline-danger' onClick={() => handleBlock(user._id)}>Block</button>
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

export default UsersList