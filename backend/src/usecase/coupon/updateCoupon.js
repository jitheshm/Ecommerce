const Coupon = require("../../entity/couponEntity")

module.exports = async (id,data, couponRepository) => {
    const coupon=new Coupon(data)
    return await couponRepository.updateCoupon(id,coupon)
}