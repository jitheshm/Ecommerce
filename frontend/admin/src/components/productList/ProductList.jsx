import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function ProductList() {
    const [products, setProducts] = useState([])
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
                setProducts(products.filter((product)=>product._id!==id))
            })
        }

    }

    return (
        <div className='mt-5 pt-2'>
            <Link to={'/addproduct'} className='btn btn-primary mt-5 mx-5'>Add product</Link>
            <table className="table table-dark mt-5 pt-5">
                <thead className=''>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Category</th>
                        <th scope="col-3">About</th>
                        <th scope="col">Islisted</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{product.productName}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.categoryId}</td>
                                    <td className='col-3'>{product.aboutProduct}</td>
                                    <td>{product.isListed ? <p>listed</p> : <p>not listed</p>}</td>
                                    <td>
                                        <Link to={`/editproduct/${product._id}`}>edit</Link>
                                        <button onClick={() => {
                                            handleDelete(product._id)
                                        }}>delete</button>

                                        <Link to={`/addvarient/${product._id}`}>Add varient</Link>

                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default ProductList