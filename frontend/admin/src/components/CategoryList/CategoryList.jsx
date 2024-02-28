import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
function CategoryList() {
    const [category, setCategory] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        instance.get('/admin/getcategories', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setCategory(res.data.data)
        })
    }, [])


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
                instance.delete(`/admin/deleteCategory?id=${id}`, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res);
                    setCategory(category.filter((obj) => obj._id !== id))
                })
            }

        })
       

    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <div className='pt-5'>
                <div className="col-lg-10 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">Categories</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search categories" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table text-center" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "50px" }}>Index</th>
                                            <th>CID</th>
                                            <th>Name</th>
                                            <th style={{ textAlign: "center", width: "200px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            category.map((catObj, index) => {
                                                if (catObj.category.startsWith(search) || search === "") {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#bcc0d7", width: "50px" }}>{index + 1}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{catObj._id}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{catObj.category}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "200px" }}>

                                                                <Link to={`/editcategory/${catObj._id}`} className='btn btn-outline-warning'>Edit</Link>


                                                                <button className='btn btn-outline-danger' onClick={() => handleDelete(catObj._id)}>Delete</button>


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

export default CategoryList