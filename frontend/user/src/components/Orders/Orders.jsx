import React from 'react'
import { Link } from 'react-router-dom'

function Orders() {
    return (
        <>
            <div className='col-md-7 p-5 address border mt-3'>

                <h4><b>Orders</b></h4>

                <Link to={``}  >
                    <div className="card d-flex flex-row align-items-center mb-3">
                        <div className='p-3 col-1 '>
                            <img className="card-img-top " src={`https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/z/3/-original-imagtc5fqyz8tu4c.jpeg?q=70`} alt="Card image cap" />
                        </div>
                        <div className="card-body col-11 row ms-2">
                            <h4 className="card-title col-6"><b>svxkbhc</b></h4>
                            

                            <p className="card-text  col-2">₹ 545848</p>
                            <div className='col-4'>
                                <p>Deliverd on 21 march</p>
                            </div>
                        </div>
                        <div className='col-2 text-end pe-4 pt-4'>
                            <i className="fa-solid fa-trash " style={{ color: '#15161d', fontSize: "19px" }} />
                        </div>
                    </div>

                </Link>

                <Link to={``}  >
                    <div className="card d-flex flex-row align-items-center mb-3">
                        <div className='p-3 col-1 '>
                            <img className="card-img-top " src={`https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/z/3/-original-imagtc5fqyz8tu4c.jpeg?q=70`} alt="Card image cap" />
                        </div>
                        <div className="card-body col-11 row ms-2">
                            <h4 className="card-title col-6"><b>svxkbhc</b></h4>
                            

                            <p className="card-text  col-2">₹ 545848</p>
                            <div className='col-4'>
                                <p>Deliverd on 21 march</p>
                            </div>
                        </div>
                        <div className='col-2 text-end pe-4 pt-4'>
                            <i className="fa-solid fa-trash " style={{ color: '#15161d', fontSize: "19px" }} />
                        </div>
                    </div>

                </Link>

                


            </div>
        </>
    )
}

export default Orders