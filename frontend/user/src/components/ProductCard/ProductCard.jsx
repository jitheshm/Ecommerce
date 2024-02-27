import React, { useEffect, useState } from 'react'
import { BASEURL } from "../../constants/constant.json"
import { Link } from 'react-router-dom'
import instance from '../../axios'
function ProductCard({ product }) {
    const [offers, setOffers] = useState([])
    const [discount, setDiscount] = useState(0)
    const [displayOff, setDisplayOff] = useState({})
    useEffect(() => {
        if (product)
            instance.get(`user/availableoffers/${product.productDetails[0].categoryId}/${product.productId}`).then((res) => {
                console.log(res.data.data);
                setOffers(res.data.data);
                setDiscount(res.data.data.reduce((acc, curr) => {
                    if (curr.offerType === 'amount') {
                        return acc + curr.discount
                    }
                    else {
                        return acc + (product.salePrice * curr.discount / 100)
                    }
                }, 0))

                setDisplayOff(res.data.data.reduce((acc, curr) => {
                    if (curr.offerType === 'amount') {
                        return { amount: acc.amount + curr.discount, percentage: acc.percentage }
                    } else {
                        return { amount: acc.amount, percentage: acc.percentage + curr.discount }
                    }
                }, {
                    amount: 0,
                    percentage: 0
                }))

            })

    }, [product])
    return (
        <>
            <Link to={`/product/${product.productId}/${product.color}`} className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                <div className='p-3' style={{ height: "188px", width: "150px" }}>
                    <img className="card-img-top" src={`${BASEURL}/${product.imagesUrl[0]}`} alt="Card image cap" style={{ height: "100%", objectFit: "contain" }} />
                </div>
                <div className="card-body">
                    <h5 className="card-title "><b>{product.productDetails[0].productName}</b></h5>

                    <p className="card-text mt-2"><b>₹{product.salePrice - discount > 0 ? product.salePrice - discount : 0}</b> <b style={{ color: "green" }}>{displayOff.percentage}% {displayOff.percentage > 0 && displayOff.amount > 0 ? <span>+</span> : <span></span>} {displayOff.amount > 0 ? displayOff.amount : ""}&nbsp;OFF</b></p>
                </div>
            </Link>

        </>
    )
}

export default ProductCard