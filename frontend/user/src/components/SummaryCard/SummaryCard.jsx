import React, { useEffect, useState } from 'react'
import { BASEURL } from '../../constants/constant.json'
import instance from '../../axios'
function SummaryCard({ item }) {
    const [offers, setOffers] = useState([])
    const [discount, setDiscount] = useState(0)
    const [displayOff, setDisplayOff] = useState({})

    useEffect(() => {
        if (item)
            instance.get(`user/availableoffers/${item.productDetails.categoryId}/${item.products.productId}`).then((res) => {
                console.log(res.data.data);
                setOffers(res.data.data);
                setDiscount(res.data.data.reduce((acc, curr) => {
                    if (curr.offerType === 'amount') {
                        return acc + curr.discount
                    }
                    else {
                        return acc + (item.varient.salePrice * curr.discount / 100)
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

    }, [item])
    return (
        <>
            <div className='card mb-3'>


                <div className=" d-flex flex-row  ">
                    <div className='p-5 col-2 '>
                        <img className="card-img-top " src={BASEURL + "/" + item.varient.imagesUrl[0]} alt="Card image cap" style={{ height: "65px", width: "50px" }} />
                    </div>
                    <div className="card-body pt-4 col-6 ms-2 mt-2">
                        <h4 className="card-title "><>{item.productDetails.productName}</></h4>
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

                        <p className="card-text mt-2 row"><h4 className='col-3'><b>₹ {item.varient.salePrice - discount > 0 ? item.varient.salePrice - discount : 0}</b></h4> <b className='col-3' style={{ color: "green" }}>{displayOff.percentage}% {displayOff.percentage > 0 && displayOff.amount > 0 ? <span>+</span> : <span></span>} {displayOff.amount > 0 ? displayOff.amount : ""}&nbsp;OFF</b></p>
                        {/* <div style={{ height: "30px" }}>{stockError && <p style={{ color: "red" }}>Out of stock</p>}</div> */}
                    </div>


                </div>


            </div>
        </>
    )
}

export default SummaryCard