import React from 'react'
import { BASEURL } from "../../constants/constant.json"
function SearchCard({product}) {
    return (
        <div className='card mb-3 mt-3'>


            <div className=" d-flex flex-row  ">
                <div className='p-5 col-3'>
                    <img className="card-img-top " src={product ? BASEURL + "/" + product.imagesUrl[0] : noImage} alt="Card image cap" style={{ height: "120px", width: "100px" }} />
                </div>
                <div className="card-body pt-4 col-6 ms-2 mt-2">
                    <h4 className="card-title "><b>{product.productDetails[0].productName}</b></h4>
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
                    {/* <div style={{ height: "30px" }}>{stockError && <p style={{ color: "red" }}>Out of stock</p>}</div> */}
                </div>

                <div className='col-2'>   
                    <h3><b>₹ {product.salePrice}</b></h3>
                    <h5><s>₹ {product.actualPrice}</s><b className='col-3 ms-3' style={{ color: "green" }}>20% OFF</b> </h5>
                </div>

            </div>



        </div>
    )
}

export default SearchCard