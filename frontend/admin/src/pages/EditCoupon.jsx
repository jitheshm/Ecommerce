import React from 'react'
import CouponForm from '../components/CouponForm/CouponForm'
import { useParams } from 'react-router-dom'
function EditCoupon() {
    const { id } = useParams()
    return (
        <>
            <CouponForm btnName={'Update Coupon'} title={'Edit Coupon'} api={'/admin/updatecoupon'} method={'patch'} id={id} />
        </>
    )
}

export default EditCoupon