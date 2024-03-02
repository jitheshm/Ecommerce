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
      <div className='left-top m-auto mb-4 row px-5  col-12 ' style={{ width: "100%", height: "50px",position:"fixed", top:101,left:0,zIndex:10}}>



        <div className='col-12 nameContainer ms-4'>
          <h4>My Cart</h4>
        </div>

      </div>   
      <div className='cartContainer px-md-3 mt-5 col-12'>

        <div className='d-flex flex-wrap container-fluid-md   col-12'>

          <div className='col-12 col-lg-7 p-5 mt-md-5  address border '>
            {
              cartItems.map((item) => {
                return (
                  <>
                    <CartCard key={item.products.productId} item={item} setTotal={setTotal} stockError={stockError} setStockError={setStockError} setRefetch={setRefetch} />
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