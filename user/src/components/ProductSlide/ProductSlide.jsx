import React from 'react'
import './ProductSlide.css'
import ProductCard from '../ProductCard/ProductCard'

function ProductSlide() {
    return (
        <div className='container-fluid px-5 my-5 '>  
            <div className="row">
                <div className="row">
                    <div className="col-md-9">
                        <h3>
                            Carousel Product Cart Slider</h3>
                    </div>
                    <div className="col-md-3">
                        {/* Controls */}
                        <div className="controls pull-right hidden-xs">
                            <a className="left fa fa-chevron-left btn btn-success" href="#carousel-example" data-slide="prev" /><a className="right fa fa-chevron-right btn btn-success" href="#carousel-example" data-slide="next" />
                        </div>
                    </div>
                </div>
                <div id="carousel-example" className="carousel slide hidden-xs" data-ride="carousel">
                    {/* Wrapper for slides */}
                    <div className="">
                        
                        <div className="item">
                            <div className="d-flex productSlide">
                                
                                <ProductCard/> 
                                <ProductCard/> 
                                <ProductCard/> 
                                <ProductCard/> 
                                <ProductCard/> 
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductSlide