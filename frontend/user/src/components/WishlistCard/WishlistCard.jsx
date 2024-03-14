import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASEURL } from '../../constants/constant'
import { logout } from '../../features/user/userSlice';
import Swal from 'sweetalert2'
import instance from '../../axios';
import Cookies from 'js-cookie';
function WishlistCard({ item, setToogle, toogle }) {
    const [cartStatus, setCartStatus] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { verified } = useSelector((state) => state.user)
    useEffect(() => {
        instance.get(`user/checkproductexist?varientId=${item.productVarientId}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            if (res.data.success) {
                console.log(res.data);
                setCartStatus(true)

            } else {
                console.log(res.data);
                setCartStatus(false)
            }
        })
    }, [toogle])
    const handleRemove = (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
                actions: 'action-btn'
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            width: "50rem",

        }).then((result) => {
            if (result.isConfirmed) {
                instance.patch('/user/removefromwishlist', {
                    productId: id
                }, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        setToogle((prev) => !prev)
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
        })

    }

    const handleAddToCart = (id) => {
        if (verified) {


            instance.patch('/user/addtocart', {
                productId: id
            }, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setToogle((prev) => !prev)
                }


            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())


                }

            })
        } else {
            navigate('/login')
        }
    }
    return (
        <>
            <div className="card mt-5 mt-md-0 mb-3">
                <div className='d-flex flex-row'>


                    <div className='col-5 col-sm-2 py-5 ps-2'>
                        <img className="card-img-top " src={BASEURL + "/" + item.productVarient.imagesUrl[0]} alt="Card image cap" />
                    </div>
                    <div className="card-body pt-4 col-6 col-md-6 ms-2 mt-2">
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

                        <p className="card-text mt-2 row"><h4 className='col-md-5'><b>₹ {item.productVarient.salePrice}</b></h4></p>
                        {
                            !cartStatus ? <button className='btn text-white ' style={{ backgroundColor: "#1E1F29" }} onClick={() => {
                                handleAddToCart(item.productVarientId)
                            }}>Add to cart</button> : <Link to={'/cart'} className='btn text-white ' style={{ backgroundColor: "#1E1F29" }}>Go to cart</Link>
                        }
                    </div>
                    <div className='col-2 text-end pe-4 pt-4 d-none d-sm-block' onClick={() => {
                        handleRemove(item.productVarientId)
                    }}>
                        <i className="fa-solid fa-trash " style={{ color: '#15161d', fontSize: "19px" }} />
                    </div>
                </div>
                <div className='col-4 d-sm-none px-3'>
                    <button className=' pt-0 px-0 d-flex   ' onClick={() => {
                        handleRemove(item.productVarientId)
                    }} style={{ outline: "none", border: "none", background: "none" }}>

                        <p className='col-12'>REMOVE</p>
                    </button>
                </div>

            </div>
        </>
    )
}

export default WishlistCard