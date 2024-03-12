/* eslint-disable react/jsx-key */
import React from 'react'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import CategoryCard from '../CategoryCard/CategoryCard'
function CategorySlide() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        instance.get('/user/categories').then((res) => {
            console.log(res);
            setCategories(res.data.data)
        })
    }, [])

    return (
        <>
            <div className='container-fluid mb-0 landing '>
                {/* <div className='ms-4'>
                    <h3><b style={{ color: "black" }}>Categories</b></h3>
                    <hr style={{ borderColor: "black" }} />
                </div> */}
                <div className=' m-md-5 d-flex gap-md-5 ms-4 slidebar '>
                    {

                        categories.map((category) => {
                            return <CategoryCard category={category} />
                        })
                    }


                    {/* <ProductCard/> 
                    <ProductCard/> 
                    <ProductCard/> 
                    <ProductCard/>  */}





                </div>
            </div>


        </>

    )
}

export default CategorySlide