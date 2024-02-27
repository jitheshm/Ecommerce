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
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [stockError, setStockError] = useState(false)
  const [refetch, setRefetch] = useState(false)
  
  const dispatch = useDispatch()
  useEffect(() => {
    instance.get('/user/cart', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((res) => {
      console.log(res);
      setCartItems(res.data.data)
      setTotal(res.data.data.reduce((acc, item) => acc + item.totalPrice, 0))
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        Cookies.remove('token')
        dispatch(logout())


      }
    })
  }, [refetch])

  // useEffect(() => {
  //   setDiscount(()=>{
  //     const offers=cartItems.
  //   })
  // },[])

  return (
    <>
      <div className='cartContainer'>
        <div className='row container-fluid cartContent '>
          <div className='col-md-7 p-5 mt-5 ms-5 address border '>
            {
              cartItems.map((item) => {
                return (
                  <>
                    <CartCard key={item.products.productId} item={item} setTotal={setTotal} stockError={stockError} setStockError={setStockError} setRefetch={setRefetch}/>
                  </>
                )
              })
            }


          </div>
          <PriceDetails itemsCount={cartItems.length} total={total} discount={discount} stockError={stockError} />
        </div>
      </div>
    </>
  )
}

export default Cart