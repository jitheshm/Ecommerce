import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function ProductList() {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        instance.get('/admin/products', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setProducts(res.data.data)
        })
    }, [])


    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            instance.delete(`/admin/deleteproduct?id=${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res);
                setProducts(products.filter((product) => product._id !== id))
            })
        }

    }

    const handleListChange = (id) => {
        instance.patch('/admin/changelistproduct', { id: id }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setProducts(products.map((product) => {
                if (product._id === id) {
                    return {
                        ...product,
                        isListed: !product.isListed
                    }
                } else {
                    return product
                }
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
                                <h4 className="card-title col-4 mt-4">All Products</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search products" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>PID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Waranty</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: "center", width: "250px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            products.map((product) => {
                                                if (product.productName.startsWith(search) || search === "" || product._id.includes(search)) {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#6c7293" }}>{product._id}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.productName}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.aboutProduct}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.categoryId}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.waranty} years</td>
                                                            <td style={{ color: "#6c7293" }}>{product.isListed ? <span>Listed</span> : <span>Not listed</span>}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "250px" }}>
                                                                <Link to={`/editproduct/${product._id}`} className='btn btn-outline-warning'>Edit</Link>
                                                                <button className='btn btn-outline-success' onClick={() => {
                                                                    handleListChange(product._id)
                                                                }}>
                                                                    {!product.isListed?<span>List</span>:<span>Unlist</span>}
                                                                    </button>
                                                                {/* <button className='btn btn-outline-success'>List</button>
                                                                <button className='btn btn-outline-danger' onClick={() => {
                                                                    handleDelete(product._id)
                                                                }}>Delete</button> */}

                                                                <div className="nav-item dropdown" style={{ position: "initial" }}>
                                                                    <a className='btn btn-outline-primary' id="profileDropdown" href="#" data-bs-toggle="dropdown">


                                                                        <p className="mb-0 d-none d-sm-block navbar-profile-name">More</p>


                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">



                                                                        <Link to={`/viewproduct/${product._id}`} className="dropdown-item preview-item">

                                                                            <div className="preview-item-content">
                                                                                <p className="preview-subject mb-1">View Products</p>

                                                                            </div>

                                                                        </Link>

                                                                        <Link to={`/products/${product._id}/varients`} className="dropdown-item preview-item">

                                                                            <div className="preview-item-content">
                                                                                <p className="preview-subject mb-1">View Varients</p>

                                                                            </div>

                                                                        </Link>
                                                                        <Link to={`/addvarient/${product._id}`} className="dropdown-item preview-item">

                                                                            <div className="preview-item-content">
                                                                                <p className="preview-subject mb-1">Add varient</p>

                                                                            </div>

                                                                        </Link>
                                                                        <button className="dropdown-item preview-item" onClick={() => {
                                                                    handleDelete(product._id)}}>

                                                                            <div className="preview-item-content">
                                                                                <p className="preview-subject mb-1">Delete</p>

                                                                            </div>

                                                                        </button> 

                                                                    </div>
                                                                </div>
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

export default ProductList