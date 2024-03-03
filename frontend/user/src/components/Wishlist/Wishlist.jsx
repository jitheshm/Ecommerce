/* eslint-disable react/jsx-key */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';


import { useDispatch, useSelector } from 'react-redux';

import WishlistCard from '../WishlistCard/WishlistCard';
function Wishlist() {
    const [wishlist, setWishlist] = useState([])
    const [toogle, setToogle] = useState(false)

    useEffect(() => {
        instance.get('user/wishlist', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            setWishlist(res.data.data)
        })
    }, [toogle])




    return (
        <>
            <div className='col-md-7 p-5 address border  '>

                <h4 className='d-none d-md-block'><b>Wishlist</b></h4>
                <div className='left-top m-auto mb-4 row px-5 d-md-none  col-12 ' style={{ width: "100%", height: "50px", position: "fixed", top: 101, left: 0, zIndex: 10 }}>



                    <div className='col-12 nameContainer ms-4'>
                        <h4>My Wishlist</h4>
                    </div>

                </div>


                {
                    wishlist.map((item, index) => {
                        return (
                            <WishlistCard item={item} setToogle={setToogle} toogle={toogle} />
                        )
                    })
                }






            </div>
        </>
    )
}

export default Wishlist