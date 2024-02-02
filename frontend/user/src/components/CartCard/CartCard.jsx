import React from 'react'

function CartCard() {
    return (
        <div className='card mb-3'>


            <div className=" d-flex flex-row  ">
                <div className='p-5 col-2 '>
                    <img className="card-img-top " src={`https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/z/3/-original-imagtc5fqyz8tu4c.jpeg?q=70`} alt="Card image cap" />
                </div>
                <div className="card-body pt-4 col-6 ms-2 mt-2">
                    <h4 className="card-title "><>svxkbhc</></h4>
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

                    <p className="card-text mt-2 row"><h4 className='col-3'><b>₹ 545848</b></h4> <b className='col-3' style={{ color: "green" }}>20% OFF</b></p>
                </div>
                <div className='col-2 text-end pe-4 pt-4'>
                    <i className="fa-solid fa-trash " style={{ color: '#15161d', fontSize: "19px" }} />
                </div>

            </div>
            <div className='px-5 mb-4'>
                <div className='row col-6'>
                    <div className='col-1'>
                        <i className="fa-solid fa-circle-minus" style={{ color: '#15161d', fontSize: "19px" }} />

                    </div>
                    <div className='col-3'>
                        <input type="text" className='w-100 text-center' />
                    </div>
                    <div className='col-1'>
                        <i className="fa-solid fa-circle-plus" style={{ color: '#15161d', fontSize: "19px" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard