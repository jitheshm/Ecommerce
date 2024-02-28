import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
function CouponList() {
    const [coupons, setCoupons] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        instance.get('/admin/getallcoupons', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);

            setCoupons(res.data.data)
        })
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure to delete it?",
            background: '#191C24',
            showCancelButton: true,
            confirmButtonText: "Confirm",
            customClass: {
                title: 'text-light',
                confirmButton: 'danger-btn-btn'
            }

        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/admin/deletecoupon/${id}`, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res);
                    setCoupons(coupons.filter((coupon) => {
                        return coupon.couponId !== id
                    }))
                })
            }

        })

    }
    return (
        <>
            <div className='pt-5'>
                <div className="col-lg-11 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">Coupons</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search coupons" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table text-center" >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "50px" }}>Index</th>
                                            <th>Coupon Id</th>
                                            <th>Expire Date</th>
                                            <th>Used Users/Max Users</th>
                                            <th>Discount Type</th>
                                            <th>Discount</th>
                                            <th style={{ textAlign: "center", width: "200px" }}>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            coupons.map((couponObj, index) => {
                                                if (couponObj.couponId.startsWith(search) || search === "") {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#bcc0d7", width: "50px" }}>{index + 1}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{couponObj.couponId}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{new Date(couponObj.expireDate).toDateString()} {new Date(couponObj.expireDate).toLocaleTimeString()}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{couponObj.usedUsers}/{couponObj.maxUsers}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{couponObj.discountType}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{couponObj.discount}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "200px" }}>

                                                                <Link to={`/editcoupon/${couponObj.couponId}`} className='btn btn-outline-warning'>Edit</Link>


                                                                <button className='btn btn-outline-danger' onClick={() => handleDelete(couponObj.couponId)}>Delete</button>


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

export default CouponList