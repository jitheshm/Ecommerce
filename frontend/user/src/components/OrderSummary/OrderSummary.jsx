import React from 'react'
import SummaryCard from '../SummaryCard/SummaryCard'

function OrderSummary({ items }) {
    return (
        <>
            <div className=' p-5  right mb-5'>
                <h4><b>Order Summary</b></h4>
                <div className='row'>

                    <div className='col-12'>
                        {
                            items.map((item, index) => {
                                return (
                                    <SummaryCard item={item} />
                                )
                            })
                        }
                        {/* <AddressCard addrObj={addrObj} setEdit={setEdit} setAddress={setAddress} checkOut={true} /> */}
                    </div>
                </div>





            </div>
        </>
    )
}

export default OrderSummary