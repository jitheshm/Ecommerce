const addCoupon = require("../../usecase/coupon/addCoupon")
const getAllCoupon = require("../../usecase/coupon/getAllCoupon")
const getCoupon = require("../../usecase/coupon/getCoupon")
const updateCoupon = require("../../usecase/coupon/updateCoupon")
const couponRepository = require("../repositories/couponRepository")

module.exports={
    addCoupon:async(data)=>{
        return await addCoupon(data,couponRepository)
    },
    getCoupon:async(id)=>{
        return await getCoupon(id,couponRepository)
    },
    updateCoupon:async(data)=>{
        return await updateCoupon(data,couponRepository)
    },
    getAllCoupon:async()=>{
        return await getAllCoupon(couponRepository)
    }
}