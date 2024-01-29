import React from 'react'

function ProductCard() {
    return (
        <>
            <div className="col-sm-3">
                <div className="col-item">
                    <div className="photo">
                        <img src="http://placehold.it/350x260" className="img-responsive" alt="a" />
                    </div>
                    <div className="info">
                        <div className="row">
                            <div className="price col-md-6">
                                <h5>
                                    Product with Variants</h5>
                                <h5 className="price-text-color">
                                    $199.99</h5>
                            </div>
                            <div className="rating hidden-sm col-md-6">
                                <i className="price-text-color fa fa-star" /><i className="price-text-color fa fa-star">
                                </i><i className="price-text-color fa fa-star" /><i className="price-text-color fa fa-star">
                                </i><i className="fa fa-star" />
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