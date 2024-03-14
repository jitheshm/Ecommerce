import React, { useEffect, useState } from 'react'
import { BASEURL } from "../../constants/constant"
import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
    return (
        <>
        <div className='card col-5 col-md-3 col-lg-2 mt-5 mt-md-0 mx-2 d-flex justify-content-center' style={{ height: "125px", width: "155px" }}>

            <Link to={`/search/${category.category}`} className=""  >
                <div className='p-3 m-auto' style={{ height: "70px", width: "100%" }}>
                    <img className="card-img-top" src={`${BASEURL}/${category.imagesUrl[0]}`} alt="Card image cap" style={{ height: "100%", objectFit: "contain" }} />
                </div>
                <div className="card-body text-center">
                    <h5 className="card-title "><b>{category.category}</b></h5>


                </div>
            </Link>
        </div>

        </>
    )
}

export default CategoryCard