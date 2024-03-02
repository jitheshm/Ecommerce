import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { logout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { BASEURL } from "../../constants/constant.json"
import Swal from 'sweetalert2'
function CartCard({ item, setTotal, stockError, setStockError, setRefetch }) {
    const [quantity, setQuantity] = useState(item.products.quantity)
    const [offers, setOffers] = useState([])
    const [discount, setDiscount] = useState(0)
    const [displayOff, setDisplayOff] = useState({})
    

    const dispatch = useDispatch()

    useEffect(() => {
        if (item)
            instance.get(`user/availableoffers/${item.productDetails.categoryId}/${item.products.productId}`).then((res) => {
                console.log(res.data.data);
                setOffers(res.data.data);
                setDiscount(res.data.data.reduce((acc, curr) => {
                    if (curr.offerType === 'amount') {
                        return acc + curr.discount
                    }
                    else {
                        return acc + (item.varient.salePrice * curr.discount / 100)
                    }
                }, 0))

                setDisplayOff(res.data.data.reduce((acc, curr) => {
                    if (curr.offerType === 'amount') {
                        return { amount: acc.amount + curr.discount, percentage: acc.percentage }
                    } else {
                        return { amount: acc.amount, percentage: acc.percentage + curr.discount }
                    }
                }, {
                    amount: 0,
                    percentage: 0
                }))

            })

    }, [item])


    useEffect(() => {
        instance.get(`user/checkstockavailable?varientId=${item.products.productId}&&quantity=${quantity}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                setStockError(false)
            } else {
                setStockError(true)
            }
        })
    }, [quantity])

    const handleincrement = () => {
        instance.patch('user/incrementquantity', {
            productId: item.products.productId
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            if (res.data.success) {
                setQuantity((prev) => {
                    return prev + 1
                })
                setRefetch((prev)=>{
                    return !prev
                
                })
                // setTotal((prev) => {
                //     return prev + item.varient.salePrice
                // })
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-left",
                    color: "white",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    padding: "2rem",
                    background: "#212121",
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: res.data.msg,
                    iconColor: "green"
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-left",
                    color: "white",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    padding: "2rem",
                    background: "#212121",
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: res.data.msg,
                    iconColor: "yellow"
                });
            }

        }).catch((error) => {

            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())


            }
        })
    }

    const handledecrement = () => {
        instance.patch('user/decrementquantity', {
            productId: item.products.productId
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                setQuantity((prev) => {
                    return prev - 1
                })
                setRefetch((prev)=>{
                    return !prev
                
                })
                // setTotal((prev) => {
                //     return prev - item.varient.salePrice
                // })

                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-left",
                    color: "white",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    padding: "2rem",
                    background: "#212121",
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: res.data.msg,
                    iconColor: "green"
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-left",
                    color: "white",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    padding: "2rem",
                    background: "#212121",
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: res.data.msg,
                    iconColor: "yellow"
                });
            }

        }).catch((error) => {

            console.log(error.response.status);
            if (error.response.status === 401) {
                Cookies.remove('token')
                dispatch(logout())


            }
        })
    }

    const handleRemove = () => {


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
                instance.patch('user/deletefromcart', {
                    productId: item.products.productId
                }, {
                    headers: {
                        Authorization: Cookies.get('token')
                    },

                }).then((res) => {
                    console.log(res);
                    if (res.data.success) {

                        setRefetch((prev) => {
                            return !prev
                        })

                    }

                }).catch((error) => {

                    console.log(error.response.status);
                    if (error.response.status === 401) {
                        Cookies.remove('token')
                        dispatch(logout())
                    }
                })
            }
        })

    }
    return (
        <div className='card mb-3'>


            <div className=" d-flex flex-row flex-wrap ">
                <div className='col-5 col-sm-2 py-5 ps-2'>
                    <img className="card-img-top " src={BASEURL + "/" + item.varient.imagesUrl[0]} alt="Card image cap" style={{ height: "100%", width: "100%", objectFit: "contain" }} />
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

                    <p className="card-text mt-2 row"><h4 className='col-md-3'><b>₹ {item.varient.salePrice - discount > 0 ? item.varient.salePrice - discount : 0}</b></h4> <b className='col-md-3' style={{ color: "green" }}>{displayOff.percentage}% {displayOff.percentage > 0 && displayOff.amount > 0 ? <span>+</span> : <span></span>} {displayOff.amount > 0 ? displayOff.amount : ""}&nbsp;OFF</b></p>
                    <div style={{ height: "30px" }}>{stockError && <p style={{ color: "red" }}>Out of stock</p>}</div>
                </div>

                <div className='col-2 text-end pe-4 pt-4 d-none d-md-block'>
                    <button className=' pt-0 px-0' onClick={handleRemove} style={{ outline: "none", border: "none", background: "none" }}>
                        <i className="fa-solid fa-trash " style={{ color: '#15161d', fontSize: "19px" }} />
                    </button>
                </div>

            </div>

            <div className='px-5 mb-4 row'>
                <div className='row col-12 col-md-6'>
                    <div className='row col-8 col-md-12'>
                        <div className='col-1 d-flex justify-content-center'>
                            <button className=' pt-0 px-0' onClick={handledecrement} style={{ outline: "none", border: "none", background: "none" }}>
                                <i className="fa-solid fa-circle-minus" style={{ color: '#15161d', fontSize: "19px" }} />
                            </button>
                        </div>
                        <div className='col-8 col-md-3'>
                            <input type="text" className='w-100 text-center' value={quantity} readOnly />
                        </div>
                        <div className='col-1 d-flex justify-content-center'>
                            <button className='pt-0' onClick={handleincrement} style={{ outline: "none", border: "none", background: "none" }}>
                                <i className="fa-solid fa-circle-plus" style={{ color: '#15161d', fontSize: "19px" }} />
                            </button>
                        </div>
                    </div>
                    <div className='col-4 d-md-none'>
                        <button className=' pt-0 px-0 d-flex   ' onClick={handleRemove} style={{ outline: "none", border: "none", background: "none" }}>
                            
                            <p className='col-12'>REMOVE</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartCard