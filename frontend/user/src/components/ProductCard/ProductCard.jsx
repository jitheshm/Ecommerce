import React from 'react'
import { BASEURL } from "../../constants/constant.json"
import { Link } from 'react-router-dom'
function ProductCard({ product }) {
    return (
        <>
            <div className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                <div className='p-3'>
                    <img className="card-img-top" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70&crop=false" alt="Card image cap" />
                </div>
                <div className="card-body">
                    <h5 className="card-title "><b>Realme 9 pro plus</b></h5>

                    <p className="card-text mt-2"><b>₹ 19,999</b> <b style={{ color: "green" }}>20% OFF</b></p>
                </div>
            </div>

        </>
    )
}

export default ProductCard