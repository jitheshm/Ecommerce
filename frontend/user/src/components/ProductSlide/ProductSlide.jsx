import React from 'react'
import './ProductSlide.css'
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from 'react'
import instance from '../../axios'
import { useState } from 'react'

function ProductSlide({ title,api }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        instance.get(api).then((res) => {
            console.log(title,res);
            setProducts(res.data.data)
        })
    }, [])
   
    return (
        <>
            <div className='container-fluid mb-md-4  landing '> 
                <div className='ms-4'>
                    <h3><b style={{color:"black"}}>{title}</b></h3> 
                    <hr style={{borderColor:"black"}} />
                </div>
                <div className=' m-md-5 d-flex gap-md-5 ms-4 slidebar '>
                   {
                     
                     products.map((product)=>{
                        return <ProductCard product={product}/> 
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

export default ProductSlide