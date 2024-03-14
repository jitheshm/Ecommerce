import React from 'react'
import { BASEURL } from "../../constants/constant"
import { Link } from 'react-router-dom'
function SearchCard({product}) {
    return (
        <Link to={`/product/${product.productId}/${product.color}`} className="card mt-5 mt-md-0 mb-3">


           
                <div className='d-flex flex-row'>


                    <div className='col-5 col-sm-2 py-5 ps-2'>
                        <img className="card-img-top " src={product ? BASEURL + "/" + product.imagesUrl[0] : ""} alt="Card image cap" />
                    </div>
                    <div className="card-body pt-4 col-6 col-md-6 ms-2 mt-2">
                        <h4 className="card-title "><>{product.productDetails[0].productName}</></h4>
                        <div className="d-flex flex-row">
                            <div className="text-warning mb-1 me-2">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fas fa-star-half-alt" />
                                <span className="ms-1">
                                    4.5
                                </span>
                            </div>

                        </div>
                        <div className='mt-3'>    
                        <ul>
                            <li>{product.color} color</li>
                            <li>{product.productDetails[0].waranty} year Waranty</li>
                        </ul>

                    </div>

                        <p className="card-text mt-2 row"><h4 className='col-md-5'><b>₹ {product.salePrice-product.discount}</b></h4></p>
                        
                    </div>
                    
                </div>
                
           



        </Link>
    )
}

export default SearchCard