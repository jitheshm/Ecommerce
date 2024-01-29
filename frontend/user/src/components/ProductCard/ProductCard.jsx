import React from 'react'
import { BASEURL } from "../../constants/constant.json"
function ProductCard({ product }) {
    return (
        <>
            <div className="col-sm-3">
                <div className="col-item">
                    <div className="photo">
                        <img src={BASEURL + "/" + product.imagesUrl[0]} className="img-responsive" alt="" />
                    </div>
                    <div className="info">
                        <div className="row">
                            <div className="price col-md-6">
                                <h5>
                                    {product.productDetails[0].productName}</h5>
                                <h5 className="price-text-color">
                                    {product.price}</h5>
                            </div>
                            <div className="rating hidden-sm col-md-6">
                                <i className="price-text-color fa fa-star" />
                                <i className="price-text-color fa fa-star">
                                </i><i className="price-text-color fa fa-star" />
                                <i className="price-text-color fa fa-star" />
                                <i className="fa fa-star" />
                            </div>
                        </div>

                        <div className="clearfix">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard