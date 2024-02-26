const Coupon = require("../../entity/couponEntity")

module.exports = async (data,id, couponRepository) => {
    const coupon = await couponRepository.getCoupon(data.couponId)
    console.log(coupon,data);
    if (!coupon) {
        return null
    }
    const couponObj = new Coupon(coupon)
    if (couponObj.isValid(id)) {
        return { discount: couponObj.discount, discountType: couponObj.discountType }
    }


}