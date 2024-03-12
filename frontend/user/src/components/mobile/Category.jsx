import React from 'react'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import { Link } from 'react-router-dom'
import { BASEURL } from "../../constants/constant.json"
function Category() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        instance.get('/user/categories').then((res) => {
            console.log(res);
            setCategories(res.data.data)
        })
    }, [])
    return (
        <>
            <div className='left-top m-auto mb-4 row px-5   col-12 ' style={{ width: "100%", height: "50px", position: "fixed", top: 101, left: 0, zIndex: 10 }}>



                <div className='col-12 nameContainer ms-4'>
                    <h4>All Categories</h4>
                </div>

            </div>
            <div className='row mt-5 px-3'>
                {
                    categories.map((category) => {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <div className=' col-3 col-md-3 col-lg-2 mt-5 mt-md-0  d-flex justify-content-center' style={{ height: "125px", width: "124px" }}>

                                <Link to={`/search/${category.category}`} className=""  >
                                    <div className='p-3 m-auto' style={{ height: "70px", width: "78%", borderRadius: "78px", backgroundColor: "#a2a6c3" }}>
                                        <img className="card-img-top" src={`${BASEURL}/${category.imagesUrl[0]}`} alt="Card image cap" style={{ height: "100%", objectFit: "contain" }} />
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title "><b>{category.category}</b></h5>


                                    </div>
                                </Link>
                            </div >
                        )
                    })
                    
                }
                
                

            </div >
        </>

    )
}

export default Category