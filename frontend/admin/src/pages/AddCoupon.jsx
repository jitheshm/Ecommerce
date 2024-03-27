import React from 'react'
import CouponForm from '../components/CouponForm/CouponForm'

function AddCoupon() {
    return (
        <>
            <CouponForm btnName={'Add Coupon'} title={'Create new Coupon'} api={'/admin/coupons'} method={'post'} />
        </>
    )
}

export default AddCoupon