const addCoupon = require("../../usecase/coupon/addCoupon")
const couponRepository = require("../repositories/couponRepository")

module.exports={
    addCoupon:async(data)=>{
        return await addCoupon(data,couponRepository)
    }
}