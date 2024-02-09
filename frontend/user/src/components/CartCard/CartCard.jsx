import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { logout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { BASEURL } from "../../constants/constant.json"
function CartCard({ item, setTotal, stockError, setStockError, setRefetch }) {
    const [quantity, setQuantity] = useState(item.products.quantity)


    const dispatch = useDispatch()


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

                setTotal((prev) => {
                    return prev + item.varient.salePrice
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
                setTotal((prev) => {
                    return prev - item.varient.salePrice
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

    const handleRemove = () => {
        if (confirm('Are you sure you want to remove this product from cart?')) {
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
    }
    return (
        <div className='card mb-3'>


            <div className=" d-flex flex-row  ">
                <div className='p-5 col-2 '>
                    <img className="card-img-top " src={BASEURL + "/" + item.varient.imagesUrl[0]} alt="Card image cap" style={{ height: "65px", width: "50px" }} />
                </div>
                <div className="card-body pt-4 col-6 ms-2 mt-2">
                    <h4 className="card-title "><>{item.productDetails[0].productName}</></h4>
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

                    <p className="card-text mt-2 row"><h4 className='col-3'><b>₹ {item.varient.salePrice}</b></h4> <b className='col-3' style={{ color: "green" }}>20% OFF</b></p>
                    <div style={{ height: "30px" }}>{stockError && <p style={{ color: "red" }}>Out of stock</p>}</div>
                </div>

                <div className='col-2 text-end pe-4 pt-4'>
                    <button className=' pt-0 px-0' onClick={handleRemove} style={{ outline: "none", border: "none", background: "none" }}>
                        <i className="fa-solid fa-trash " style={{ color: '#15161d', fontSize: "19px" }} />
                    </button>
                </div>

            </div>

            <div className='px-5 mb-4'>
                <div className='row col-6'>
                    <div className='col-1 d-flex justify-content-center'>
                        <button className=' pt-0 px-0' onClick={handledecrement} style={{ outline: "none", border: "none", background: "none" }}>
                            <i className="fa-solid fa-circle-minus" style={{ color: '#15161d', fontSize: "19px" }} />
                        </button>
                    </div>
                    <div className='col-3'>
                        <input type="text" className='w-100 text-center' value={quantity} readOnly />
                    </div>
                    <div className='col-1 d-flex justify-content-center'>
                        <button className='pt-0' onClick={handleincrement} style={{ outline: "none", border: "none", background: "none" }}>
                            <i className="fa-solid fa-circle-plus" style={{ color: '#15161d', fontSize: "19px" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard