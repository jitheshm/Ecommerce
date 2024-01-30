import React from 'react'
import { BASEURL } from "../../constants/constant.json"
import { Link } from 'react-router-dom'
function ProductCard({ product }) {
    return (
        <>
            <Link to={`/product/${product.productId}/${product._id}`} className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                <div className='p-3'>
                    <img className="card-img-top" src={`${BASEURL}/${product.imagesUrl[0]}`} alt="Card image cap" />
                </div>
                <div className="card-body">
                    <h5 className="card-title "><b>{product.productDetails[0].productName}</b></h5>

                    <p className="card-text mt-2"><b>₹ {product.price}</b> <b style={{ color: "green" }}>20% OFF</b></p>
                </div>
            </Link>

        </>
    )
}

export default ProductCard