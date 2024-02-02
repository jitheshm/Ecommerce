import React from 'react'

function PriceDetails() {
    return (
        <>
            <div className='col-md-4 pt-4  mt-5 ms-5 mb-5 address border cart'>
                <h4><b>PRICE DETAILS</b></h4>
                <div className='col-10 m-auto mt-5'>
                    <div className='row'>
                        <div className='col-6'>
                            Price (1 item)
                        </div>
                        <div className='text-end col-6'>
                            ₹79,900
                        </div>
                    </div>
                </div>

                <div className='col-10 m-auto mt-5'>
                    <div className='row'>
                        <div className='col-6'>
                            Discount
                        </div>
                        <div className='text-end col-6'>
                            − ₹7,901
                        </div>
                    </div>
                </div>
                <hr style={{ borderColor: "black" }} />
                <div className='col-10 m-auto my-5'>
                    <div className='row'>
                        <div className='col-6'>
                            <b>Total Amount</b>
                        </div>
                        <div className='text-end col-6'>
                            <b> ₹72,098</b>
                        </div>
                    </div>
                </div>
                <div className='text-center my-5'>
                    <button className='btn secondary w-50'> Place Order</button>
                </div>

            </div>
        </>
    )
}

export default PriceDetails