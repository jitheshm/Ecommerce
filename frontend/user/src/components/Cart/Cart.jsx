import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import PriceDetails from '../PriceDetails/PriceDetails'
import CartCard from '../CartCard/CartCard'
function Cart() {
  return (
    <>
      <div className='cartContainer'>
        <div className='row container-fluid cartContent '>
          <div className='col-md-7 p-5 mt-5 ms-5 address border '>
            <CartCard/>
            <CartCard/>
            <CartCard/>
          </div>
          <PriceDetails />
        </div>
      </div>
    </>
  )
}

export default Cart