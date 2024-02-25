const Coupon = require("../../entity/couponEntity");

module.exports=async(data,couponRepository)=>{
    const coupon=new Coupon(data);
    return await couponRepository.addCoupon(coupon);
}