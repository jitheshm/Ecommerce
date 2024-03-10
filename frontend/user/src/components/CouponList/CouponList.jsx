/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import './CouponList.css'
import coupon from '../../assets/coupon.png'
import Swal from 'sweetalert2'
import instance from '../../axios'
import Cookies from 'js-cookie';
function CouponList({ setShowCouponList }) {
    const [coupons, setCoupons] = useState([{}])

    useEffect(() => {
        instance.get('/user/coupons', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data);
            setCoupons(res.data.data)
        })
    }, [])
    const handleCopyClick = (code) => {
        // Copy the input field value to the clipboard
        navigator.clipboard.writeText(code)
            .then(() => {
                console.log('Text copied to clipboard');
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
                    title: "Coupon Code Copied",
                    iconColor: "green"
                });
            })
            .catch((error) => {
                console.error('Unable to copy text: ', error);
            });
    };
    return (
        <>
            <div className='d-flex justify-content-center ' style={{ position: "fixed", width: "100vw", height: "100%", top: "100px", left: 0, backgroundColor: "#000000ad" }} onClick={(event) => {

                if (event.target == event.currentTarget)
                    setShowCouponList(false)
            }}>
                <div className=' col-12 col-md-6 pb-5  m-auto' style={{ backgroundColor: "white", height: "100vh" }}>
                    <div className='pb-4 m-auto row justify-content-center couponContainer' style={{ overflowY: "scroll", maxHeight: "80%", }}>
                        <div className='col-12 pt-3 row bg-white ' style={{position:"sticky",top:0,zIndex:10}}>   
                            <i onClick={()=>{
                                setShowCouponList(false)
                            }} className="fa-solid fa-arrow-left col-2 d-flex align-items-center" />

                            <h3 className='text-center col-8 d-flex align-items-center justify-content-center'>Available Coupons</h3>
                        </div>

                        {
                            coupons.map((coupon, index) => {
                                return (
                                    <div className='card col-11 ps-0 col-md-8 m-auto row mt-5  ' style={{ backgroundColor: "#F7003F", height: "100px" }}>
                                        <div className='h-100 col-3 d-flex align-items-center' style={{ backgroundColor: "#ffd400" }}>
                                            <h4 >{coupon.discount} {coupon.discountType === 'percentage' ? <span> % OFF</span> : <span> ₹ OFF</span>}</h4>
                                        </div>
                                        <div className="coupon col-12 h-100 ">
                                            <input type="text" className='col-6 text-center' defaultValue={coupon.couponId} id="couponCode" readOnly />
                                            <div>
                                                <button className='btn btn-light d-flex align-items-center justify-content-center' style={{ height: "55px", width: "75px", borderRadius: "0px" }} onClick={() => {
                                                    handleCopyClick(coupon.couponId)
                                                }}>Copy</button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }





                    </div>
                    {/* <div className='col-12 text-center'>
                        <button className='btn btn-danger '>close</button>
                    </div> */}

                </div>

            </div>

        </>
    )
}

export default CouponList