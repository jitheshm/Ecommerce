/* eslint-disable react/jsx-key */
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { BASEURL } from '../../constants/constant.json'
import { logout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
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
        })

    }

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
                            <Link to={``}  >
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

                                            <p className="card-text mt-2 row"><h4 className='col-md-5'><b>₹ {item.productVarient.salePrice}</b></h4> <b className='col-md-5' style={{ color: "green" }}>20% OFF</b></p>
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


                            </Link>
                        )
                    })
                }






            </div>
        </>
    )
}

export default Wishlist