import React from 'react'

function Wallet() {
    return (
        <>
            <div className='col-md-7 '>
                <div className='px-5 pt-5 address border mt-3 row' style={{ height: "180px" }}>
                    <h4><b>My Wallet</b></h4>
                    <div className='col-3 border text-white mb-4 text-center' style={{ "backgroundColor": "#1E1F29", borderRadius: "10px" }}>


                        <div className='mt-5 text-center'>
                            <h4><b>Wallet Balance</b></h4>
                            <h4>₹ 0.00</h4>
                        </div>


                    </div>




                </div>
                <div className='px-5 py-5 address border mt-3 row'>
                    <div className='col-4'>
                        <h4>jncjn</h4>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Wallet