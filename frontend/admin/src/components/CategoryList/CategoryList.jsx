import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function CategoryList() {
    const [category, setCategory] = useState([])
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
        if (confirm('Are you sure you want to delete this user?')) {
            instance.delete(`/admin/deleteCategory?id=${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res);
                setCategory(category.filter((obj)=>obj._id!==id))
            })
        }

    }

    return (
        <div className='mt-5 pt-2'>
            <Link to={'/addcategory'} className='btn btn-primary mt-5 mx-5'>Add Category</Link>
            <table className="table table-dark mt-5 pt-5">
                <thead className=''>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        category.map((obj) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{obj.category}</td>
                                   
                                    <td>
                                        <Link to={`/editcategory/${obj._id}`}>edit</Link>
                                        <button onClick={() => {
                                            handleDelete(obj._id)
                                        }}>delete</button>

                                       

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

export default CategoryList