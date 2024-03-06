import React from 'react'
import SaleOverview from './SaleOverview'
import OrderOverview from './OrderOverview'
import PaymentAnalysis from './PaymentAnalysis'

function Dashboard() {
    return (
        <div className='mt-5 pt-5 row'>
            <div className='col-6'>
                <div className='ps-3'>
                    <SaleOverview />
                </div>
                <div className='ps-3 mt-2 mb-4'>
                    <OrderOverview />
                </div>

            </div>
            <div className='col-6 '>
                <div className=' col-12 m-auto row gap-2'>
                    <div className='col-4 row' >

                        <div className='card  '>
                            <div className='card-body px-2 pt-2 text-center row gap-2 align-items-center'>
                                <div className='col-2'>
                                    <i className="fa-solid fa-hand-holding-dollar" style={{ color: '#FFD43B', fontSize: "30px" }} />
                                </div>

                                <div className='col-9'>
                                    <h5 className='card-title mt-2 mb-2'>Total Sales</h5>
                                    <p className='card-text mt-0'>₹ 50000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 row' >

                        <div className='card  '>
                            <div className='card-body px-2 pt-2 text-center row gap-2 align-items-center'>
                                <div className='col-2'>
                                    <i className="fa-solid fa-hand-holding-dollar" style={{ color: '#FFD43B', fontSize: "30px" }} />
                                </div>

                                <div className='col-9'>
                                    <h5 className='card-title mt-2 mb-2'>Total Sales</h5>
                                    <p className='card-text mt-0'>₹ 50000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 row' >

                        <div className='card  '>
                            <div className='card-body px-2 pt-2 text-center row gap-2 align-items-center'>
                                <div className='col-2'>
                                    <i className="fa-solid fa-hand-holding-dollar" style={{ color: '#FFD43B', fontSize: "30px" }} />
                                </div>

                                <div className='col-9'>
                                    <h5 className='card-title mt-2 mb-2'>Total Sales</h5>
                                    <p className='card-text mt-0'>₹ 50000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 row' >

                        <div className='card  '>
                            <div className='card-body px-2 pt-2 text-center row gap-2 align-items-center'>
                                <div className='col-2'>
                                    <i className="fa-solid fa-hand-holding-dollar" style={{ color: '#FFD43B', fontSize: "30px" }} />
                                </div>

                                <div className='col-9'>
                                    <h5 className='card-title mt-2 mb-2'>Total Sales</h5>
                                    <p className='card-text mt-0'>₹ 50000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 row' >

                        <div className='card  '>
                            <div className='card-body px-2 pt-2 text-center row gap-2 align-items-center'>
                                <div className='col-2'>
                                    <i className="fa-solid fa-hand-holding-dollar" style={{ color: '#FFD43B', fontSize: "30px" }} />
                                </div>

                                <div className='col-9'>
                                    <h5 className='card-title mt-2 mb-2'>Total Sales</h5>
                                    <p className='card-text mt-0'>₹ 50000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 row' >

                        <div className='card  '>
                            <div className='card-body px-2 pt-2 text-center row gap-2 align-items-center'>
                                <div className='col-2'>
                                    <i className="fa-solid fa-hand-holding-dollar" style={{ color: '#FFD43B', fontSize: "30px" }} />
                                </div>

                                <div className='col-9'>
                                    <h5 className='card-title mt-2 mb-2'>Total Sales</h5>
                                    <p className='card-text mt-0'>₹ 50000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <div className=' mt-2'>
                        <PaymentAnalysis />
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Dashboard