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

    const handleSearch=(e)=>{
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
                                            <th style={{ textAlign: "center", width: "300px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            products.map((product) => {
                                                if(product.productName.startsWith(search) || search === "" || product._id.includes(search)){
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#6c7293" }}>{product._id}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.productName}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.aboutProduct}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.categoryId}</td>
                                                            <td style={{ color: "#6c7293" }}>{product.waranty} years</td>
                                                            <td style={{ color: "#6c7293" }}>{product.isListed ? <span>Listed</span> : <span>Not listed</span>}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "300px" }}>
                                                                <Link to={`/editproduct/${product._id}`}  className='btn btn-outline-warning'>Edit</Link>
                                                                <button className='btn btn-outline-primary'>View</button>
                                                                <button className='btn btn-outline-success'>List</button>
                                                                <button className='btn btn-outline-danger' onClick={() => {
                                                                    handleDelete(product._id)
                                                                }}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }else{
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