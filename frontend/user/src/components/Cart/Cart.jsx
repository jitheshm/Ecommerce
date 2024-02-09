import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import PriceDetails from '../PriceDetails/PriceDetails'
import CartCard from '../CartCard/CartCard'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice'
function Cart() {
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    instance.get('/user/cart', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      console.log(res);
      setCartItems(res.data.data)
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        Cookies.remove('token')
        dispatch(logout())


      }
    })
  }, [])

  return (
    <>
      <div className='cartContainer'>
        <div className='row container-fluid cartContent '>
          <div className='col-md-7 p-5 mt-5 ms-5 address border '>
            {
              cartItems.map((item) => {
                return (
                  <>
                    <CartCard item={item} setCartItems={setCartItems}/>
                  </>
                )
              })
            }


          </div>
          <PriceDetails />
        </div>
      </div>
    </>
  )
}

export default Cart