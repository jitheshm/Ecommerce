import React from 'react'
import './ProductSlide.css'
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from 'react'
import instance from '../../axios'
import { useState } from 'react'

function ProductSlide({ title }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        instance.get('/user/getproducts').then((res) => {
            console.log(res);
            setProducts(res.data.data)
        })
    }, [])

    return (
        <div className='container-fluid px-5 my-5 '>
            <div className="row">
                <div className="row">
                    <div className="col-md-9">
                        <h3>
                            {title}</h3>
                    </div>
                    <div className="col-md-3">
                        {/* Controls */}
                        <div className="controls pull-right ">
                            <a className="left fa fa-chevron-left btn btn-success" href="#carousel-example" data-slide="prev" /><a className="right fa fa-chevron-right btn btn-success" href="#carousel-example" data-slide="next" />
                        </div>
                    </div>
                </div>
                <div id="carousel-example" className="carousel slide " data-ride="carousel">
                    {/* Wrapper for slides */}
                    <div className="">

                        <div className="item">

                            <div className="d-flex productSlide">
                                
                                {
                                    products.map((product) => {
                                        return <ProductCard key={`${title}_${product._id}`} product={product} />
                                    })
                                }



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductSlide