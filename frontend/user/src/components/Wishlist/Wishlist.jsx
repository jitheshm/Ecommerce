/* eslint-disable react/jsx-key */
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { BASEURL } from '../../constants/constant.json'
import { logout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
function Wishlist() {
    const [wishlist, setWishlist] = useState([])
    const [toogle, setToogle] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        instance.get('user/wishlist', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            setWishlist(res.data.data)
        })
    }, [toogle])

    const handleRemove = (id) => {
        if (confirm('Are you sure you want to remove this product from wishlist')) {
            instance.patch('/user/removefromwishlist', {
                productId: id
            }, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setToogle(!toogle)
                }
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())
                }
            }
            )
        }
    }

    return (
        <>
            <div className='col-md-7 p-5 address border '>

                <h4><b>Wishlist</b></h4>


                {
                    wishlist.map((item, index) => {
                        return (
                            <Link to={``}  >
                                <div className="card d-flex flex-row mb-3">
                                    <div className='p-5 col-2 '>
                                        <img className="card-img-top " src={BASEURL + "/" + item.productVarient.imagesUrl[0]} alt="Card image cap" />
                                    </div>
                                    <div className="card-body pt-4 col-6 ms-2 mt-2">
                                        <h4 className="card-title "><>{item.productDetails.productName}</></h4>
                                        <div className="d-flex flex-row">
                                            <div className="text-warning mb-1 me-2">
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fas fa-star-half-alt" />
                                                <span className="ms-1">
                                                    4.5
                                                </span>
                                            </div>

                                        </div>

                                        <p className="card-text mt-2 row"><h4 className='col-3'><b>₹ {item.productVarient.salePrice}</b></h4> <b className='col-3' style={{ color: "green" }}>20% OFF</b></p>
                                    </div>
                                    <div className='col-2 text-end pe-4 pt-4' onClick={() => {
                                        handleRemove(item.productVarientId)
                                    }}>
                                        <i className="fa-solid fa-trash " style={{ color: '#15161d', fontSize: "19px" }} />
                                    </div>
                                </div>

                            </Link>
                        )
                    })
                }






            </div>
        </>
    )
}

export default Wishlist