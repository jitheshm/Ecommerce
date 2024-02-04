/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function CategoryForm({ api, method, id, title, btnName }) {
    const [categoryNameError, setCategoryNameError] = useState(false)
    const [category, setCategory] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            instance.get(`/admin/getcategory/${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data.data);
                setCategory(res.data.data.category)
            })
        }
    }, [])


    const handleSubmit = () => {
        if (category.trim() === "") {
            setCategoryNameError(true)
            return;
        } else {
            setCategoryNameError(false)
        }


        instance.request({
            method: method,
            url: api,
            data: {
                id,
                category,

            },
            headers: {
                Authorization: Cookies.get('token')
            }

        }).then(() => {
            console.log("success");
            navigate('/category')

        })

    }
    return (
        <>
            <div className='pt-5'>
                <div className="col-8 m-auto mt-5 grid-margin">
                    <div className="card">
                        <div className="card-body mt-3">
                            <h4 className="card-title ">{title}</h4>
                            <form className="form-sample mt-5 ">

                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-md-6 col-form-label">Category Name</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control text-white" value={category} onChange={(e) => {
                                                    setCategoryNameError(false)
                                                    setCategory(e.target.value)
                                                }} />
                                                <div style={{ height: "30px" }}>
                                                    {categoryNameError && <p className='text-danger'>Category is required</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <button type='button' className='btn-inverse-success mt-4' onClick={handleSubmit}>{btnName}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CategoryForm