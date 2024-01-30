/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
function CategoryForm({category, setCategory,api,method,id,title,btnName}) { 
    const [categoryNameError, setCategoryNameError] = useState(false)
    


   

    const handleSubmit = () => {
        if (category.trim() === "") {
            setCategoryNameError(true)
            return;
        } else {
            setCategoryNameError(false)
        }
       
        
        instance.request({
            method:method,
            url:api,
            data:{
                id,
                category,
               
            },
            headers:{
                Authorization: Cookies.get('token')
            }
        
        }).then(() => {
            console.log("success");

        })

    }
    return (
        <>

            <form className='container-fluid mt-5 p-5 col-8 text-white'>
                {/* 2 column grid layout with text inputs for the first and last names */}
                <h3 className='mb-5 text-center'>{title}</h3>
                <div className="row mb-4">
                    <div className="col ">
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Category name</label>
                            {categoryNameError && <p style={{ color: "red" }}>please enter category name</p>}
                            <input type="text" id="form6Example1" className="form-control" value={category} onChange={(e) => {
                                setCategory(e.target.value)
                            }} />

                        </div>
                    </div>
                    
                </div>
                {/* Text input */}
               
                {/* Submit button */}
                <button data-mdb-ripple-init type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>{btnName}</button>
            </form>

        </>
    )
}

export default CategoryForm